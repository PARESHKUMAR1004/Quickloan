package com.wellsfargo.training.team6.quickloan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
		return lService.saveCard(lCard);
	}
	
	@GetMapping("/getAllLoans")
	public List<LoanCard> getCard(){
		return lService.getLoanCards();
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
}
