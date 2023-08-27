package com.wellsfargo.training.team6.quickloan.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.wellsfargo.training.team6.quickloan.service.AdminService;

@SpringBootTest
@AutoConfigureMockMvc
public class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AdminService adminService;

    @Test
    public void testLoginAdminSuccess() throws Exception {
        // Mock the AdminService response
        when(adminService.validateAdmin("admin@wellsfargo.com", "admin123")).thenReturn(true);

        // Perform the GET request and validate the response
        mockMvc.perform(get("/api/loginAdmin/{email}/{password}", "admin@wellsfargo.com", "admin123"))
            .andExpect(status().isOk())
            .andExpect(content().string("true"));

        // Verify that the adminService method was called
        verify(adminService, times(1)).validateAdmin("admin@wellsfargo.com", "admin123");
    }

    @Test
    public void testLoginAdminFailure() throws Exception {
        // Mock the AdminService response
        when(adminService.validateAdmin("admin@example.com", "invalidpassword")).thenReturn(false);

        // Perform the GET request and validate the response
        mockMvc.perform(get("/api/loginAdmin/{email}/{password}", "admin@example.com", "invalidpassword"))
            .andExpect(status().isOk())
            .andExpect(content().string("false"));

        // Verify that the adminService method was called
        verify(adminService, times(1)).validateAdmin("admin@example.com", "invalidpassword");
    }
}
