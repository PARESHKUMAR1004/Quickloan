package com.wellsfargo.training.team6.quickloan.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//import com.wellsfargo.training.team6.quickloan.model.LoanCard;
//import com.wellsfargo.training.team6.quickloan.model.Employee;


@Embeddable
@NoArgsConstructor
@Getter
@Setter
public class EmployeeCardPrimaryGroup  implements Serializable {
	
	@ManyToOne
	@JoinColumn(name="loan_id", nullable=false)
	private LoanCard LoanCard;
	
	@ManyToOne
	@JoinColumn(name="employeeid", nullable=false)
	private Employee Employee;

	public EmployeeCardPrimaryGroup(LoanCard loanCard,Employee employee) {
		super();
		LoanCard = loanCard;
		Employee = employee;
	}

	
}
