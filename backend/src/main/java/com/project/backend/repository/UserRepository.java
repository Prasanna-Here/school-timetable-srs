package com.project.backend.repository;

import com.project.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // Example custom query method
    User findByEmail(String email);
    long countByRoleAndSchoolClassId(String role, Long classId);

}
