package com.example.server.repository;

import com.example.server.entity.ConsultationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import jakarta.persistence.LockModeType;

import java.util.Optional;

public interface ConsultationRequestRepository extends JpaRepository<ConsultationRequest, String>,
        JpaSpecificationExecutor<ConsultationRequest> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select request from ConsultationRequest request where request.id = :id")
    Optional<ConsultationRequest> findByIdForUpdate(@Param("id") String id);
}
