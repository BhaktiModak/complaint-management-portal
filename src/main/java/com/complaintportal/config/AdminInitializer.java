package com.complaintportal.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import com.complaintportal.model.User;
import com.complaintportal.repository.UserRepository;

@Component
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@cms.com";
        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            User admin = new User();
            admin.setName("System Admin");
            admin.setEmail(adminEmail);
            admin.setPassword("admin123");   // change later to hashed
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("Default admin created -> " + adminEmail + " / admin123");
        }
    }
}
