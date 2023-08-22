//package com.wellsfargo.training.team6.quickloan.model;
//
//import java.io.Serializable;
//import java.util.Objects;
//
//import jakarta.persistence.Embeddable;
//
//@Embeddable
//public class DummyEmployeeCardId implements Serializable {
//	private Long employeeid;
//	private Long loan_id;
//	@Override
//	public int hashCode() {
//		return Objects.hash(employeeid, loan_id);
//	}
//	
//	@Override
//	public boolean equals(Object obj) {
//		if (this == obj)
//			return true;
//		if (obj == null)
//			return false;
//		if (getClass() != obj.getClass())
//			return false;
//		DummyEmployeeCardId other = (DummyEmployeeCardId) obj;
//		return employeeid == other.employeeid && loan_id == other.loan_id;
//	}
//	
//	public DummyEmployeeCardId() {
//		
//	}
//	
//	public DummyEmployeeCardId(Long employeeid, Long loan_id) {
//		this.employeeid = employeeid;
//		this.loan_id = loan_id;
//	}
//
//	public Long getEmployeeid() {
//		return employeeid;
//	}
//
//	public void setEmployeeid(Long employeeid) {
//		this.employeeid = employeeid;
//	}
//
//	public Long getLoan_id() {
//		return loan_id;
//	}
//
//	public void setLoan_id(Long loan_id) {
//		this.loan_id = loan_id;
//	}
//}
//
//
