package com.example.server.repository;

import com.example.server.entity.Faq;
import com.example.server.enums.FaqStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FaqRepository extends JpaRepository<Faq, String>, JpaSpecificationExecutor<Faq> {
    Page<Faq> findAllByStatus(FaqStatus status, Pageable pageable);

    Page<Faq> findAllByStatusAndFaqCategoryId(
            FaqStatus status, String faqCategoryId, Pageable pageable);

    Optional<Faq> findByIdAndStatus(String id, FaqStatus status);

    Page<Faq> findAllByFaqCategoryId(String faqCategoryId, Pageable pageable);

}
