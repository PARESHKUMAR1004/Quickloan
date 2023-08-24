package com.wellsfargo.training.team6.quickloan.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

	@ManyToOne
	@JoinColumn(name="loan_id", nullable=false)
	private LoanCard loanCard;
	
	@ManyToOne
	@JoinColumn(name="employeeId", nullable=false)
	private Employee employee;
	
	@ManyToOne
	@JoinColumn(name="itemId", nullable=false)
	private Item item;
	
	@Column(name="card_issue_date")
	@JsonFormat(pattern="yyyy-MM-dd")
	private LocalDate cardIssueDate;
	
	//Approved Pending Rejected
	@Column(name="loan_issue_status", nullable=false)
	private String loanIssueStatus;
}
