package com.wellsfargo.training.team6.quickloan.model;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoanIssueSummary {

	private Long loanId;
	private String loanType;
	private int loanDuration;
	private Date cardIssueDate;
}
