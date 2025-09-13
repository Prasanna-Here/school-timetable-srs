package com.project.backend.service;

import com.project.backend.entity.SchoolClass;
import com.project.backend.entity.User;
import com.project.backend.exception.ResourceNotFoundException;
import com.project.backend.repository.SchoolClassRepository;
import com.project.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.project.backend.exception.ClassNotFoundException;
import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;
    private final SchoolClassRepository classRepo;

    public UserService(UserRepository repo, SchoolClassRepository classRepo) {
        this.repo = repo;
        this.classRepo = classRepo;
    }

    public List<User> getAll() {
        return repo.findAll();
    }

    public User getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public User create(User user) {
        if ("TEACHER".equalsIgnoreCase(user.getRole())) {
            // Teachers don’t belong to a class
            user.setSchoolClass(null);
        } 
        else if ("STUDENT".equalsIgnoreCase(user.getRole())) {
            if (user.getSchoolClass() == null || user.getSchoolClass().getId() == null) {
                throw new IllegalArgumentException("❌ Student must belong to a class");
            }

            // Fetch class from DB
            SchoolClass schoolClass = classRepo.findById(user.getSchoolClass().getId())
                    .orElseThrow(() -> new ClassNotFoundException("❌ Class not found"));

            // ✅ Capacity check
            long currentStudents = repo.countByRoleAndSchoolClassId("STUDENT", schoolClass.getId());
            if (schoolClass.getCapacity() != null && currentStudents >= schoolClass.getCapacity()) {
                throw new IllegalArgumentException("❌ Class is full (capacity = " + schoolClass.getCapacity() + ")");
            }

            user.setSchoolClass(schoolClass);
        }

        return repo.save(user);
    }

    public User update(Long id, User user) {
        user.setId(id);
        return repo.save(user);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new ResourceNotFoundException("❌ User not found");
        }
        repo.deleteById(id);
    }
}

 