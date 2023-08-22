package com.wellsfargo.training.team6.quickloan.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wellsfargo.training.team6.quickloan.model.LoanCard;

@Repository
public interface LoanCardRepository extends JpaRepository<LoanCard, Long>{
	
	//custom method to get loans by type
	public List<LoanCard> findByLoanType(String loanType);
}
