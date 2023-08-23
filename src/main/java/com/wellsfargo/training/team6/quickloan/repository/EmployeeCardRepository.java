package com.wellsfargo.training.team6.quickloan.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.wellsfargo.training.team6.quickloan.model.EmployeeCard;
import com.wellsfargo.training.team6.quickloan.model.Item;
import com.wellsfargo.training.team6.quickloan.model.LoanCard;
import com.wellsfargo.training.team6.quickloan.model.LoanIssueSummary;

import jakarta.transaction.Transactional;

public interface EmployeeCardRepository extends JpaRepository<EmployeeCard, Long> {
	
	@Query("SELECT * FROM EmployeeCard ec WHERE ec.employee.employeeid = ?1")
	public List<EmployeeCard> findByEmployee_Employeeid(Long employeeid);
	
	public List<EmployeeCard> findByLoanIssueStatus(String status);
	
	@Query("SELECT new com.wellsfargo.training.team6.quickloan.model.LoanIssueSummary"
			+ "(l.loanId, l.loanType, l.loanDuration, e.cardIssueDate) "
			+ "FROM EmployeeCard e JOIN e.loanCard l "
			+ "WHERE e.employee.employeeid = ?1")
	public List<LoanIssueSummary> findLoanIssueSummary(Long empId);
	
	@Query("SELECT COUNT(ec) FROM EmployeeCard ec " +
		       "WHERE ec.loanCard = :loan " +
		       "AND :currDate < (ec.cardIssueDate + ec.loanDuration) ")
	public int countOfIssuedActiveLoansByLoan(LoanCard loan, LocalDate currDate);
	
	@Query("SELECT * FROM EmployeeCard ec "
			+ "WHERE ec.loanCard = :loan "
			+ "AND ec.loanIssueStatus = 'Approved'")
	public List<EmployeeCard> findIssuedByLoanCard(LoanCard loan);
	
	@Transactional
	@Modifying
	@Query("UPDATE EmployeeCard e SET e.loanIssueStatus = 'Rejected' WHERE e.item = ?1 "
			+ "AND e.loanIssueStatus = 'Pending'")
	public void updatePendingStatusToRejectedByItem(Item item);
	
}
