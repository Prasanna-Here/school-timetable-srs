package com.project.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ScheduleDTO {
    private Long id;
    private String className;
    private String subjectName;
    private String teacherName;
    private String roomName;
    private String timeSlot;
}
