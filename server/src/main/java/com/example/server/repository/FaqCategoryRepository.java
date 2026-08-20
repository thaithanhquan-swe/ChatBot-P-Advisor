package com.example.server.repository;

import com.example.server.entity.FaqCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FaqCategoryRepository extends JpaRepository<FaqCategory, String> {
}
