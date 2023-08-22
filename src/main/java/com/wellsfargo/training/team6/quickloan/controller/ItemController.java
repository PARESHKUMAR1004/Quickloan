package com.wellsfargo.training.team6.quickloan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.team6.quickloan.model.Item;
import com.wellsfargo.training.team6.quickloan.service.ItemService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api")
public class ItemController {

	@Autowired
	private ItemService itemService;
	
	@PostMapping("/saveItem")
	public Item saveItem(@Validated @RequestBody Item item) {
		return itemService.saveItem(item);
	}
	
	@GetMapping("/getItemCategory")
	public List<String> getItemCategory() {
		return itemService.getUniqueItemCategory();
	}
	
	@GetMapping("/getItemMake/{category}")
	public List<String> getItemMakeByCategory(@PathVariable(value="category") String cat) {
		return itemService.getItemMakeByCategory(cat);
	}
	
	@GetMapping("/getItemDesc/{category}/{make}")
	public List<String> getItemDescByCategoryMake(
			@PathVariable(value="category") String cat,
			@PathVariable(value="make") String make) {
		return itemService.getItemDescByMakeCategory(cat, make);
	}
	
	@GetMapping("/getItemValue/{category}/{make}/{description}")
	public List<Integer> getItemValByFilter(
			@PathVariable(value="category") String cat,
			@PathVariable(value="make") String make,
			@PathVariable(value="description") String desc
			) {
		return itemService.getItemValuesByFilters(cat, make, desc);
	}
}
