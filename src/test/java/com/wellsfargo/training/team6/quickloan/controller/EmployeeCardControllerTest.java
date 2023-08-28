package com.wellsfargo.training.team6.quickloan.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellsfargo.training.team6.quickloan.exception.ResourceNotFoundException;
import com.wellsfargo.training.team6.quickloan.exception.TransactionalException;
import com.wellsfargo.training.team6.quickloan.model.Employee;
import com.wellsfargo.training.team6.quickloan.model.EmployeeCard;
import com.wellsfargo.training.team6.quickloan.model.LoanCard;
import com.wellsfargo.training.team6.quickloan.model.LoanIssueSummary;
import com.wellsfargo.training.team6.quickloan.service.EmployeeCardService;
import com.wellsfargo.training.team6.quickloan.service.EmployeeService;
import com.wellsfargo.training.team6.quickloan.service.LoanApprovalService;

//@WebMvcTest(EmployeeCardController.class)
@SpringBootTest
@AutoConfigureMockMvc
public class EmployeeCardControllerTest {

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private EmployeeCardService empService;
	
	@MockBean
	private LoanApprovalService lService;
	
	private List<EmployeeCard> eList;
	
	@BeforeEach
	void setUp() throws Exception {
		LoanCard lCard = new LoanCard(1L, "furniture", 20, true); 
		EmployeeCard eCard = new EmployeeCard(1L, lCard, null, null, LocalDate.now(), "Pending");
		
		eList = new ArrayList<>();
		eList.add(eCard);
	}
	
	@AfterEach
	void tearDown() throws Exception {
		eList = null;
	}
	
	@Test
	public void testPendingStatusSuccess() throws Exception {
		
		when(empService.getStatusPendingCards()).thenReturn(eList);
		
		mockMvc.perform(MockMvcRequestBuilders.get("/api/getStatusPendingCards"))
		.andExpect(MockMvcResultMatchers.jsonPath("$").value(Matchers.hasSize(1)))
		.andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(1L))
		.andExpect(MockMvcResultMatchers.jsonPath("$[0].loanCard.loanId").value(1L));
	}
	
	@Test
	public void testGetEmployeeCardByIdSuccess() throws Exception {
		
		when(empService.getCardByEmpId(1L)).thenReturn(eList);
		
		mockMvc.perform(MockMvcRequestBuilders.get("/api/getEmpCardsByEmpId/{id}", 1L))
		.andDo(print())
		.andExpect(MockMvcResultMatchers.jsonPath("$").value(Matchers.hasSize(1)))
		.andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(1L))
		.andExpect(MockMvcResultMatchers.jsonPath("$[0].loanCard.loanId").value(1L));
	}
	
	@Test
	public void testSaveEmpCardSuccess() throws Exception {
		
		when(empService.saveEmployeeCard(any(Long.class), 
				any(Long.class), any(Long.class))).thenReturn(eList.get(0));
	
		mockMvc.perform(MockMvcRequestBuilders.post("/api/saveEmpCard/{empId}/{loanId}/{itemId}",
				1L, 1L, 1L))
		.andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1L))
		.andExpect(MockMvcResultMatchers.jsonPath("$.loanCard.loanId").value(1L));
	}
	
	@Test
	public void testSaveEmpCardFailure() throws Exception {
		Long id = 1L;
    	String errMsg = "Resource not found exception when saving employee card";
    	
    	when(empService.saveEmployeeCard(any(Long.class), 
				any(Long.class), any(Long.class))).thenThrow(
    			new ResourceNotFoundException(errMsg));
    	
    	mockMvc.perform(MockMvcRequestBuilders.post("/api/saveEmpCard/{empId}/{loanId}/{itemId}",
				1L, 1L, 1L))
    	.andExpect(MockMvcResultMatchers.status().isNotFound())
    	.andExpect(MockMvcResultMatchers.jsonPath("$.message").value(errMsg));
	}
	
	@Test
	public void testRejectLoanSuccess() throws Exception {
		
		when(empService.rejectEmployeeCard(any(Long.class))).thenReturn("Success");
		
		mockMvc.perform(MockMvcRequestBuilders.post("/api/rejectLoan/{id}", 1L))
		.andExpect(MockMvcResultMatchers.content().string("Success"));
	}
	
	@Test
	public void testRejectLoanResNotFoundException() throws Exception {
		Long id = 1L;
    	String errMsg = "Resource not found exception when rejecting loan";
    	
    	when(empService.rejectEmployeeCard(any(Long.class))).thenThrow(
    			new ResourceNotFoundException(errMsg));
    	
    	mockMvc.perform(MockMvcRequestBuilders.post("/api/rejectLoan/{id}", id))
    	.andExpect(MockMvcResultMatchers.status().isNotFound())
    	.andExpect(MockMvcResultMatchers.jsonPath("$.message").value(errMsg));
	}
	
	@Test
	public void testApproveLoanTransException() throws Exception {
		Long id = 1L;
    	String errMsg = "Transactional exception when approving loan";
    	
    	when(lService.approveLoan(any(Long.class))).thenThrow(
    			new TransactionalException(errMsg));
    	
    	mockMvc.perform(MockMvcRequestBuilders.post("/api/approveLoan/{id}", id))
    	.andExpect(MockMvcResultMatchers.status().isInternalServerError())
    	.andExpect(MockMvcResultMatchers.jsonPath("$.message").value(errMsg));
	}
	
	@Test
	public void testApproveLoanResNotFoundException() throws Exception {
		Long id = 1L;
    	String errMsg = "Resource not found exception when approving loan";
    	
    	when(lService.approveLoan(any(Long.class))).thenThrow(
    			new ResourceNotFoundException(errMsg));
    	
    	mockMvc.perform(MockMvcRequestBuilders.post("/api/approveLoan/{id}", id))
    	.andExpect(MockMvcResultMatchers.status().isNotFound())
    	.andExpect(MockMvcResultMatchers.jsonPath("$.message").value(errMsg));
	}
	
	@Test
	public void testApproveLoanSuccess() throws Exception {
		
		when(lService.approveLoan(any(Long.class))).thenReturn(eList.get(0));
		
		mockMvc.perform(MockMvcRequestBuilders.post("/api/approveLoan/{id}", 1L))
		.andDo(print())
		.andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1L))
		.andExpect(MockMvcResultMatchers.jsonPath("$.loanCard.loanId").value(1L));
	}
	
	@Test
	public void testGetLoanIssueSummary() throws Exception {
		
		LoanIssueSummary lSummary = new LoanIssueSummary(1L, "furniture", 20, 
				LocalDate.now(), "Pending");
		
		when(empService.getLoanIssueSummaryByEmpId(any(Long.class))).thenReturn(
				Collections.singletonList(lSummary));
		
		mockMvc.perform(MockMvcRequestBuilders.get("/api/getLoanIssueSummary/{id}", 1L))
		.andExpect(MockMvcResultMatchers.jsonPath("$").value(Matchers.hasSize(1)))
		.andExpect(MockMvcResultMatchers.jsonPath("$[0].loanId").value(1L))
		.andExpect(MockMvcResultMatchers.jsonPath("$[0].status").value("Pending"));
	}
	
	
}
