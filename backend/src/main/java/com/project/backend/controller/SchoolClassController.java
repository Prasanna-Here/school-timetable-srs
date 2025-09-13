package com.project.backend.controller;

import com.project.backend.entity.SchoolClass;
import com.project.backend.service.SchoolClassService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
public class SchoolClassController {

    private final SchoolClassService service;

    public SchoolClassController(SchoolClassService service) {
        this.service = service;
    }

    @GetMapping
    public List<SchoolClass> getAll() {
        System.out.println("SchoolClassController: Getting all classes");
        List<SchoolClass> classes = service.getAll();
        System.out.println("SchoolClassController: Found " + classes.size() + " classes");
        return classes;
    }

    @GetMapping("/{id}")
    public SchoolClass getOne(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public SchoolClass create(@RequestBody SchoolClass schoolClass) {
        return service.create(schoolClass);
    }

    @PutMapping("/{id}")
    public SchoolClass update(@PathVariable Long id, @RequestBody SchoolClass schoolClass) {
        return service.update(id, schoolClass);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
