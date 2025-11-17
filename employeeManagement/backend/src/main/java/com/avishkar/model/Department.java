package com.avishkar.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Department entity: parent in one‑to‑many with Employee.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "departments")     // Explicit table name in DB
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto‑increment primary key
    private Long id;

    // Unique department name, e.g. "IT", "HR"
    @Column(nullable = false, unique = true)
    private String name;

    // One department has many employees (inverse side of relation)
    @OneToMany(mappedBy = "department")
    @JsonIgnoreProperties({"department"})              // Avoid JSON loop, keep employee data
    private List<Employee> employees = new ArrayList<>();
}
