package com.wellsfargo.training.team6.quickloan.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.team6.quickloan.exception.ResourceNotFoundException;
import com.wellsfargo.training.team6.quickloan.model.Employee;
import com.wellsfargo.training.team6.quickloan.service.EmployeeService;


@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api")
public class EmployeeController {
	
	@Autowired
	public EmployeeService empService;
	
	@PostMapping("/registerEmployee")
	public ResponseEntity<String> createUser(@Validated @RequestBody Employee E)
	{
		Employee registeredEmployee=empService.registerEmployee(E);
		 if (registeredEmployee!= null) {
	            return ResponseEntity.ok("Registration successful");
	        } else {
	            return ResponseEntity.badRequest().body("Registration failed");
	        }
	}
	
	@PostMapping("/loginEmployee")
	public Employee loginEmployee(@Validated @RequestBody Employee e) throws ResourceNotFoundException
	{
		String email=e.getEmail();
		String password=e.getPassword();
		
		Employee foundEmployee = empService.findEmployeeByMail(email).orElseThrow(() ->
		new ResourceNotFoundException("Employee not found for this id :: "));
		
		if(email.equals(foundEmployee.getEmail()) && password.equals(foundEmployee.getPassword()))
		{
			return foundEmployee;
		}
		
		return null;
	}
	
	@GetMapping("/getEmployeeById/{id}")
	public ResponseEntity<Employee> getEmployeeDetailById(@PathVariable(value="id") Long edId)
		throws ResourceNotFoundException{
			
		Employee ed = empService.findEmployeeById(edId).orElseThrow(() -> new ResourceNotFoundException("Employee details Not found for this id:"+edId));
		return ResponseEntity.ok().body(ed);
	}
	
	@PutMapping("/updateEmployee/{id}")
	public ResponseEntity<Employee> updateEmployeeDetails(@PathVariable(value="id") Long edId, @Validated @RequestBody Employee ed)
		throws ResourceNotFoundException{
		
		Employee employeeDetail = empService.findEmployeeById(edId).
				orElseThrow(() -> new ResourceNotFoundException("Employee details Not found for this id:"+ edId));
		employeeDetail.setDesignation(ed.getDesignation());
		employeeDetail.setDepartment(ed.getDepartment());
		employeeDetail.setDateOfJoining(ed.getDateOfJoining());
		employeeDetail.setEmail(ed.getEmail());
		employeeDetail.setPhoneNo(ed.getPhoneNo());
		
		final Employee updatedEmployee= empService.saveEmployee(employeeDetail);
		return ResponseEntity.ok().body(updatedEmployee);
	}
	
	@DeleteMapping("/deleteEmployee/{id}")
	public Map<Boolean, String> deleteEmployeeDetails(@PathVariable(value="id") Long edId) 
		throws ResourceNotFoundException {
				
		Employee emp = empService.findEmployeeById(edId).orElseThrow(
				() -> new ResourceNotFoundException("Employee Details Not found for this id:"+edId));
		
		return empService.deleteEmployee(emp);
	}
	
	@GetMapping("/employees")
	public List<Employee> findAllEmployee() {
		return empService.listAll();
	}
}
