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

@RestController
public class EmployeeCardController {

	@Autowired
	private EmployeeCardService empCardService;
	
	@GetMapping("/getStatusPendingCards")
	public List<EmployeeCard> getStatusPendingCards() {
		return empCardService.getStatusPendingCards();
	}
	
	@GetMapping("/getEmpCards/{id}")
	public List<EmployeeCard> getCardByEmpId(@PathVariable(value="id") Long empId) {
		return empCardService.getCardByEmpId(empId);
	}
	
	@PostMapping("/updateStatus/{id}")
	public EmployeeCard updateCardStatus(@PathVariable(value="id") Long empCardId) throws ResourceNotFoundException {
		EmployeeCard empCard = empCardService.getEmployeeCardById(empCardId).orElseThrow(
				() -> new ResourceNotFoundException("No employee card with id: " + empCardId));
	
		empCard.setStatus('Y');
		return empCardService.saveEmployeeCard(empCard);
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
