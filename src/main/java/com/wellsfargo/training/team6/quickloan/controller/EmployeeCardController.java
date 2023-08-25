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
import com.wellsfargo.training.team6.quickloan.exception.TransactionalException;
import com.wellsfargo.training.team6.quickloan.model.EmployeeCard;
import com.wellsfargo.training.team6.quickloan.model.LoanIssueSummary;
import com.wellsfargo.training.team6.quickloan.service.EmployeeCardService;
import com.wellsfargo.training.team6.quickloan.service.LoanApprovalService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api")
public class EmployeeCardController {

	@Autowired
	private EmployeeCardService empCardService;
	
	@Autowired
	private LoanApprovalService loanService;
	
	@GetMapping("/getStatusPendingCards")
	public List<EmployeeCard> getStatusPendingCards() {
		return empCardService.getStatusPendingCards();
	}
	
	@GetMapping("/getEmpCardsByEmpId/{id}")
	public List<EmployeeCard> getCardByEmpId(@PathVariable(value="id") Long empId) {
		return empCardService.getCardByEmpId(empId);
	}
	
//	@PostMapping("/saveEmpCard")
//	public EmployeeCard saveEmployeeCard(@Validated @RequestBody EmployeeCard empCard) {
//		return empCardService.saveEmployeeCard(empCard);
//	}
	
	@PostMapping("/saveEmpCard/{empId}/{loanId}/{itemId}")
	public EmployeeCard saveEmployeeCard(
			@PathVariable(value="empId") Long empId,
			@PathVariable(value="loanId") Long loanId,
			@PathVariable(value="itemId") Long itemId) throws ResourceNotFoundException {
		return empCardService.saveEmployeeCard(empId, loanId, itemId);
	}
	
	@PostMapping("/rejectLoan/{id}")
	public String rejectLoan(@PathVariable(value="id") Long id) throws ResourceNotFoundException {
		return empCardService.rejectEmployeeCard(id);
	}
	
	@PostMapping("/approveLoan/{id}")
	public EmployeeCard approveLoan(@PathVariable(value="id") Long empCardId) 
			throws TransactionalException, ResourceNotFoundException {
		return loanService.approveLoan(empCardId);
	}
	
	@GetMapping("/getLoanIssueSummary/{id}")
	public List<LoanIssueSummary> getLoanIssueSummaryByEmpId(@PathVariable(value="id") Long empId) {
		return empCardService.getLoanIssueSummaryByEmpId(empId);
	}
}
