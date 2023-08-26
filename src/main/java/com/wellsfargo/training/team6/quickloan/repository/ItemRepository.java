package com.wellsfargo.training.team6.quickloan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.team6.quickloan.model.Item;

import org.springframework.data.jpa.repository.Query;

public interface ItemRepository extends JpaRepository<Item, Long>{

	@Query("SELECT DISTINCT i.itemCategory FROM Item i WHERE i.issueStatus = 'N'")
	public List<String> getUniqueItemCategory();
	
	@Query("SELECT DISTINCT i.itemMake FROM Item i WHERE i.issueStatus = 'N' AND i.itemCategory = ?1")
	public List<String> getItemMakeByCategory(String itemCategory);
	
	@Query("Select DISTINCT i.itemDescription FROM Item i WHERE i.issueStatus = 'N' AND i.itemCategory = ?1 AND i.itemMake = ?2")
	public List<String> getItemDescByCategoryMake(String itemCategory, String itemMake);
	
	@Query("Select DISTINCT i.itemValuation FROM Item i WHERE i.issueStatus = 'N' AND i.itemCategory = ?1 AND i.itemMake = ?2 AND i.itemDescription = ?3")
	public List<Integer> getItemValuesByFilters(String itemCategory, String itemMake, String itemDescription);

	@Query("Select i.itemId FROM Item i WHERE i.issueStatus = 'N' AND i.itemCategory = ?1 AND i.itemMake = ?2 AND i.itemDescription = ?3 AND i.itemValuation = ?4")
	public List<Long> getIdsByFilters(String itemCategory, String itemMake, String itemDescription, int itemValuation);
}
