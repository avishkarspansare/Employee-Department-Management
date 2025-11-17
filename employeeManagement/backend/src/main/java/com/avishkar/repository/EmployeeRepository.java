package com.avishkar.repository;

import com.avishkar.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository  // Marks this as a Spring Data JPA repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Get all employees for a given department
    List<Employee> findByDepartmentId(Long departmentId);

    // Count employees in a given department
    long countByDepartmentId(Long departmentId);
}
