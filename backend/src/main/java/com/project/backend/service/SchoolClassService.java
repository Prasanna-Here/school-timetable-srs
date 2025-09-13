package com.project.backend.service;

import com.project.backend.entity.SchoolClass;
import com.project.backend.exception.ClassNotFoundException;
import com.project.backend.repository.SchoolClassRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchoolClassService {

    private final SchoolClassRepository repo;

    public SchoolClassService(SchoolClassRepository repo) {
        this.repo = repo;
    }

    public List<SchoolClass> getAll() {
        return repo.findAll();
    }

    public SchoolClass getById(Long id) {
        return repo.findById(id).orElseThrow(()->new ClassNotFoundException("class not found"));
    }

    public SchoolClass create(SchoolClass schoolClass) {
        return repo.save(schoolClass);
    }

    public SchoolClass update(Long id, SchoolClass schoolClass) {
        schoolClass.setId(id);
        return repo.save(schoolClass);
    }

    public void delete(Long id) {
         if(!repo.existsById(id)) {
        throw new ClassNotFoundException("Class not found");
    }
    repo.deleteById(id);
    }
}
