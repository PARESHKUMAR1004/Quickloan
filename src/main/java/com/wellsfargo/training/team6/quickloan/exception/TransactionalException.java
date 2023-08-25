package com.wellsfargo.training.team6.quickloan.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.INTERNAL_SERVER_ERROR)
public class TransactionalException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public TransactionalException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

}
