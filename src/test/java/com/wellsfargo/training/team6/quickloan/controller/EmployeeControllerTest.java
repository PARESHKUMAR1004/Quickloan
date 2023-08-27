package com.wellsfargo.training.team6.quickloan.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellsfargo.training.team6.quickloan.exception.ResourceNotFoundException;
import com.wellsfargo.training.team6.quickloan.model.Employee;
import com.wellsfargo.training.team6.quickloan.service.EmployeeService;

@WebMvcTest(EmployeeController.class)
public class EmployeeControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private EmployeeService empService;
	
	private Employee emp;
	private String empJson;
	
	@BeforeEach
	public void setUp() throws Exception{
		Date dt = new Date(System.currentTimeMillis()); 
		emp = new Employee(1L, "John", "Doe", "Engineer", "Security", "9949900099",
				"johnDoe@wellsfargo.com", 'M', dt, dt, "dummy");
		
		ObjectMapper objMapper = new ObjectMapper();
		empJson = objMapper.writeValueAsString(emp);
	}
	
	@AfterEach
	public void tearDown() throws Exception {
		emp = null;
		empJson = null;
	}
	
	@Test
	public void testRegisterSuccess() throws Exception {
		
		when(empService.registerEmployee(any(Employee.class))).thenReturn(emp);
		
		mockMvc.perform(MockMvcRequestBuilders.post("/api/registerEmployee")
				.contentType(MediaType.APPLICATION_JSON).content(empJson))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().string("Registration successful"));
	}

	@Test
	public void testRegisterFailure() throws Exception {
		
		when(empService.registerEmployee(any(Employee.class))).thenReturn(null);
		
		mockMvc.perform(MockMvcRequestBuilders.post("/api/registerEmployee")
				.contentType(MediaType.APPLICATION_JSON).content(empJson))
		.andExpect(MockMvcResultMatchers.status().isBadRequest())
		.andExpect(MockMvcResultMatchers.content().string("Registration failed"));
	}
	
	@Test
	public void testLoginSuccess() throws Exception {
		
		emp.setPassword("dummy");
		when(empService.findEmployeeByMail(any(String.class))).thenReturn(Optional.of(emp));
	
		System.out.println(emp);
		mockMvc.perform(MockMvcRequestBuilders.post("/api/loginEmployee")
				.contentType(MediaType.APPLICATION_JSON).content(empJson))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.jsonPath("$.employeeId").value(1L))
		.andDo(print());
	}
	
	@Test
	public void testLoginFailure() throws Exception {
		
		when(empService.findEmployeeByMail(any(String.class))).thenReturn(Optional.empty());
	
		System.out.println(emp);
		mockMvc.perform(MockMvcRequestBuilders.post("/api/loginEmployee")
				.contentType(MediaType.APPLICATION_JSON).content(empJson))
		.andExpect(MockMvcResultMatchers.status().isNotFound())
		.andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Employee not found for this id :: "))
		.andDo(print());
	}
}
