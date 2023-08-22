package com.wellsfargo.training.team6.quickloan.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.team6.quickloan.model.EmployeeCard;
import com.wellsfargo.training.team6.quickloan.model.LoanIssueSummary;
import com.wellsfargo.training.team6.quickloan.repository.EmployeeCardRepository;

@Service
public class EmployeeCardService {

	@Autowired
	private EmployeeCardRepository empCardRepo;

	public List<EmployeeCard> getCardByEmpId(Long id) {
		return empCardRepo.findByEmployee_Employeeid(id);
	}
	
	public List<EmployeeCard> getStatusPendingCards() {
		return empCardRepo.findByStatus('N');
	}
	
	public Optional<EmployeeCard> getEmployeeCardById(Long id) {
		return empCardRepo.findById(id);
	}
	
	public EmployeeCard saveEmployeeCard(EmployeeCard empCard) {
		return empCardRepo.save(empCard);
	}
	
	public List<LoanIssueSummary> getLoanIssueSummaryByEmpId(Long empId) {
		return empCardRepo.findLoanIssueSummary(empId);
	}
}
