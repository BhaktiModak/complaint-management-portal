package com.complaintportal.service;

import com.complaintportal.model.*;
import com.complaintportal.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepo;
    private final UserRepository userRepo;

    public ComplaintService(ComplaintRepository c, UserRepository u) {
        this.complaintRepo = c;
        this.userRepo = u;
    }

    public Complaint createComplaint(Long userId, Complaint complaint) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        complaint.setUser(user);
        return complaintRepo.save(complaint);
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepo.findAll();
    }

    public List<Complaint> getUserComplaints(Long userId) {
        return complaintRepo.findByUserId(userId);
    }

    public Complaint updateStatus(Long id, String status) {
        Complaint c = complaintRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        c.setStatus(status);
        return complaintRepo.save(c);
    }
}
