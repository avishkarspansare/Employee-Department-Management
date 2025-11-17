package com.avishkar.model;

import lombok.*;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data                       // Lombok: generates getters, setters, equals, hashCode, toString
@Getter                     // Redundant but harmless; kept for clarity
@Setter
@ToString
@NoArgsConstructor          // Lombok: no‑args constructor
@AllArgsConstructor         // Lombok: all‑args constructor
@Entity                     // JPA entity mapped to "employees" table
@Table(name = "employees")  // Explicit table name in DB
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto‑increment primary key
    private Long id;

    // Basic employee fields used in UI forms
    private String firstName;
    private String lastName;
    private String emailId;

    // Many employees belong to one department (nullable: employee can be "on bench")
    @ManyToOne
    @JoinColumn(name = "department_id")                 // FK to departments.id
    @JsonIgnoreProperties({"employees"})               // Avoid infinite JSON recursion
    private Department department;
}
