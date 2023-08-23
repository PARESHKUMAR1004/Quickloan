package com.wellsfargo.training.team6.quickloan.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.team6.quickloan.exception.ResourceNotFoundException;
import com.wellsfargo.training.team6.quickloan.model.EmployeeCard;
import com.wellsfargo.training.team6.quickloan.model.Item;
import com.wellsfargo.training.team6.quickloan.repository.EmployeeCardRepository;
import com.wellsfargo.training.team6.quickloan.repository.ItemRepository;

import jakarta.transaction.Transactional;

//TODO: Add exception to be thrown
//TODO: Clean unused methods
@Service
public class LoanApprovalService {
	
	@Autowired
	private EmployeeCardRepository eRepo;
	
	@Autowired
	private ItemRepository iRepo;

	@Transactional
	public EmployeeCard approveLoan(Long empCardId) throws ResourceNotFoundException {
		EmployeeCard empCard = eRepo.findById(empCardId).orElseThrow(
				() -> new ResourceNotFoundException("No employee card with id: " + empCardId));
	
		empCard.setLoanIssueStatus("Approved");
		empCard = eRepo.save(empCard);
		
		Item item = empCard.getItem();
		
		eRepo.updatePendingStatusToRejectedByItem(item);
		item.setIssueStatus('Y');
		iRepo.save(item);
		
		return empCard;
	}
}
