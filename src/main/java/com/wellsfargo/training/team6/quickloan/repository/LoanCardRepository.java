package com.wellsfargo.training.team6.quickloan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.team6.quickloan.model.LoanCard;

public interface LoanCardRepository extends JpaRepository<LoanCard, Long>{
	
	//custom method to get loans by type
	public List<LoanCard> findByLoanType(String loanType);
}
