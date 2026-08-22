package com.example.server.mapper;

import com.example.server.dto.request.DocumentUpdateRequest;
import com.example.server.dto.response.DocumentResponse;
import com.example.server.entity.Document;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface DocumentMapper {
    @Mapping(target = "uploadedBy", source = "uploadedBy.id")
    @Mapping(target = "uploaderUsername", source = "uploadedBy.username")
    DocumentResponse toDocumentResponse(Document document);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "fileName", ignore = true)
    @Mapping(target = "fileUrl", ignore = true)
    @Mapping(target = "fileType", ignore = true)
    @Mapping(target = "fileSize", ignore = true)
    @Mapping(target = "uploadedBy", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateDocument(@MappingTarget Document document, DocumentUpdateRequest request);
}
