package com.wellsfargo.training.team6.quickloan.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.wellsfargo.training.team6.quickloan.model.IssueDetail;
import com.wellsfargo.training.team6.quickloan.model.IssueItemSummary;
import com.wellsfargo.training.team6.quickloan.service.IssueDetailService;


@SpringBootTest
@AutoConfigureMockMvc
//@WebMvcTest(IssueDetailController.class)
public class IssueDetailControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private IssueDetailService iService;
	
	@Test
	public void testGetSummary() throws Exception {
		List<IssueItemSummary> l = new ArrayList<>();
		IssueItemSummary item = new IssueItemSummary(1L, "Table", "Wooden", "Furniture", 400);
		l.add(item);
		
		when(iService.getIssueItemSummary(1L)).thenReturn(l);
		
		mockMvc.perform(MockMvcRequestBuilders.get("/api/getIssueItemSummary/{id}", 1L))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.jsonPath("$").value(Matchers.hasSize(1)))
		.andExpect(MockMvcResultMatchers.jsonPath("$[0].issueId").value(1L))
		.andExpect(MockMvcResultMatchers.jsonPath("$[0].itemValuation").value(400));
	}

	@Test
	public void testGetIssues() throws Exception {
		
		Long id = 1L;
		List<IssueDetail> list = new ArrayList<>();
		IssueDetail iDetail = new IssueDetail(1L, LocalDate.now(), null, null); 
		list.add(iDetail);
		
		when(iService.getIsssuesByEmpId(any(Long.class))).thenReturn(list);
		
		mockMvc.perform(MockMvcRequestBuilders.get("/api/getIssues/{id}", id))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.jsonPath("$").value(Matchers.hasSize(1)))
		.andExpect(MockMvcResultMatchers.jsonPath("$[0].issueId").value(1L));
	}




}
