package com.wellsfargo.training.team6.quickloan.model;



import jakarta.persistence.CascadeType;
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
	private Long item_id;
	
	
	@Column(nullable=false)
	private String item_description;
	
	
	@Column(nullable=false)
	private String item_make;
	
	
	@Column(nullable=false)
	private char item_status;
	
	@Column(nullable=false)
	private String item_category;
	
	
	@Column(nullable=false)
	private int item_valuation;
	
	@OneToOne(mappedBy="item")
	private IssueDetail issue;
	
}
