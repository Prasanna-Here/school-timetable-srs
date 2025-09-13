package com.project.backend.security;

import com.project.backend.entity.User;
import com.project.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepo;

    public CustomUserDetailsService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User u = userRepo.findByEmail(email);
        if (u == null) throw new UsernameNotFoundException("User not found: " + email);

        // Spring Security's User builder (not your entity)
        return org.springframework.security.core.userdetails.User
                .withUsername(u.getEmail())
                .password(u.getPassword())
                .roles(u.getRole()) // "ADMIN", "TEACHER", "STUDENT"
                .build();
    }
}
