package com.avishkar.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Simple runtime exception used when DB record is not found.
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)   // Returns HTTP 404 to the client
public class ResourceNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L; // For JVM serialization

    public ResourceNotFoundException(String message) {
        // Store human‑readable error message
        super(message);
    }
}
