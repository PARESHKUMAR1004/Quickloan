package com.wellsfargo.training.team6.quickloan.model;

import java.time.LocalDate;

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
	private Long itemId;
	private String loanType;
	private int loanDuration;
	private LocalDate cardIssueDate;
	private String status;
}
