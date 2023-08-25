package com.wellsfargo.training.team6.quickloan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wellsfargo.training.team6.quickloan.model.Employee;
import com.wellsfargo.training.team6.quickloan.model.IssueDetail;
import com.wellsfargo.training.team6.quickloan.model.IssueItemSummary;

public interface IssueDetailRepository extends JpaRepository<IssueDetail, Long> {

	
//	@Query("SELECT i FROM IssueDetail i WHERE i.employee.employeeId = ?1")
	public List<IssueDetail> findByEmployee_EmployeeId(Long id);
	
	@Query("SELECT i FROM IssueDetail i WHERE i.employee = ?1")
	public List<IssueDetail> findByEmp(Employee emp);

	@Query("SELECT new com.wellsfargo.training.team6.quickloan.model.IssueItemSummary"
			+ "(i.issueId, it.itemDescription, it.itemMake, "
			+ "it.itemCategory, it.itemValuation) "
			+ "FROM IssueDetail i JOIN i.item it"
			+ " WHERE i.employee.employeeId = ?1")
	public List<IssueItemSummary> getIssueItemSummaryByEmpId(Long empId);
}
