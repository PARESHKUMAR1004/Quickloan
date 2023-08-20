package com.wellsfargo.training.team6.quickloan.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.wellsfargo.training.team6.quickloan.exception.ResourceNotFoundException;
import com.wellsfargo.training.team6.quickloan.model.Admin;
import com.wellsfargo.training.team6.quickloan.service.AdminService;


@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api")
public class AdminController {
	
	@Autowired
	private AdminService aservice;
	
	@PostMapping("/registerAdmin")
	public ResponseEntity<String> createAdmin(@Validated @RequestBody Admin A)
	{

		
		Admin registeredAdmin=aservice.registerAdmin(A);
		 if (registeredAdmin!= null) {
	            return ResponseEntity.ok("Registration successful");
	        } else {
	            return ResponseEntity.badRequest().body("Registration failed");
	        }
		
		
	}
	
	@PostMapping("/loginAdmin")
	public Boolean loginAdmin(@Validated @RequestBody Admin A) throws ResourceNotFoundException
	{
		Boolean userExists=false;
		String email=A.getEmail();
		String password=A.getPassword();
		
		
		Admin foundAdmin = aservice.findAdmin(email).orElseThrow(() ->
		new ResourceNotFoundException("Admin not found for this email :: "));
		
		
		
		

		
		if(email.equals(foundAdmin.getEmail()) && password.equals(foundAdmin.getPassword()))
		{
			userExists=true;
		}
		return userExists;
		
	
		
	}

}
