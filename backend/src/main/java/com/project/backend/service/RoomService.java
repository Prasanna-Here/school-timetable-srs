package com.project.backend.service;

import com.project.backend.entity.Room;
import com.project.backend.exception.ResourceNotFoundException;
import com.project.backend.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository repo;

    public RoomService(RoomRepository repo) {
        this.repo = repo;
    }

    public List<Room> getAll() {
        return repo.findAll();
    }

    public Room getById(Long id) {
        return repo.findById(id)
            .orElseThrow(()->new ResourceNotFoundException("Room not found"));
    }

    public Room create(Room room) {
        return repo.save(room);
    }

    public Room update(Long id, Room room) {
        room.setId(id);
        return repo.save(room);
    }

    public void delete(Long id) {
        if(!repo.existsById(id)) {
            throw new ResourceNotFoundException("Room not found");
        }
        repo.deleteById(id);
    }
}
