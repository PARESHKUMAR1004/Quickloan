package com.wellsfargo.training.team6.quickloan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wellsfargo.training.team6.quickloan.model.Employee;
import com.wellsfargo.training.team6.quickloan.model.IssueDetail;
import com.wellsfargo.training.team6.quickloan.model.IssueItemSummary;

public interface IssueDetailRepository extends JpaRepository<IssueDetail, Long> {

	public List<IssueDetail> findByEmployee_Employeeid(Long employeeid);
	
	@Query("SELECT * FROM IssueDetail i WHERE i.employee = ?1")
	public List<IssueDetail> findByEmp(Employee emp);

	@Query("SELECT new com.wellsfargo.training.team6.quickloan.model.IssueItemSummary"
			+ "(i.issueId, it.itemDescription, it.itemMake, "
			+ "it.itemCategory, it.itemValuation) "
			+ "FROM IssueDetail i JOIN i.item it"
			+ " WHERE i.employee.employeeid = ?1")
	public List<IssueItemSummary> getIssueItemSummaryByEmpId(Long empId);
}
