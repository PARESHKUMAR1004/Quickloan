//package com.wellsfargo.training.team6.quickloan.model;
//
//import java.sql.Date;
//
//import com.fasterxml.jackson.annotation.JsonFormat;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.EmbeddedId;
//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//import jakarta.persistence.IdClass;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.OneToOne;
//import jakarta.persistence.Table;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Entity
//@Table(name="dummy_emp")
//@NoArgsConstructor
//@Getter
//@Setter
//public class DummyEmployeeCard {
//	
//	@EmbeddedId
//	private Long dummyEmployeeId;
//	
//	@OneToOne
//	@JoinColumn(name="loan_id")
//	private LoanCard LoanCard;
//	
//	@ManyToOne
//	@JoinColumn(name="employeeid")
//	private Employee Employee;
//	
//	@Column(nullable=false)
//	@JsonFormat(pattern="yyyy-MM-dd")
//	private Date card_issue_date;
//}
