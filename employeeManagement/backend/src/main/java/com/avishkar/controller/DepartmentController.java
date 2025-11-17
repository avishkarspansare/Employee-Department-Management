package com.avishkar.controller;

import com.avishkar.exception.ResourceNotFoundException;
import com.avishkar.model.Department;
import com.avishkar.repository.DepartmentRepository;
import com.avishkar.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST endpoints for department operations:
 * - CRUD
 * - search by name
 * - employee count per department
 */
@RestController
@RequestMapping("/api/v1")
@CrossOrigin // Allow cross‑origin requests (React / other frontends)
public class DepartmentController {

    @Autowired
    private DepartmentRepository departmentRepository; // Department DB access

    @Autowired
    private EmployeeRepository employeeRepository;     // Used for employee count, etc.

    // 1) Get all departments (for dropdown, autocomplete, listing)
    @GetMapping("/departments")
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    // 2) Create department (fails if name already exists)
    @PostMapping("/departments")
    public ResponseEntity<?> createDepartment(@RequestBody Department departmentRequest) {
        String name = departmentRequest.getName().trim();

        // Prevent duplicate department names (case‑insensitive)
        if (departmentRepository.existsByNameIgnoreCase(name)) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Department with this name already exists");
            return ResponseEntity.badRequest().body(response);
        }

        Department department = new Department();
        department.setName(name);

        Department saved = departmentRepository.save(department);
        return ResponseEntity.ok(saved);
    }

    // 3) Get department by ID (can include employees depending on JSON usage)
    @GetMapping("/departments/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
        return ResponseEntity.ok(department);
    }

    // 4) Find department by name (used by search box / autocomplete)
    @GetMapping("/departments/search")
    public ResponseEntity<Department> findByName(@RequestParam("name") String name) {
        Department department = departmentRepository.findByNameIgnoreCase(name.trim())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with name: " + name));
        return ResponseEntity.ok(department);
    }

    // 5) Get number of employees in a department (for quick stats)
    @GetMapping("/departments/{id}/employees/count")
    public ResponseEntity<Map<String, Object>> countEmployees(@PathVariable Long id) {

        // Ensure department exists before counting
        departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));

        long count = employeeRepository.countByDepartmentId(id);

        Map<String, Object> response = new HashMap<>();
        response.put("departmentId", id);
        response.put("employeeCount", count);

        return ResponseEntity.ok(response);
    }
}
