package com.wellsfargo.training.team6.quickloan.model;

import java.io.Serializable;
import java.util.Objects;

public class EmployeeCardCompositeId implements Serializable {
	
	private long employeeid;
	private long loan_id;
	@Override
	public int hashCode() {
		return Objects.hash(employeeid, loan_id);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EmployeeCardCompositeId other = (EmployeeCardCompositeId) obj;
		return employeeid == other.employeeid && loan_id == other.loan_id;
	}
	public EmployeeCardCompositeId(long employeeid, long loan_id) {
		super();
		this.employeeid = employeeid;
		this.loan_id = loan_id;
	}
	public long getEmployeeid() {
		return employeeid;
	}
	public void setEmployeeid(long employeeid) {
		this.employeeid = employeeid;
	}
	public long getLoan_id() {
		return loan_id;
	}
	public void setLoan_id(long loan_id) {
		this.loan_id = loan_id;
	}
	

}
