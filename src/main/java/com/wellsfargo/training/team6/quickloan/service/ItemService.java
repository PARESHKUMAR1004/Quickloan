package com.wellsfargo.training.team6.quickloan.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.team6.quickloan.model.IssueDetail;
import com.wellsfargo.training.team6.quickloan.model.Item;
import com.wellsfargo.training.team6.quickloan.repository.ItemRepository;

@Service
public class ItemService {

	@Autowired
	private ItemRepository iRepo;
	
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
	
	public Optional<Item> getItemById(Long id) {
		return iRepo.findById(id);
	}
	
	public Item saveItem(Item item) {
		return iRepo.save(item);
	}
}
