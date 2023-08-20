package com.wellsfargo.training.team6.quickloan.model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="issue_details")
@NoArgsConstructor
@Getter
@Setter
public class IssueDetail {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long issue_id;
	
	@Column(nullable=false)
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date issue_date;
	
	
	@ManyToOne
	@JoinColumn(name="employeeid",nullable=false)
	private Employee Employee;
	
	@OneToOne
	@JoinColumn(name="item_id",nullable=false)
	private Item item;
	

}
