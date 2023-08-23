package com.wellsfargo.training.team6.quickloan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.wellsfargo.training.team6.quickloan.service.AdminService;


@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api")
public class AdminController {
	
	@Autowired
	private AdminService aService;
	
	@GetMapping("/loginAdmin/{email}/{password}")
	public Boolean loginAdmin(
			@PathVariable(value="email") String email,
			@PathVariable(value="password") String password) {
	
		return aService.validateAdmin(email, password);
	}

}
