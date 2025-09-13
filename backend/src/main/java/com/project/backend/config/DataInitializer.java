package com.project.backend.config;

import com.project.backend.entity.SchoolClass;
import com.project.backend.repository.SchoolClassRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final SchoolClassRepository classRepository;

    public DataInitializer(SchoolClassRepository classRepository) {
        this.classRepository = classRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if classes already exist
        if (classRepository.count() == 0) {
            // Create sample classes
            SchoolClass class10A = new SchoolClass();
            class10A.setName("10A");
            class10A.setCapacity(30);
            classRepository.save(class10A);

            SchoolClass class10B = new SchoolClass();
            class10B.setName("10B");
            class10B.setCapacity(25);
            classRepository.save(class10B);

            SchoolClass class11A = new SchoolClass();
            class11A.setName("11A");
            class11A.setCapacity(28);
            classRepository.save(class11A);

            SchoolClass class11B = new SchoolClass();
            class11B.setName("11B");
            class11B.setCapacity(32);
            classRepository.save(class11B);

            System.out.println("Sample classes created: 10A, 10B, 11A, 11B");
        }
    }
}
