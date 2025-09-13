package com.project.backend.service;

import com.project.backend.dto.ScheduleDTO;
import com.project.backend.entity.Schedule;
import com.project.backend.entity.User;
import com.project.backend.exception.*;
import com.project.backend.exception.ClassNotFoundException;
import com.project.backend.repository.*;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {

    private final ScheduleRepository repo;
    private final SchoolClassRepository classRepo;
    private final RoomRepository roomRepo;
    private final UserRepository userRepo;
    private final SubjectRepository subjectRepo;
    private final TimeSlotRepository timeSlotRepo;

    public ScheduleService(ScheduleRepository repo,
                           SchoolClassRepository classRepo,
                           RoomRepository roomRepo,
                           UserRepository userRepo,
                           SubjectRepository subjectRepo,
                           TimeSlotRepository timeSlotRepo) {
        this.repo = repo;
        this.classRepo = classRepo;
        this.roomRepo = roomRepo;
        this.userRepo = userRepo;
        this.subjectRepo = subjectRepo;
        this.timeSlotRepo = timeSlotRepo;
    }

    // Convert Schedule entity to DTO
    public ScheduleDTO convertToDTO(Schedule s) {
        return new ScheduleDTO(
                s.getId(),
                s.getSchoolClass().getName(),
                s.getSubject().getName(),
                s.getTeacher().getName(),
                s.getRoom().getName(),
                s.getTimeSlot().getDayOfWeek() + " " +
                s.getTimeSlot().getStartTime() + "-" +
                s.getTimeSlot().getEndTime()
        );
    }

    public List<ScheduleDTO> getAll() {
        return repo.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }

    public ScheduleDTO getById(Long id) {
        Schedule schedule = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule not found"));
        return convertToDTO(schedule);
    }

    public ScheduleDTO create(Schedule schedule) {
        // Fetch full entities from DB with proper exceptions
        var schoolClass = classRepo.findById(schedule.getSchoolClass().getId())
                .orElseThrow(() -> new ClassNotFoundException("Class not found"));
        var subject = subjectRepo.findById(schedule.getSubject().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));
        var teacher = userRepo.findById(schedule.getTeacher().getId())
                .orElseThrow(() -> new TeacherNotFoundException("Teacher not found"));
        var room = roomRepo.findById(schedule.getRoom().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        var timeSlot = timeSlotRepo.findById(schedule.getTimeSlot().getId())
                .orElseThrow(() -> new ResourceNotFoundException("TimeSlot not found"));

        // Assign back
        schedule.setSchoolClass(schoolClass);
        schedule.setSubject(subject);
        schedule.setTeacher(teacher);
        schedule.setRoom(room);
        schedule.setTimeSlot(timeSlot);

        // Conflict check
        var conflicts = repo.findConflicts(
                timeSlot.getId(),
                teacher.getId(),
                room.getId(),
                schoolClass.getId()
        );

        if (!conflicts.isEmpty()) {
            throw new ScheduleConflictException("Conflict! Teacher/Room/Class already busy in this time slot.");
        }

        Schedule saved = repo.save(schedule);
        return convertToDTO(saved);
    }

    public ScheduleDTO update(Long id, Schedule schedule) {
        schedule.setId(id);
        Schedule updated = repo.save(schedule);
        return convertToDTO(updated);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new ResourceNotFoundException("Schedule not found");
        }
        repo.deleteById(id);
    }

    public List<ScheduleDTO> getSchedulesForStudent(Long studentId) {
        User student = userRepo.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        if (!"STUDENT".equalsIgnoreCase(student.getRole())) {
            throw new IllegalArgumentException("User is not a student");
        }

        Long classId = student.getSchoolClass().getId();
        return repo.findByClassId(classId).stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<ScheduleDTO> getSchedulesForTeacher(Long teacherId) {
        User teacher = userRepo.findById(teacherId)
                .orElseThrow(() -> new TeacherNotFoundException("Teacher not found"));

        if (!"TEACHER".equalsIgnoreCase(teacher.getRole())) {
            throw new IllegalArgumentException("User is not a teacher");
        }

        return repo.findByTeacherId(teacherId).stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<ScheduleDTO> getSchedulesForClass(Long classId) {
        classRepo.findById(classId)
                .orElseThrow(() -> new ClassNotFoundException("Class not found"));

        return repo.findByClassId(classId).stream()
                .map(this::convertToDTO)
                .toList();
    }

}
