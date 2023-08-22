package com.wellsfargo.training.team6.quickloan.service;

import java.time.LocalDate;
import java.util.List;
import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.team6.quickloan.model.Employee;
import com.wellsfargo.training.team6.quickloan.model.IssueDetail;
import com.wellsfargo.training.team6.quickloan.model.IssueItemSummary;
import com.wellsfargo.training.team6.quickloan.model.Item;
import com.wellsfargo.training.team6.quickloan.repository.IssueDetailRepository;

@Service
public class IssueDetailService {

	@Autowired
	private IssueDetailRepository idRepo;
	
	public IssueDetail saveIssue(Item item, Employee emp) {
		Date date = new Date(System.currentTimeMillis());
		IssueDetail issue = new IssueDetail();
		issue.setEmployee(emp);
		issue.setItem(item);
		issue.setIssueDate(date);
		
		return idRepo.save(issue);
	}
	
	public List<IssueDetail> getIsssuesByEmpId(Long empId) {
		return idRepo.findByEmployee_Employeeid(empId);
	}
	
	public List<IssueItemSummary> getIssueItemSummary(Long empId) {
		return idRepo.getIssueItemSummaryByEmpId(empId);
	}


}