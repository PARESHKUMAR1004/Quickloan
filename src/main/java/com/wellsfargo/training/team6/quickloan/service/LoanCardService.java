package com.wellsfargo.training.team6.quickloan.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.team6.quickloan.model.LoanCard;
import com.wellsfargo.training.team6.quickloan.repository.LoanCardRepository;

@Service
public class LoanCardService {

	@Autowired
	private LoanCardRepository lRepo;
	
	public LoanCard saveCard(LoanCard lCard) {
		return lRepo.save(lCard);
	}
	
	public List<LoanCard> getLoanCards() {
		return lRepo.findAll();
	}
	
	public List<LoanCard> getLoanCardsByType(String type) {
		return lRepo.findByLoanType(type);
	}
}
