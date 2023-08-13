package com.wellsfargo.training.team6.quickloan.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.wellsfargo.training.team6.quickloan.exception.ResourceNotFoundException;
import com.wellsfargo.training.team6.quickloan.model.Admin;
import com.wellsfargo.training.team6.quickloan.service.AdminService;

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
		Boolean a=false;
		Long id=A.getAdminid();
		String password=A.getPassword();
		
		
		Admin foundAdmin = aservice.findAdmin(id).orElseThrow(() ->
		new ResourceNotFoundException("Admin not found for this id :: "));
		
		
		System.out.println(foundAdmin.getAdminid());
		System.out.println(id);
		System.out.println(foundAdmin.getPassword());
		System.out.println(password);
		
		
//		if(id==admin.getAdminid() && password==admin.getPassword()) {
//			a=true;
//			
//		}
		
		if(id.equals(foundAdmin.getAdminid()) && password.equals(foundAdmin.getPassword()))
		{
			a=true;
		}
		return a;
		
	
		
	}

}
