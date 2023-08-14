package com.wellsfargo.training.team6.quickloan.model;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import jakarta.persistence.*;

@Entity
@Table(name="admins")
public class Admin {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long adminid;
	
	private String password;
	
	@Column(nullable=false)
	private String email;
	
	
	
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
//		this.password = password;
		
		Base64.Encoder encoder = Base64.getEncoder();  
        String normalString = password;
        String encodedString = encoder.encodeToString(   // encrypt password in database field
        normalString.getBytes(StandardCharsets.UTF_8) );
        this.password = encodedString;
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






	





	public String getEmail() {
		return email;
	}






	public void setEmail(String email) {
		this.email = email;
	}






	public Admin(Long adminid, String password, String email, String fname, String lname) {
		super();
		this.adminid = adminid;
		this.password = password;
		this.email = email;
		this.fname = fname;
		this.lname = lname;
	}






	public Admin() {
		// TODO Auto-generated constructor stub
	}
	

}
