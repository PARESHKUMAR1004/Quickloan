package com.wellsfargo.training.team6.quickloan.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ControllerAdvisor extends ResponseEntityExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<Map<String, Object>> handleResourceNotFoundException(
			ResourceNotFoundException resException) {
		
		Map<String, Object> resp = new HashMap<>();
		resp.put("timestamp", LocalDateTime.now());
		resp.put("status", HttpStatus.NOT_FOUND);
		resp.put("message", resException.getMessage());
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resp);
	}

	@ExceptionHandler(TransactionalException.class)
	public ResponseEntity<Map<String, Object>> handleTransactionalException(
			TransactionalException transException) {
	
		Map<String, Object> resp = new HashMap<>();
		resp.put("timestamp", LocalDateTime.now());
		resp.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
		resp.put("message", transException.getMessage());
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resp);
	}
}
