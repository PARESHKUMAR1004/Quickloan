package com.wellsfargo.training.team6.quickloan.model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="employees")
public class Employee {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long employeeid;
	
	@Column(nullable=false)
	private String employeename;
	
	@Column(nullable=false)
	private String designation;
	
	@Column(nullable=false)
	private String department;
	
	@Column(unique=true,nullable=false)
	private String phoneno;
	
	
	@Column(unique=true,nullable=false)
	private String email;
	
	@Column(nullable=false)
	private char gender;
	
	@Column(nullable=false)
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date date_of_birth;
	
	@Column(nullable=false)
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date date_of_joining;
	
	
	private String password;
	


	public Employee(Long employeeid, String employeename, String designation, String department, String phoneno,
			String email, char gender, Date date_of_birth, Date date_of_joining, String password) {
		super();
		this.employeeid = employeeid;
		this.employeename = employeename;
		this.designation = designation;
		this.department = department;
		this.phoneno = phoneno;
		this.email = email;
		this.gender = gender;
		this.date_of_birth = date_of_birth;
		this.date_of_joining = date_of_joining;
		this.password = password;
	}






	public String getPassword() {
		return password;
	}






	public void setPassword(String password) {
		this.password = password;
	}






	public Long getEmployeeid() {
		return employeeid;
	}






	public void setEmployeeid(Long employeeid) {
		this.employeeid = employeeid;
	}






	public String getEmployeename() {
		return employeename;
	}






	public void setEmployeename(String employeename) {
		this.employeename = employeename;
	}






	public String getDesignation() {
		return designation;
	}






	public void setDesignation(String designation) {
		this.designation = designation;
	}






	public String getDepartment() {
		return department;
	}






	public void setDepartment(String department) {
		this.department = department;
	}






	public String getPhoneno() {
		return phoneno;
	}






	public void setPhoneno(String phoneno) {
		this.phoneno = phoneno;
	}






	public String getEmail() {
		return email;
	}






	public void setEmail(String email) {
		this.email = email;
	}






	public char getGender() {
		return gender;
	}






	public void setGender(char gender) {
		this.gender = gender;
	}






	public Date getDate_of_birth() {
		return date_of_birth;
	}






	public void setDate_of_birth(Date date_of_birth) {
		this.date_of_birth = date_of_birth;
	}






	public Date getDate_of_joining() {
		return date_of_joining;
	}






	public void setDate_of_joining(Date date_of_joining) {
		this.date_of_joining = date_of_joining;
	}






	public Employee() {
		// TODO Auto-generated constructor stub
	}
	
	

}
