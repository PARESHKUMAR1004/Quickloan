package com.wellsfargo.training.team6.quickloan.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AdminServiceTest {

	@Autowired
    private AdminService adminService;

    @Test
    public void testValidateAdminSuccess() {
        boolean result = adminService.validateAdmin("admin@wellsfargo.com", "admin123");
        assertTrue(result);
    }

    @Test
    public void testValidateAdminFailure() {
        boolean result = adminService.validateAdmin("admin@wellsfargo.com", "wrongpassword");
        assertFalse(result);
    }
}

