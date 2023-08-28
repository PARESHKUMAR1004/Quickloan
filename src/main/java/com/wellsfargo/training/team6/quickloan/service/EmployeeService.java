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
import com.wellsfargo.training.team6.quickloan.model.Employee;
import com.wellsfargo.training.team6.quickloan.model.EmployeeCard;
import com.wellsfargo.training.team6.quickloan.repository.EmployeeRepository;

import jakarta.transaction.Transactional;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepository eRepo;
	
	@Autowired
	private EmployeeCardService empCardService;
	
	@Autowired
	private ItemService itemService;
	
	@Autowired
	private IssueDetailService issueService;
	
	public Employee registerEmployee(Employee E) {
		return eRepo.save(E);
	}
	
	public List<Employee> listAll(){
		return eRepo.findAll();
	}
	
	public Optional<Employee> findEmployeeById(Long id) {
		return eRepo.findById(id);
	}
	
	public Optional<Employee> findEmployeeByMail(String email) {
		return eRepo.findByEmail(email);
	}
	
	public Employee saveEmployee(Employee emp) {
		return eRepo.save(emp);
	}
	
	//If user has active loans, admin can't delete the user.
	//If user has no active loans, employee row along with items issued and emp card will be deleted.
	@Transactional
	public Map<Boolean, String> deleteEmployee(Employee empl) throws TransactionalException {
		
		try {
			List<EmployeeCard> empCardList = empCardService.getCardByEmpId(empl.getEmployeeId());
			
			LocalDate currDate = LocalDate.now();
			
			Long activeLoans = empCardList.stream()
					.filter(card -> card.getLoanIssueStatus().equals("Approved") &&
							currDate.isBefore(card.getCardIssueDate()
									.plusDays(card.getLoanCard().getLoanDuration())))
					.count();
	
			if(activeLoans > 0) {
				return Collections.singletonMap(false, ("Can't delete employee: "+ empl.getEmployeeId()
				+ ", employee has " + activeLoans + " active loans"));
			}
			
			//Updating issue status of items
			List<EmployeeCard> issuedLoanCards = empCardList.stream()
					.filter(card -> card.getLoanIssueStatus().equals("Approved"))
					.collect(Collectors.toList());
		
			for(EmployeeCard card : issuedLoanCards) {
				itemService.updateItemStatus(card.getItem(), 'N');
			}
			
			empCardService.deleteEmpCards(empCardList);
			issueService.deleteIssuesByEmploye(empl);
			eRepo.delete(empl);
			
			return Collections.singletonMap(true, ("Deleted employee: " + empl.getEmployeeId()
			+ " and corresponding employee card and issue detail data"));
		} catch (RuntimeException e) {
			throw new TransactionalException("Transactional error when trying to delete the employee");
		}
		
	}

}
