package com.complaintportal.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.complaintportal.model.User;
import com.complaintportal.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public User registerUser(User user) {
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already registered");
		}
		return userRepository.save(user);
	}

	public User loginUser(String email, String password) {

		Optional<User> optionalUser = userRepository.findByEmail(email);

		if (optionalUser.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
		}

		User user = optionalUser.get();

		if (!user.getPassword().equals(password)) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
		}

		return user;
	}
}
