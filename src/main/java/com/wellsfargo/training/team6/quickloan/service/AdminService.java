package com.wellsfargo.training.team6.quickloan.service;

import org.springframework.stereotype.Service;

@Service
public class AdminService {
	
	//hardcoded single admin details
	public boolean validateAdmin(String email, String password) {
		return (email.equals("admin@wellsfargo.com") && password.equals("admin123"));
	}
}
