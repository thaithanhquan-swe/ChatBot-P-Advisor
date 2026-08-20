package com.example.server.mapper;

import com.example.server.dto.request.FaqCategoryRequest;
import com.example.server.dto.response.FaqCategoryResponse;
import com.example.server.entity.FaqCategory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface FaqCategoryMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "status", defaultValue = "ACTIVE")
    FaqCategory toFaqCategory(FaqCategoryRequest request);

    FaqCategoryResponse toFaqCategoryResponse(FaqCategory category);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(
            target = "status",
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFaqCategory(@MappingTarget FaqCategory category, FaqCategoryRequest request);
}
