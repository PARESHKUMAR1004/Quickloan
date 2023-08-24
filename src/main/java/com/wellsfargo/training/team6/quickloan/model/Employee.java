package com.wellsfargo.training.team6.quickloan.model;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.Base64;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name="employees")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Employee {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long employeeId;
	
	@Column(nullable=false)
	private String fname;
	
	@Column(nullable=false)
	private String lname;
	
	@Column(nullable=false)
	private String designation;
	
	@Column(nullable=false)
	private String department;
	
	@Column(unique=true,nullable=false)
	private String phoneNo;
	
	@Column(unique=true,nullable=false)
	private String email;
	
	@Column(nullable=false)
	private char gender;
	
	@Column(name="date_of_birth", nullable=false)
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date dateOfBirth;
	
	@Column(nullable=false)
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date dateOfJoining;
	
//	@OneToMany(mappedBy="employee", cascade = CascadeType.ALL)
//	private List<IssueDetail> issues;
	
//	@OneToMany(mappedBy="employee")
//	private Set<EmployeeCard> employeeCard;
	
	private String password;
	
	public void setPassword(String password) {
		Base64.Encoder encoder = Base64.getEncoder();  
        String normalString = password;
        String encodedString = encoder.encodeToString(   // encrypt password in database field
        normalString.getBytes(StandardCharsets.UTF_8) );
        this.password = encodedString;
	}
}
