//package com.wellsfargo.training.team6.quickloan.service;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.wellsfargo.training.team6.quickloan.model.DummyEmployeeCard;
//import com.wellsfargo.training.team6.quickloan.repository.DummyEmployeeCardRepository;
//
//@Service
//public class DummyEmployeeCardService {
//
//	@Autowired
//	private DummyEmployeeCardRepository dummyRepo;
//	
//	public List<Long> getLoanIdOfEmployee(Long employeeId) {
//		return dummyRepo.findLoanIdsByUserId(employeeId);
//	}
//	
//	public DummyEmployeeCard saveCard(DummyEmployeeCard dCard) {
//		return dummyRepo.save(dCard);
//	}
//}
