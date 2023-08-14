package com.wellsfargo.training.team6.quickloan.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.team6.quickloan.model.Employee;
import com.wellsfargo.training.team6.quickloan.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepository erepo;
	
	public Employee registerEmployee(Employee E) {
		return erepo.save(E);
		
	}
	
	public Optional<Employee> findEmployee(String email) {
		
		return erepo.findByEmail(email);
		
	}
	

}
