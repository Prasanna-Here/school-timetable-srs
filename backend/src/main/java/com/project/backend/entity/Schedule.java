package com.project.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // A schedule belongs to one class
    @ManyToOne
    @JoinColumn(name = "class_id")
    private SchoolClass schoolClass;

    // A schedule is for one subject
    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    // Taught by one teacher (User with role=TEACHER)
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private User teacher;

    // Happens in one room
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    // At a specific time slot
    @ManyToOne
    @JoinColumn(name = "timeslot_id")
    private TimeSlot timeSlot;
}
