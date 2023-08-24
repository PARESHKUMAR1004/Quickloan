package com.wellsfargo.training.team6.quickloan.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.team6.quickloan.exception.ResourceNotFoundException;
import com.wellsfargo.training.team6.quickloan.model.Employee;
import com.wellsfargo.training.team6.quickloan.model.EmployeeCard;
import com.wellsfargo.training.team6.quickloan.model.Item;
import com.wellsfargo.training.team6.quickloan.model.LoanCard;
import com.wellsfargo.training.team6.quickloan.model.LoanIssueSummary;
import com.wellsfargo.training.team6.quickloan.repository.EmployeeCardRepository;
import com.wellsfargo.training.team6.quickloan.repository.EmployeeRepository;
import com.wellsfargo.training.team6.quickloan.repository.ItemRepository;
import com.wellsfargo.training.team6.quickloan.repository.LoanCardRepository;

@Service
public class EmployeeCardService {

	@Autowired
	private EmployeeCardRepository empCardRepo;
	
	@Autowired
	private EmployeeRepository empRepo;

	@Autowired
	private LoanCardRepository loanRepo;
	
	@Autowired
	private ItemRepository itemRepo;
	
	public List<EmployeeCard> getCardByEmpId(Long id) {
		return empCardRepo.findByEmployee_EmployeeId(id);
	}
	
	public List<EmployeeCard> getStatusPendingCards() {
		return empCardRepo.findByLoanIssueStatus("Pending");
	}
	
	public Optional<EmployeeCard> getEmployeeCardById(Long id) {
		return empCardRepo.findById(id);
	}
	
	public EmployeeCard saveEmployeeCard(EmployeeCard empCard) {
		return empCardRepo.save(empCard);
	}
	
	public EmployeeCard saveEmployeeCard(Long empId, Long loanId, Long itemId) 
			throws ResourceNotFoundException {
		EmployeeCard empCard = new EmployeeCard();
		empCard.setLoanIssueStatus("Pending");
		
		Employee emp = empRepo.findById(empId).orElseThrow(
				() -> new ResourceNotFoundException("Employee not found"));
		LoanCard lc = loanRepo.findById(loanId).orElseThrow(
				() -> new ResourceNotFoundException("LoanCard not found"));
		Item item = itemRepo.findById(itemId).orElseThrow(
				() -> new ResourceNotFoundException("Item not found"));
		
		empCard.setEmployee(emp);
		empCard.setLoanCard(lc);
		empCard.setItem(item);
		
		return empCardRepo.save(empCard);
	}
	
	public List<LoanIssueSummary> getLoanIssueSummaryByEmpId(Long empId) {
		return empCardRepo.findLoanIssueSummary(empId);
	}
	
	public void updatePendingStatusToRejectedByItem(Item item) {
		empCardRepo.updatePendingStatusToRejectedByItem(item);
	}
	
	public void updatePendingStatusToRejectedByLoan(LoanCard lc) {
		empCardRepo.updatePendingStatusToRejectedByLoan(lc);
	}
	
	public int countOfIssuedActiveLoansByLoan(LoanCard lc) {
		LocalDate currDate = LocalDate.now();
		return empCardRepo.countOfIssuedActiveLoansByLoan(lc, currDate);
	}
	
	public List<EmployeeCard> findIssuedByLoanCard(LoanCard lc) {
		return empCardRepo.findIssuedByLoanCard(lc);
	}
	
	public void deleteEmpCards(List<EmployeeCard> empCardList) {
		empCardRepo.deleteAllInBatch(empCardList);
	}
}
