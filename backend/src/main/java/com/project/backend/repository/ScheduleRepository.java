package com.project.backend.repository;

import com.project.backend.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    @Query("SELECT s FROM Schedule s " +
           "WHERE s.timeSlot.id = :tsId " +
           "AND (s.teacher.id = :tId OR s.room.id = :rId OR s.schoolClass.id = :cId)")
    List<Schedule> findConflicts(@Param("tsId") Long timeSlotId,
                                 @Param("tId") Long teacherId,
                                 @Param("rId") Long roomId,
                                 @Param("cId") Long classId);

     @Query("SELECT s FROM Schedule s WHERE s.schoolClass.id = :classId")
    List<Schedule> findByClassId(@Param("classId") Long classId);

    @Query("SELECT s FROM Schedule s WHERE s.teacher.id = :teacherId")
    List<Schedule> findByTeacherId(@Param("teacherId") Long teacherId);


}
