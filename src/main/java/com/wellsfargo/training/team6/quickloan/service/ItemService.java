package com.wellsfargo.training.team6.quickloan.service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.team6.quickloan.exception.TransactionalException;
import com.wellsfargo.training.team6.quickloan.model.Item;
import com.wellsfargo.training.team6.quickloan.repository.EmployeeCardRepository;
import com.wellsfargo.training.team6.quickloan.repository.ItemRepository;

import jakarta.transaction.Transactional;

@Service
public class ItemService {

	@Autowired
	private ItemRepository iRepo;
	
	@Autowired
	private EmployeeCardRepository empCardRepo;
	
	public List<Item> getAll() {
		return iRepo.findAll();
	}
	
	public Optional<Item> getItemById(Long id) {
		return iRepo.findById(id);
	}
	
	public Item saveItem(Item item) {
		return iRepo.save(item);
	}
	
	public Item updateItemStatus(Item item, char status) {
		item.setIssueStatus(status);
		return iRepo.save(item);
	}
	
	public List<String> getUniqueItemCategory() {
		return iRepo.getUniqueItemCategory();
	}
	
	public List<String> getItemMakeByCategory(String category) {
		return iRepo.getItemMakeByCategory(category);
	}
	
	public List<String> getItemDescByMakeCategory(String category, String make) {
		return iRepo.getItemDescByCategoryMake(category, make);
	}
	
	public List<Integer> getItemValuesByFilters(String cat, String make, String desc) {
		return iRepo.getItemValuesByFilters(cat, make, desc);
	}
	
	public Item issueItem(String cat, String make, String desc, int val) {
		List<Long> listIds = iRepo.getIdsByFilters(cat, make, desc, val);
		Item item = iRepo.findById(listIds.get(0)).get();
		item.setIssueStatus('Y');
		return iRepo.save(item);
	}
	
	@Transactional
	public Map<Boolean, String> deleteItem(Item item) 
			throws TransactionalException  {
		try {
			if(item.getIssueStatus() == 'Y') {
				return Collections.singletonMap(false, ("Can't delete item: " + item.getItemId() + 
						". The item is issued by an employee."));
			}
			
			empCardRepo.updatePendingStatusToRejectedByItem(item);
			iRepo.delete(item);
			
			return Collections.singletonMap(true, 
					"Item successfully deleted. Unapproved loans on this item are also rejected.");
		} catch (Exception e){
			throw new TransactionalException(
					"Transactional error in deleting the item");
		}
	}
}
