package com.wellsfargo.training.team6.quickloan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.team6.quickloan.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
