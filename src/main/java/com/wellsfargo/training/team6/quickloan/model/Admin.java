package com.wellsfargo.training.team6.quickloan.model;

import jakarta.persistence.*;

@Entity
@Table(name="admins")
public class Admin {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long adminid;
	
	private String password;
	
	
	
	
	
	@Column(nullable=false)
	private String fname;
	
	@Column(nullable=false)
	private String lname;

	

	


	public Long getAdminid() {
		return adminid;
	}






	public void setAdminid(Long adminid) {
		this.adminid = adminid;
	}






	public String getPassword() {
		return password;
	}






	public void setPassword(String password) {
		this.password = password;
	}






	public String getFname() {
		return fname;
	}






	public void setFname(String fname) {
		this.fname = fname;
	}






	public String getLname() {
		return lname;
	}






	public void setLname(String lname) {
		this.lname = lname;
	}






	public Admin(Long adminid, String password, String fname, String lname) {
		super();
		this.adminid = adminid;
		this.password = password;
		this.fname = fname;
		this.lname = lname;
	}






	public Admin() {
		// TODO Auto-generated constructor stub
	}
	

}
