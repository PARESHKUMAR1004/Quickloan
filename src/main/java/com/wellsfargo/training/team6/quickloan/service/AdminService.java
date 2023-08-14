package com.wellsfargo.training.team6.quickloan.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.team6.quickloan.model.Admin;
import com.wellsfargo.training.team6.quickloan.repository.AdminRepository;

@Service
public class AdminService {
	@Autowired
	private AdminRepository arepo;
	
	public Admin registerAdmin(Admin A)
	{
		return arepo.save(A);
	}
	
	public Optional<Admin> findAdmin(String Email) {
		return arepo.findByEmail(Email);
	}

}
