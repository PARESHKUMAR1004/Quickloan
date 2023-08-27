package com.wellsfargo.training.team6.quickloan.service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.team6.quickloan.exception.TransactionalException;
import com.wellsfargo.training.team6.quickloan.model.EmployeeCard;
import com.wellsfargo.training.team6.quickloan.model.LoanCard;
import com.wellsfargo.training.team6.quickloan.repository.LoanCardRepository;

import jakarta.transaction.Transactional;

@Service
public class LoanCardService {

	@Autowired
	private LoanCardRepository lRepo;
	
	@Autowired
	private EmployeeCardService empCardService;
	
	public LoanCard saveLoanCard(LoanCard lCard) {
		lCard.setLoanActiveStatus(true);
		return lRepo.save(lCard);
	}
	
	public List<LoanCard> getAllLoanCards() {
		return lRepo.findAll();
	}
	
	public List<LoanCard> getLoanCardsByType(String type) {
		return lRepo.findByLoanType(type);
	}
	
	public Optional<LoanCard> getLoanCardById(Long id) {
		return lRepo.findById(id);
	}
	
	@Transactional
	public Map<Boolean, String> deleteLoanCard(LoanCard lCard) 
			throws TransactionalException {
		
		try {
			List<EmployeeCard> empCardList = empCardService.findIssuedByLoanCard(lCard);
			LocalDate currDate = LocalDate.now();
			
			List<EmployeeCard> inactiveEmpCardList = empCardList.stream()
					.filter(card -> card.getLoanIssueStatus().equals("Approved") && 
							currDate.isAfter(card.getCardIssueDate()
									.plusDays(card.getLoanCard().getLoanDuration())))
					.collect(Collectors.toList());
			
			int activeLoans = empCardList.size() - inactiveEmpCardList.size();
		
			if(activeLoans > 0) {
				empCardService.updatePendingStatusToRejectedByLoan(lCard);
				lCard.setLoanActiveStatus(false);
				lRepo.save(lCard);
				return Collections.singletonMap(false, ("There are " + activeLoans + " active issued loans to employees."
						+ " Can't delete the loan card to preserve integrity. "
						+ "Instead, the active status of the loan card is set to false, "
						+ "so no new employees can avail this loan."));
			} 
		
			if(empCardList.isEmpty()) {
				empCardService.deleteEmpCards(empCardList);
			}
		
			lRepo.delete(lCard);
		
			return Collections.singletonMap(true, ("There are no active issued loans for this card. "
					+ "Deleted the loan card from database. Corresponding "
					+ "employee card data is also deleted."));
		} catch(Exception e) {
			throw new TransactionalException("Transactional exception when deleting loan card");
		}
	}
}
