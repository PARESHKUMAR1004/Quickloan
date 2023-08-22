package com.wellsfargo.training.team6.quickloan.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Entity
@Table(name="items")
@NoArgsConstructor
@Getter
@Setter
public class Item {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long itemId;
	
	@Column(name="item_description", nullable=false)
	private String itemDescription;
	
	@Column(name="item_make", nullable=false)
	//item_category
	private String itemMake;
	
	
	@Column(name="issue_status", nullable=false)
	private char issueStatus;
	
	@Column(name="item_category", nullable=false)
	private String itemCategory;
	
	
	@Column(name="item_valuation", nullable=false)
	private int itemValuation;
	
	@OneToOne(mappedBy="item")
	private IssueDetail issue;
	
}
