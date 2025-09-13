package com.project.backend.service;

import com.project.backend.entity.Subject;
import com.project.backend.exception.ResourceNotFoundException;
import com.project.backend.repository.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    private final SubjectRepository repo;

    public SubjectService(SubjectRepository repo) {
        this.repo = repo;
    }

    public List<Subject> getAll() {
        return repo.findAll();
    }

    public Subject getById(Long id) {
        return repo.findById(id)
               .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));
    }

    public Subject create(Subject subject) {
        return repo.save(subject);
    }

    public Subject update(Long id, Subject subject) {
        subject.setId(id);
        return repo.save(subject);
    }

    public void delete(Long id) {
        if(!repo.existsById(id)) {
        throw new ResourceNotFoundException("Subject not found");
    }
    repo.deleteById(id);
    }
}
