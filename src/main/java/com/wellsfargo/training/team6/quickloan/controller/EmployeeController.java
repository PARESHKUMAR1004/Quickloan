package com.wellsfargo.training.team6.quickloan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.team6.quickloan.exception.ResourceNotFoundException;
import com.wellsfargo.training.team6.quickloan.model.Admin;
import com.wellsfargo.training.team6.quickloan.model.Employee;
import com.wellsfargo.training.team6.quickloan.service.EmployeeService;

@RestController
@RequestMapping(value="/api")
public class EmployeeController {
	
	@Autowired
	public EmployeeService eservice;
	
	
	@PostMapping("/registerEmployee")
	public ResponseEntity<String> createUser(@Validated @RequestBody Employee E)
	{
		Employee registeredEmployee=eservice.registerEmployee(E);
		 if (registeredEmployee!= null) {
	            return ResponseEntity.ok("Registration successful");
	        } else {
	            return ResponseEntity.badRequest().body("Registration failed");
	        }
	}
	
	@PostMapping("/loginEmployee")
	public Boolean loginEmployee(@Validated @RequestBody Employee E) throws ResourceNotFoundException
	{
		Boolean userExists=false;
		String email=E.getEmail();
		String password=E.getPassword();
		
		Employee foundEmployee = eservice.findEmployee(email).orElseThrow(() ->
		new ResourceNotFoundException("Employee not found for this id :: "));
		
		if(email.equals(foundEmployee.getEmail()) && password.equals(foundEmployee.getPassword()))
		{
			userExists=true;
		}
		
		
		return userExists;
	}
}
