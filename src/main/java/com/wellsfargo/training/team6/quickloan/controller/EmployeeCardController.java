package com.wellsfargo.training.team6.quickloan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.team6.quickloan.exception.ResourceNotFoundException;
import com.wellsfargo.training.team6.quickloan.model.EmployeeCard;
import com.wellsfargo.training.team6.quickloan.model.LoanIssueSummary;
import com.wellsfargo.training.team6.quickloan.service.EmployeeCardService;
import com.wellsfargo.training.team6.quickloan.service.LoanApprovalService;

@RestController
public class EmployeeCardController {

	@Autowired
	private EmployeeCardService empCardService;
	
	@Autowired
	private LoanApprovalService loanService;
	
	@GetMapping("/getStatusPendingCards")
	public List<EmployeeCard> getStatusPendingCards() {
		return empCardService.getStatusPendingCards();
	}
	
	@GetMapping("/getEmpCards/{id}")
	public List<EmployeeCard> getCardByEmpId(@PathVariable(value="id") Long empId) {
		return empCardService.getCardByEmpId(empId);
	}
	
	@PostMapping("/saveEmpCard")
	public EmployeeCard saveEmployeeCard(@Validated @RequestBody EmployeeCard empCard) {
		return empCardService.saveEmployeeCard(empCard);
	}
	
	@PostMapping("/updateStatus/{id}")
	public EmployeeCard updateCardStatus(@PathVariable(value="id") Long empCardId) throws ResourceNotFoundException {
		return loanService.approveLoan(empCardId);
	}
	
	@GetMapping("/getLoanIssueSummary/{id}")
	public List<LoanIssueSummary> getLoanIssueSummaryByEmpId(@PathVariable(value="id") Long empId) {
		return empCardService.getLoanIssueSummaryByEmpId(empId);
	}
	
	//requestLoan
//	@PostMapping("/saveEmpCard")
//	public EmployeeCard saveEmpCard(@Validated @RequestBody EmployeeCard empCard) {
//		
//	}
	
	
	

//	public saveIssueDe
}
