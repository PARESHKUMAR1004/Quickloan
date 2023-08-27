package com.wellsfargo.training.team6.quickloan.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.wellsfargo.training.team6.quickloan.exception.TransactionalException;
import com.wellsfargo.training.team6.quickloan.model.LoanCard;
import com.wellsfargo.training.team6.quickloan.service.LoanCardService;


@WebMvcTest(LoanCardController.class)
public class LoanCardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LoanCardService loanCardService;

//    @InjectMocks
//    private LoanCardController loanCardController;

    private List<LoanCard> loanCardList;

    @BeforeEach
    public void setup() {
        loanCardList = new ArrayList<>();
        loanCardList.add(new LoanCard(1L, "Electronics", 120, true));
        loanCardList.add(new LoanCard(2L, "Furniture", 60, true));
    }

    @Test
    public void testGetCard() throws Exception {
        when(loanCardService.getAllLoanCards()).thenReturn(loanCardList);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/getAllLoans"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].loanType").value("Electronics"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].loanType").value("Furniture"));
    }

    @Test
    public void testGetLoanCardByType() throws Exception {
        String loanType = "Electronics";
        when(loanCardService.getLoanCardsByType(loanType)).thenReturn(loanCardList.subList(0, 1));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/getLoans/{type}", loanType))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].loanType").value("Electronics"));
    }

    @Test
    public void testGetLoanCardByTypeNotFound() throws Exception {
        String loanType = "Automobile";
        when(loanCardService.getLoanCardsByType(loanType)).thenReturn(new ArrayList<>());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/getLoans/{type}", loanType))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("No loans with type: " + loanType));
    }
    
    @Test
    public void testGetLoanCardById() throws Exception {
        Long loanId = 1L;
        when(loanCardService.getLoanCardById(loanId)).thenReturn(Optional.of(loanCardList.get(0)));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/getLoan/{id}", loanId))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.loanId").value(1L))
                .andExpect(MockMvcResultMatchers.jsonPath("$.loanType").value("Electronics"));
    }

    @Test
    public void testGetLoanCardByIdNotFound() throws Exception {
        Long id = 3L;
        when(loanCardService.getLoanCardById(3L)).thenReturn(Optional.empty());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/getLoan/{id}", id))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("No loan with id: " + id));
    }
    
//            mockMvc.perform(MockMvcRequestBuilders.put("/api/loancards/{id}", loanCardId)

    @Test
    public void testUpdateLoanCard() throws Exception {
    	Long id = 1L;
    	when(loanCardService.getLoanCardById(id)).thenReturn(Optional.of(loanCardList.get(0)));
    	
    	LoanCard nLoan = loanCardList.get(0);
    	nLoan.setLoanDuration(150);
    	
    	when(loanCardService.saveLoanCard(any(LoanCard.class))).thenReturn(nLoan);
    	
    	mockMvc.perform(MockMvcRequestBuilders.put("/api/loancards/{id}", id)
    			.contentType(MediaType.APPLICATION_JSON).content("{\"loanDuration\": 150}"))
    	.andExpect(MockMvcResultMatchers.status().isOk())
    	.andExpect(MockMvcResultMatchers.jsonPath("$.loanId").value(1L))
    	.andExpect(MockMvcResultMatchers.jsonPath("$.loanDuration").value(150));
    }
    
    @Test
    public void testDeleteLoanCardSuccess() throws Exception {
    	Long id = 1L;
    	
    	when(loanCardService.getLoanCardById(id)).thenReturn(
    			Optional.of(loanCardList.get(0)));
    	when(loanCardService.deleteLoanCard(any(LoanCard.class))).thenReturn(
    			Collections.singletonMap(true, "Success"));
    
    	mockMvc.perform(MockMvcRequestBuilders.delete("/api/deleteLoan/{id}", id))
    	.andExpect(MockMvcResultMatchers.status().isOk())
    	.andExpect(MockMvcResultMatchers.jsonPath("$.true").value("Success"));
    }
    
    @Test
    public void testDeleteLoanCardServerError() throws Exception {
    	Long id = 1L;
    	String errMsg = "Transactional exception when deleting loan card";
    	
    	when(loanCardService.getLoanCardById(id)).thenReturn(
    			Optional.of(loanCardList.get(0)));
    	when(loanCardService.deleteLoanCard(any(LoanCard.class))).thenThrow(
    			new TransactionalException(errMsg));
    	
    	mockMvc.perform(MockMvcRequestBuilders.delete("/api/deleteLoan/{id}", id))
    	.andDo(print())
    	.andExpect(MockMvcResultMatchers.status().isInternalServerError())
    	.andExpect(MockMvcResultMatchers.jsonPath("$.message").value(errMsg));
    }

}

