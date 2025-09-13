package com.project.backend.service;

import com.project.backend.entity.TimeSlot;
import com.project.backend.exception.ResourceNotFoundException;
import com.project.backend.repository.TimeSlotRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimeSlotService {

    private final TimeSlotRepository repo;

    public TimeSlotService(TimeSlotRepository repo) {
        this.repo = repo;
    }

    public List<TimeSlot> getAll() {
        return repo.findAll();
    }

    public TimeSlot getById(Long id) {
          return repo.findById(id)
               .orElseThrow(() -> new ResourceNotFoundException("TimeSlot not found"));
    }

    public TimeSlot create(TimeSlot timeSlot) {
        return repo.save(timeSlot);
    }

    public TimeSlot update(Long id, TimeSlot timeSlot) {
        timeSlot.setId(id);
        return repo.save(timeSlot);
    }

    public void delete(Long id) {
    if(!repo.existsById(id)) {
        throw new ResourceNotFoundException("TimeSlot not found");
    }
    repo.deleteById(id);
    }
}
