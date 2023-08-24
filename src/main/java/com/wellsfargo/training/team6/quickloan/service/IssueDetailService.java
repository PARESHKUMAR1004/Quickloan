package com.wellsfargo.training.team6.quickloan.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
		LocalDate date = LocalDate.now();
		IssueDetail issue = new IssueDetail();
		issue.setEmployee(emp);
		issue.setItem(item);
		issue.setIssueDate(date);
		
		return idRepo.save(issue);
	}
	
	public List<IssueDetail> getIsssuesByEmpId(Long empId) {
		Long temp = 1L;
		IssueDetail issue = idRepo.findById(temp).get();
		System.out.println(issue.getEmployee().getEmployeeId());
		
		List<IssueDetail> iList = new ArrayList<>();
		return iList;
		
//		return idRepo.findByEmpById(empId);
	}
	
	public List<IssueItemSummary> getIssueItemSummary(Long empId) {
		return idRepo.getIssueItemSummaryByEmpId(empId);
	}
	
	public void deleteIssuesByEmploye(Employee emp) {
		List<IssueDetail> issues = idRepo.findByEmp(emp);
		idRepo.deleteAllInBatch(issues);
	}


}