package com.wellsfargo.training.team6.quickloan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.team6.quickloan.exception.ResourceNotFoundException;
import com.wellsfargo.training.team6.quickloan.model.LoanCard;
import com.wellsfargo.training.team6.quickloan.service.LoanCardService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api")
public class LoanCardController {

	@Autowired
	private LoanCardService lService;
	
	@PostMapping("/saveLoanCard")
	public LoanCard saveCard(@Validated @RequestBody LoanCard lCard) {
		return lService.saveLoanCard(lCard);
	}
	
	@GetMapping("/getAllLoans")
	public List<LoanCard> getCard(){
		return lService.getAllLoanCards();
	}
	
	@GetMapping("/getLoans/{type}")
	public List<LoanCard> getLoanCardByType(@PathVariable(value="type") String type) 
			throws ResourceNotFoundException {
		List<LoanCard> LoanList = lService.getLoanCardsByType(type);
		if(LoanList.isEmpty()) {
			throw new ResourceNotFoundException("No loans with type: " + type);
		}
		return LoanList;
	}
	
	@GetMapping("/getLoan/{id}")
	public LoanCard getLoanCardById(@PathVariable(value="id") Long id) 
			throws ResourceNotFoundException {
		
		return lService.getLoanCardById(id).orElseThrow(
				() -> new ResourceNotFoundException("No Loan with id: " + id));
	}
	
	@PutMapping("/loancards/{id}")
	public ResponseEntity<LoanCard> updateLoanCard(@PathVariable(value="id") Long lcId, 
			@Validated @RequestBody LoanCard lc) throws ResourceNotFoundException{
			
		LoanCard loancard = lService.getLoanCardById(lcId).orElseThrow(
				() -> new ResourceNotFoundException("LoanCard Not found for this id:"+lcId));
		
		loancard.setLoanType(lc.getLoanType());
		loancard.setLoanDuration(lc.getLoanDuration());
		
		final LoanCard updatedLoanCard = lService.saveLoanCard(loancard);
		return ResponseEntity.ok().body(updatedLoanCard);
	}
	
	@DeleteMapping("/deleteLoan/{id}")
	public String deleteLoanCard(@PathVariable(value="id") Long id) throws ResourceNotFoundException {
		LoanCard lc = lService.getLoanCardById(id).orElseThrow(
				() -> new ResourceNotFoundException("No loan card with id: "+ id));
		return lService.deleteLoanCard(lc);
	}
	
}
