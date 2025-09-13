package com.project.backend.controller;

import com.project.backend.entity.TimeSlot;
import com.project.backend.service.TimeSlotService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timeslots")
public class TimeSlotController {

    private final TimeSlotService service;

    public TimeSlotController(TimeSlotService service) {
        this.service = service;
    }

    @GetMapping
    public List<TimeSlot> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public TimeSlot getOne(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public TimeSlot create(@RequestBody TimeSlot timeSlot) {
        return service.create(timeSlot);
    }

    @PutMapping("/{id}")
    public TimeSlot update(@PathVariable Long id, @RequestBody TimeSlot timeSlot) {
        return service.update(id, timeSlot);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
