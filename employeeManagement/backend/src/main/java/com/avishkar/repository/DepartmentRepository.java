package com.avishkar.repository;

import com.avishkar.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository  // JPA repository for Department entity
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    // Used when adding: prevent duplicate department names (case‑insensitive)
    boolean existsByNameIgnoreCase(String name);

    // Used by search box: fetch department by name (case‑insensitive)
    Optional<Department> findByNameIgnoreCase(String name);
}
