package com.wellsfargo.training.team6.quickloan.model;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="loancards")
@NoArgsConstructor
@Getter
@Setter
public class LoanCard {
	

	@Id
	@SequenceGenerator(name="loan_id", initialValue=1000, allocationSize=1)
	@GeneratedValue(strategy=GenerationType.IDENTITY, generator="loan_id")
	private Long loanId;
	
	@Column(name="loan_type", nullable=false)
	private String loanType;
	
	@Column(name="loan_duration", nullable=false)
	private int loanDuration;
	
	@Column(name="loan_active_status", nullable=false)
	private boolean loanActiveStatus;
	
//	@OneToMany(mappedBy="loanCard")
//	private Set<EmployeeCard> employeeCard;

}
