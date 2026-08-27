package com.example.server.service;

import com.example.server.entity.Document;
import com.example.server.entity.Faq;
import com.example.server.enums.DocumentStatus;
import com.example.server.enums.FaqStatus;
import com.example.server.repository.DocumentRepository;
import com.example.server.repository.FaqRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class KnowledgeRetrievalService {
    static int MAX_RESULTS = 8;
    static int MAX_CONTEXT_CHARACTERS = 16_000;
    static int MAX_DOCUMENT_CHARACTERS = 100_000;
    static int DOCUMENT_CHUNK_CHARACTERS = 3_000;
    static int DOCUMENT_CHUNK_OVERLAP = 300;
    static int MIN_EXTRACTED_TEXT_CHARACTERS = 100;
    static Set<String> STOP_WORDS = Set.of(
            "a", "ai", "bao", "bi", "cac", "cho", "co", "cua", "duoc", "gi", "la", "lam",
            "mot", "nao", "nhung", "o", "the", "thi", "toi", "tu", "va", "ve", "voi");

    DocumentRepository documentRepository;
    FaqRepository faqRepository;
    DocumentOcrService documentOcrService;
    Map<String, CachedDocument> documentCache = new ConcurrentHashMap<>();

    @NonFinal
    @Value("${app.document.storage-location}")
    String storageLocation;

    @Transactional(readOnly = true)
    public String retrieve(String query) {
        Set<String> queryTerms = tokenize(query);
        if (queryTerms.isEmpty()) {
            return "Không tìm thấy knowledge phù hợp.";
        }

        List<KnowledgeChunk> candidates = new ArrayList<>();
        faqRepository.findAllByStatus(FaqStatus.PUBLISHED)
                .forEach(faq -> candidates.add(fromFaq(faq, queryTerms)));
        documentRepository.findAllByStatus(DocumentStatus.PUBLISHED)
                .forEach(document -> candidates.addAll(fromDocument(document, queryTerms)));

        List<KnowledgeChunk> ranked = candidates.stream()
                .filter(chunk -> chunk.score() > 0)
                .sorted(Comparator.comparingInt(KnowledgeChunk::score).reversed())
                .limit(MAX_RESULTS)
                .toList();

        if (ranked.isEmpty()) {
            return "Không tìm thấy knowledge phù hợp trong Documents hoặc FAQ.";
        }

        StringBuilder context = new StringBuilder();
        for (KnowledgeChunk chunk : ranked) {
            String entry = "[Nguồn: " + chunk.source() + "]\n" + chunk.content().trim() + "\n\n";
            if (context.length() + entry.length() > MAX_CONTEXT_CHARACTERS) {
                int remaining = MAX_CONTEXT_CHARACTERS - context.length();
                if (remaining > 100) context.append(entry, 0, remaining);
                break;
            }
            context.append(entry);
        }
        return context.toString().trim();
    }

    private KnowledgeChunk fromFaq(Faq faq, Set<String> queryTerms) {
        String category = faq.getFaqCategory() == null ? "Không phân loại" : faq.getFaqCategory().getName();
        String searchable = faq.getQuestion() + " " + faq.getAnswer() + " " + category;
        int score = score(queryTerms, faq.getQuestion(), searchable);
        String content = "Câu hỏi: " + faq.getQuestion() + "\nCâu trả lời: " + faq.getAnswer();
        return new KnowledgeChunk("FAQ / " + category, content, score > 0 ? score + 1 : 0);
    }

    private List<KnowledgeChunk> fromDocument(Document document, Set<String> queryTerms) {
        String extracted = extractDocument(document);
        String description = document.getDescription() == null ? "" : document.getDescription();
        String boosted = document.getTitle() + " " + description;
        List<String> chunks = splitIntoChunks(extracted);
        if (chunks.isEmpty()) chunks = List.of(description);

        List<KnowledgeChunk> results = new ArrayList<>();
        for (int index = 0; index < chunks.size(); index++) {
            String chunk = chunks.get(index);
            int score = score(queryTerms, boosted, boosted + " " + chunk);
            String content = "Tài liệu: " + document.getTitle() + "\n" + chunk;
            String source = "Document / " + document.getFileName() + " / đoạn " + (index + 1);
            results.add(new KnowledgeChunk(source, content, score));
        }
        return results;
    }

    private List<String> splitIntoChunks(String content) {
        if (content == null || content.isBlank()) return List.of();
        List<String> chunks = new ArrayList<>();
        int step = DOCUMENT_CHUNK_CHARACTERS - DOCUMENT_CHUNK_OVERLAP;
        for (int start = 0; start < content.length(); start += step) {
            int end = Math.min(start + DOCUMENT_CHUNK_CHARACTERS, content.length());
            chunks.add(content.substring(start, end));
            if (end == content.length()) break;
        }
        return chunks;
    }

    private int score(Set<String> queryTerms, String boostedText, String fullText) {
        String boosted = normalize(boostedText);
        String full = normalize(fullText);
        int score = 0;
        for (String term : queryTerms) {
            if (boosted.contains(term)) score += 4;
            if (full.contains(term)) score += 1;
        }
        return score;
    }

    private String extractDocument(com.example.server.entity.Document document) {
        String cacheKey = document.getId() + ":" + document.getUpdatedAt();
        CachedDocument cached = documentCache.get(document.getId());
        if (cached != null && cached.key().equals(cacheKey)) return cached.content();

        String fallback = document.getDescription() == null ? "" : document.getDescription();
        try {
            Path root = Path.of(storageLocation).toAbsolutePath().normalize();
            Path file = root.resolve(storedName(document.getFileUrl())).normalize();
            if (!file.startsWith(root) || !Files.isRegularFile(file)) return fallback;

            AutoDetectParser parser = new AutoDetectParser();
            BodyContentHandler handler = new BodyContentHandler(-1);
            try (InputStream input = Files.newInputStream(file)) {
                parser.parse(input, handler, new Metadata(), new ParseContext());
            }
            String content = handler.toString().replaceAll("\\s+", " ").trim();
            if (content.length() < MIN_EXTRACTED_TEXT_CHARACTERS) {
                content = documentOcrService.extract(file);
            }
            if (content.length() > MAX_DOCUMENT_CHARACTERS) {
                content = content.substring(0, MAX_DOCUMENT_CHARACTERS);
            }
            documentCache.put(document.getId(), new CachedDocument(cacheKey, content));
            return content.isBlank() ? fallback : content;
        } catch (Exception exception) {
            log.warn("Cannot extract knowledge from document {}", document.getId(), exception);
            return fallback;
        }
    }

    private String storedName(String fileUrl) {
        String normalized = fileUrl.replace('\\', '/');
        return normalized.substring(normalized.lastIndexOf('/') + 1);
    }

    private Set<String> tokenize(String value) {
        return Arrays.stream(normalize(value).split("[^a-z0-9]+"))
                .filter(token -> token.length() > 1)
                .filter(token -> !STOP_WORDS.contains(token))
                .collect(Collectors.toSet());
    }

    private String normalize(String value) {
        if (value == null) return "";
        String decomposed = Normalizer.normalize(value, Normalizer.Form.NFD);
        return decomposed.replaceAll("\\p{M}", "")
                .replace('đ', 'd')
                .replace('Đ', 'D')
                .toLowerCase(Locale.ROOT);
    }

    private record KnowledgeChunk(String source, String content, int score) {}
    private record CachedDocument(String key, String content) {}
}
