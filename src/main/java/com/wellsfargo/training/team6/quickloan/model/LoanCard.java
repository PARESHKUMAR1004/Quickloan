package com.wellsfargo.training.team6.quickloan.model;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long loan_id;
	
	
	@Column(nullable=false)
	private String loan_type;
	
	
	@Column(nullable=false)
	private int loan_duration;
	
	@OneToMany(mappedBy="LoanCard")
	private Set<EmployeeCard> EmployeeCard;

}
