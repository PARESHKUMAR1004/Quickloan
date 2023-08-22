package com.wellsfargo.training.team6.quickloan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.wellsfargo.training.team6.quickloan.model.EmployeeCard;
import com.wellsfargo.training.team6.quickloan.model.LoanIssueSummary;

@Repository
public interface EmployeeCardRepository extends JpaRepository<EmployeeCard, Long> {
	
	public List<EmployeeCard> findByEmployee_Employeeid(Long employee_id);
	
	public List<EmployeeCard> findByStatus(char status);
	
	@Query("SELECT new com.wellsfargo.training.team6.quickloan.model.LoanIssueSummary"
			+ "(l.loanId, l.loanType, l.loanDuration, e.cardIssueDate) "
			+ "FROM EmployeeCard e JOIN e.loanCard l "
			+ "WHERE e.employee.employeeid = ?1")
	public List<LoanIssueSummary> findLoanIssueSummary(Long empId);
	
}
