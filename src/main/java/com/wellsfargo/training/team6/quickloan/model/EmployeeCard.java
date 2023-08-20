package com.wellsfargo.training.team6.quickloan.model;

import java.sql.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Entity
@Table(name="employee_cards")
@NoArgsConstructor
@Getter
@Setter
public class EmployeeCard {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
//	
//	@EmbeddedId
//	private EmployeeCardPrimaryGroup EmployeeCardPrimaryGroup;
	
	
	
	
	@ManyToOne
	@JoinColumn(name="loan_id", nullable=false)
	private LoanCard LoanCard;
	
	
	
	@ManyToOne
	@JoinColumn(name="employeeid", nullable=false)
	private Employee Employee;
	
	
	
	@Column(nullable=false)
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date card_issue_date;
	
	
	
	
	
	
	

}
