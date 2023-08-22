package com.wellsfargo.training.team6.quickloan.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class IssueItemSummary {
	private Long issueId;
	private String itemDescription;
	private String itemMake;
	private String itemCategory;
	private int itemValuation;
	
	public IssueItemSummary(Long issueId, String itemDescription, String itemMake, String itemCategory,
			int itemValuation) {
		this.issueId = issueId;
		this.itemDescription = itemDescription;
		this.itemMake = itemMake;
		this.itemCategory = itemCategory;
		this.itemValuation = itemValuation;
	}
	
	public IssueItemSummary() {
		
	}

	public Long getIssueId() {
		return issueId;
	}

	public void setIssueId(Long issueId) {
		this.issueId = issueId;
	}

	public String getItemDescription() {
		return itemDescription;
	}

	public void setItemDescription(String itemDescription) {
		this.itemDescription = itemDescription;
	}

	public String getItemMake() {
		return itemMake;
	}

	public void setItemMake(String itemMake) {
		this.itemMake = itemMake;
	}

	public String getItemCategory() {
		return itemCategory;
	}

	public void setItemCategory(String itemCategory) {
		this.itemCategory = itemCategory;
	}

	public int getItemValuation() {
		return itemValuation;
	}

	public void setItemValuation(int itemValuation) {
		this.itemValuation = itemValuation;
	}
}
