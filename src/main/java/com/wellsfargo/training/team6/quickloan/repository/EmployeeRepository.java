package com.wellsfargo.training.team6.quickloan.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.team6.quickloan.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	public Optional<Employee> findByEmail(String Email);
}
