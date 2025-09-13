package com.project.backend.controller;

import com.project.backend.dto.ScheduleDTO;
import com.project.backend.entity.Schedule;
import com.project.backend.service.ScheduleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    private final ScheduleService service;

    public ScheduleController(ScheduleService service) {
        this.service = service;
    }

    @GetMapping
    public List<ScheduleDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ScheduleDTO getOne(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public ResponseEntity<ScheduleDTO> create(@RequestBody Schedule schedule) {
        ScheduleDTO saved = service.create(schedule);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ScheduleDTO> update(@PathVariable Long id, @RequestBody Schedule schedule) {
        ScheduleDTO updated = service.update(id, schedule);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/student/{studentId}")
    public List<ScheduleDTO> getSchedulesForStudent(@PathVariable Long studentId) {
        return service.getSchedulesForStudent(studentId);
    }

    @GetMapping("/teacher/{teacherId}")
    public List<ScheduleDTO> getSchedulesForTeacher(@PathVariable Long teacherId) {
        return service.getSchedulesForTeacher(teacherId);
    }

    @GetMapping("/class/{classId}")
    public List<ScheduleDTO> getSchedulesForClass(@PathVariable Long classId) {
        return service.getSchedulesForClass(classId);
    }
}
