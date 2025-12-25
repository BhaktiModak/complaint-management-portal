package com.complaintportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.complaintportal.model.*;
import com.complaintportal.service.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public User register(@RequestBody User user) {
		return userService.registerUser(user);
	}
	
	@PostMapping("/login")
	public User login(@RequestBody User loginUser) {
		 return userService.loginUser(loginUser.getEmail(), loginUser.getPassword());
	}
}
