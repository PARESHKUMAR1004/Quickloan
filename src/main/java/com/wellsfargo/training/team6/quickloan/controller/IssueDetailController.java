package com.wellsfargo.training.team6.quickloan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.team6.quickloan.exception.ResourceNotFoundException;
import com.wellsfargo.training.team6.quickloan.model.Employee;
import com.wellsfargo.training.team6.quickloan.model.IssueDetail;
import com.wellsfargo.training.team6.quickloan.model.IssueItemSummary;
import com.wellsfargo.training.team6.quickloan.model.Item;
import com.wellsfargo.training.team6.quickloan.service.EmployeeService;
import com.wellsfargo.training.team6.quickloan.service.IssueDetailService;
import com.wellsfargo.training.team6.quickloan.service.ItemService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api")
public class IssueDetailController {

	@Autowired
	private IssueDetailService issueService;
	
	@Autowired
	private EmployeeService empService;
	
	@Autowired
	private ItemService itemService;

	//ERROR
	@GetMapping("/getIssues/{empId}")
	public List<IssueDetail> getIssues(@PathVariable(value="empId") Long empId) {
		return issueService.getIsssuesByEmpId(empId);
	}
	
	@GetMapping("/getIssueItemSummary/{empId}")
	public List<IssueItemSummary> getIssueItemSummary(@PathVariable(value="empId") Long empId) {
		return issueService.getIssueItemSummary(empId);
	}
	
	@PostMapping("/saveIssue/{category}/{make}/{description}/{value}/{empId}")
	public Long saveIssue(
			@PathVariable(value="category") String cat,
			@PathVariable(value="make") String make,
			@PathVariable(value="description") String desc,
			@PathVariable(value="value") int value,
			@PathVariable(value="empId") Long empId
			) throws ResourceNotFoundException {
		
		Item item = itemService.issueItem(cat, make, desc, value);
		Employee emp = empService.findEmployeeById(empId).orElseThrow(
				() -> new ResourceNotFoundException("No employee with id: " + empId));
		
		IssueDetail issueDetail = issueService.saveIssue(item, emp);
		return issueDetail.getIssueId();
	}
}