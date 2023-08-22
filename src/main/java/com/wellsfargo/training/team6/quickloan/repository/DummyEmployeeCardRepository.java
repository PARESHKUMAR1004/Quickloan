//package com.wellsfargo.training.team6.quickloan.repository;
//
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import com.wellsfargo.training.team6.quickloan.model.DummyEmployeeCard;
//
//@Repository
//public interface DummyEmployeeCardRepository extends JpaRepository<DummyEmployeeCard, Long> {
//	
//	@Query("SELECT ul.loan_id FROM DummyEmployeeCard ul WHERE ul.employeeid = :employeeid")
//    List<Long> findLoanIdsByUserId(Long employeeid);
//
//}
