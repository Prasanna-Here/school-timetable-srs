package com.project.backend.controller;

import com.project.backend.dto.*;
import com.project.backend.entity.*;
import com.project.backend.repository.*;
import com.project.backend.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepo;
    private final SchoolClassRepository classRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authManager;

    public AuthController(UserRepository userRepo,
                          SchoolClassRepository classRepo,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil,
                          AuthenticationManager authManager) {
        this.userRepo = userRepo;
        this.classRepo = classRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authManager = authManager;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (userRepo.findByEmail(req.getEmail()) != null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already taken"));
        }

        User u = new User();
        u.setName(req.getName());
        u.setEmail(req.getEmail());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        u.setRole(req.getRole().toUpperCase());

        if ("STUDENT".equalsIgnoreCase(u.getRole())) {
            if (req.getClassId() == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Student must have classId"));
            }
            SchoolClass sc = classRepo.findById(req.getClassId())
                .orElseThrow(() -> new IllegalArgumentException("Class not found"));
            u.setSchoolClass(sc);
        } else {
            u.setSchoolClass(null);
        }

        userRepo.save(u);
        return ResponseEntity.ok(Map.of("message", "User registered"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        try {
            authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
            User user = userRepo.findByEmail(req.getEmail());
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
            Map<String, Object> response = Map.of(
                "token", token, 
                "role", user.getRole(), 
                "email", user.getEmail(),
                "userId", user.getId()
            );
            
            // Add classId for students
            if (user.getSchoolClass() != null) {
                response = Map.of(
                    "token", token, 
                    "role", user.getRole(), 
                    "email", user.getEmail(),
                    "userId", user.getId(),
                    "userClassId", user.getSchoolClass().getId()
                );
            }
            
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }
    }
}
