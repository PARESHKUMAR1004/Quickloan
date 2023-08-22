//package com.wellsfargo.training.team6.quickloan.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.wellsfargo.training.team6.quickloan.model.DummyEmployeeCard;
//import com.wellsfargo.training.team6.quickloan.service.DummyEmployeeCardService;
//
//@CrossOrigin(origins="http://localhost:3000")
//@RestController
//@RequestMapping(value="/api")
//public class DummyEmployeeCardController {
//
//	@Autowired
//	private DummyEmployeeCardService dService;
//	
//	@GetMapping("/getLoans/{id}")
//	public List<Long> listLoanIds(@PathVariable(value="id") Long empId) {
//		return dService.getLoanIdOfEmployee(empId);
//	}
//	
//	@PostMapping("/saveCard")
//	public DummyEmployeeCard saveCard(@Validated @RequestBody DummyEmployeeCard dCard) {
//		return dService.saveCard(dCard);
//	}
//	
//	
//	
//}
