package com.example.server.mapper;

import com.example.server.dto.request.FaqRequest;
import com.example.server.dto.response.FaqResponse;
import com.example.server.entity.Faq;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface FaqMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "faqCategory", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "status", defaultValue = "DRAFT")
    Faq toFaq(FaqRequest request);

    @Mapping(target = "faqCategoryId", source = "faqCategory.id")
    @Mapping(target = "categoryName", source = "faqCategory.name")
    @Mapping(target = "createdBy", source = "createdBy.id")
    @Mapping(target = "creatorUsername", source = "createdBy.username")
    FaqResponse toFaqResponse(Faq faq);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "faqCategory", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(
            target = "status",
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFaq(@MappingTarget Faq faq, FaqRequest request);
}
