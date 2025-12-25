package com.complaintportal.controller;

import com.complaintportal.model.Complaint;
import com.complaintportal.model.User;
import com.complaintportal.repository.UserRepository;
import com.complaintportal.service.ComplaintService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService service;
    private final UserRepository userRepo;

    public ComplaintController(ComplaintService s, UserRepository u) {
        this.service = s;
        this.userRepo = u;
    }

    @PostMapping("/user/{userId}")
    public Complaint create(@PathVariable Long userId,
                            @RequestBody Complaint complaint) {
        return service.createComplaint(userId, complaint);
    }

    @GetMapping("/user/{userId}")
    public List<Complaint> userComplaints(@PathVariable Long userId) {
        return service.getUserComplaints(userId);
    }

    @GetMapping("/admin/{adminId}")
    public List<Complaint> adminComplaints(@PathVariable Long adminId) {
        User admin = userRepo.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {
            throw new RuntimeException("Unauthorized");
        }
        return service.getAllComplaints();
    }

    @PutMapping("/{id}/status")
    public Complaint updateStatus(@PathVariable Long id,
                                  @RequestParam String status) {
        return service.updateStatus(id, status);
    }
}
