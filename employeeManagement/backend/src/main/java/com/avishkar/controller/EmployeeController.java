package com.avishkar.controller;

import com.avishkar.exception.ResourceNotFoundException;
import com.avishkar.model.Employee;
import com.avishkar.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST endpoints for basic employee CRUD.
 * Base path: /api/v1/employees
 */
@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000") // Allow local React dev server
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository; // Handles DB operations

    // Get all employees (used by main employee list)
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Create a new employee
    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        // department may be null => "on bench"
        return employeeRepository.save(employee);
    }

    // Get single employee by ID
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));
        return ResponseEntity.ok(employee);
    }

    // Update existing employee basic details (no department change here)
    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id,
                                                   @RequestBody Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmailId(employeeDetails.getEmailId());
        // Department can be updated via separate logic if needed

        Employee updatedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    // Delete employee by ID
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        employeeRepository.delete(employee);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE); // Simple JSON flag for frontend
        return ResponseEntity.ok(response);
    }
}
