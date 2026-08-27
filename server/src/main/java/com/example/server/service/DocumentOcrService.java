package com.example.server.service;

import lombok.AccessLevel;
import lombok.extern.slf4j.Slf4j;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;
import java.nio.file.Path;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DocumentOcrService {
    static final int OCR_DPI = 200;

    @NonFinal
    @Value("${app.document.ocr.enabled}")
    boolean enabled;

    @NonFinal
    @Value("${app.document.ocr.languages}")
    String languages;

    @NonFinal
    @Value("${app.document.ocr.data-path}")
    String dataPath;

    @NonFinal
    @Value("${app.document.ocr.max-pages}")
    int maxPages;

    public String extract(Path file) {
        if (!enabled || !isPdf(file)) return "";

        try (PDDocument pdf = Loader.loadPDF(file.toFile())) {
            PDFRenderer renderer = new PDFRenderer(pdf);
            ITesseract tesseract = createTesseract();
            int pages = Math.min(pdf.getNumberOfPages(), maxPages);
            StringBuilder content = new StringBuilder();
            for (int page = 0; page < pages; page++) {
                BufferedImage image = renderer.renderImageWithDPI(page, OCR_DPI, ImageType.GRAY);
                String pageText = tesseract.doOCR(image);
                if (!pageText.isBlank()) {
                    content.append("\n--- Trang ").append(page + 1).append(" ---\n")
                            .append(pageText.trim());
                }
            }
            return content.toString().replaceAll("[\\t ]+", " ").trim();
        } catch (Exception exception) {
            log.warn("Cannot OCR document {}", file.getFileName(), exception);
            return "";
        }
    }

    private ITesseract createTesseract() {
        Tesseract tesseract = new Tesseract();
        tesseract.setDatapath(resolveDataPath().toString());
        tesseract.setLanguage(languages);
        tesseract.setPageSegMode(6);
        return tesseract;
    }

    private Path resolveDataPath() {
        Path configured = Path.of(dataPath).toAbsolutePath().normalize();
        if (configured.toFile().isDirectory()) return configured;
        Path moduleRelative = Path.of("server", dataPath).toAbsolutePath().normalize();
        return moduleRelative.toFile().isDirectory() ? moduleRelative : configured;
    }

    private boolean isPdf(Path file) {
        return file.getFileName().toString().toLowerCase().endsWith(".pdf");
    }
}
