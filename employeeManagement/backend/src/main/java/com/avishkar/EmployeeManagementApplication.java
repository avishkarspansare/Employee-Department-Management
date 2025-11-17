package com.avishkar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication          // Main Spring Boot configuration + component scan
@CrossOrigin                    // Allow frontend (React) to call this backend
public class EmployeeManagementApplication {

    public static void main(String[] args) {
        // Bootstraps the Spring context and starts embedded Tomcat
        SpringApplication.run(EmployeeManagementApplication.class, args);
    }
}
