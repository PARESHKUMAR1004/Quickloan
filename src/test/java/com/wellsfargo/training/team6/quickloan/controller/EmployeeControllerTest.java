package com.wellsfargo.training.team6.quickloan.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

import org.hamcrest.Matchers;
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
import com.wellsfargo.training.team6.quickloan.exception.TransactionalException;
import com.wellsfargo.training.team6.quickloan.model.Employee;
import com.wellsfargo.training.team6.quickloan.model.LoanCard;
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
	
		mockMvc.perform(MockMvcRequestBuilders.post("/api/loginEmployee")
				.contentType(MediaType.APPLICATION_JSON).content(empJson))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.jsonPath("$.employeeId").value(1L));
	}
	
	@Test
	public void testLoginFailure() throws Exception {
		
		when(empService.findEmployeeByMail(any(String.class))).thenReturn(Optional.empty());
	
		mockMvc.perform(MockMvcRequestBuilders.post("/api/loginEmployee")
				.contentType(MediaType.APPLICATION_JSON).content(empJson))
		.andExpect(MockMvcResultMatchers.status().isNotFound())
		.andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Employee not found for this id :: "));
	}
	
	@Test
	public void testGetAll() throws Exception {
		
		when(empService.listAll()).thenReturn(
				Collections.singletonList(emp));
		
		mockMvc.perform(MockMvcRequestBuilders.get("/api/employees"))
		.andExpect(MockMvcResultMatchers.jsonPath("$").value(Matchers.hasSize(1)))
		.andExpect(MockMvcResultMatchers.jsonPath("$[0].employeeId").value(1L));
	}
	
	@Test
	public void testGetEmpByIdSuccess() throws Exception {
		
		when(empService.findEmployeeById(any(Long.class))).thenReturn(Optional.of(emp));
		
		mockMvc.perform(MockMvcRequestBuilders.get("/api/getEmployeeById/{id}", 1L))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.employeeId").value(1L))
        .andExpect(MockMvcResultMatchers.jsonPath("$.fname").value("John"));
	}

	@Test
	public void testGetEmpByIdNotFound() throws Exception {
		Long id = 3L;
		
		when(empService.findEmployeeById(3L)).thenReturn(Optional.empty());
		
		mockMvc.perform(MockMvcRequestBuilders.get("/api/getEmployeeById/{id}", id))
		        .andExpect(MockMvcResultMatchers.status().isNotFound())
		        .andExpect(MockMvcResultMatchers.jsonPath("$.message").value(
		        		"Employee details Not found for this id:" + id));
	}
	
	@Test
	public void testUpdateEmpSuccess() throws Exception {
		Long id = 1L;
    	when(empService.findEmployeeById(any(Long.class))).thenReturn(Optional.of(emp));
    	
    	emp.setDesignation("Service");
    	String jsonNew = new ObjectMapper().writeValueAsString(emp);
    	when(empService.saveEmployee(any(Employee.class))).thenReturn(emp);
    	
    	mockMvc.perform(MockMvcRequestBuilders.put("/api/updateEmployee/{id}", id)
				.contentType(MediaType.APPLICATION_JSON).content(jsonNew))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.jsonPath("$.employeeId").value(1L))
		.andExpect(MockMvcResultMatchers.jsonPath("$.designation").value("Service"));
	}
	
	@Test
	public void testUpdateEmpFailure() throws Exception {
		Long id = 1L;
    	when(empService.findEmployeeById(any(Long.class))).thenReturn(Optional.empty());
    	
    	mockMvc.perform(MockMvcRequestBuilders.put("/api/updateEmployee/{id}", id)
				.contentType(MediaType.APPLICATION_JSON).content(empJson))
		.andExpect(MockMvcResultMatchers.status().isNotFound())
		.andExpect(MockMvcResultMatchers.jsonPath("$.message").value(
				"Employee details Not found for this id:" + id));
	}
	
	@Test
	public void testDeleteEmpSuccess() throws Exception {
		
		when(empService.findEmployeeById(any(Long.class))).thenReturn(Optional.of(emp));
		when(empService.deleteEmployee(any(Employee.class))).thenReturn(
				Collections.singletonMap(true, "Success"));
		
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/deleteEmployee/{id}", 1L))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.jsonPath("$.true").value("Success"));
	}
	
	@Test
	public void testDeleteEmpTransException() throws Exception {
		Long id = 1L;
    	String errMsg = "Transactional exception when deleting employee";
    	
    	when(empService.findEmployeeById(any(Long.class))).thenReturn(Optional.of(emp));
    	when(empService.deleteEmployee(any(Employee.class))).thenThrow(
    			new TransactionalException(errMsg));
    	
    	mockMvc.perform(MockMvcRequestBuilders.delete("/api/deleteEmployee/{id}", id))
    	.andExpect(MockMvcResultMatchers.status().isInternalServerError())
    	.andExpect(MockMvcResultMatchers.jsonPath("$.message").value(errMsg));
	}
	
	@Test
	public void testDeleteEmpResException() throws Exception {
		Long id = 1L;
    	
    	when(empService.findEmployeeById(any(Long.class))).thenReturn(Optional.empty());
    	
    	mockMvc.perform(MockMvcRequestBuilders.delete("/api/deleteEmployee/{id}", id))
    	.andExpect(MockMvcResultMatchers.status().isNotFound())
    	.andExpect(MockMvcResultMatchers.jsonPath("$.message").value(
    			"Employee Details Not found for this id:" + id));
	}

}
