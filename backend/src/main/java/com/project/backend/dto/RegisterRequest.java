package com.project.backend.dto;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String role; // ADMIN / TEACHER / STUDENT
    private Long classId; // optional — used only if student
}
