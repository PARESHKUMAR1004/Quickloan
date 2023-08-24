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
	
	//ERROR
	@GetMapping("/getItems")
	public List<Item> getAllProducts() {
		return itemService.getAll();   // Invokes service Method user defined listAll()
	}
	
	@GetMapping("/items/{id}")
	public ResponseEntity<Item> getItemById(@PathVariable(value="id") Long iId) 
			throws ResourceNotFoundException {
		
		Item i = itemService.getItemById(iId).orElseThrow(
				()-> new ResourceNotFoundException("Item not found for this id::"+ iId));
		return ResponseEntity.ok().body(i);
	}

	@PutMapping("/items/{id}")
	public ResponseEntity<Item> updateItem(@PathVariable(value="id") Long iId,
			@Validated @RequestBody Item i) throws ResourceNotFoundException{
		
		Item item = itemService.getItemById(iId).orElseThrow(
				()-> new ResourceNotFoundException("Item not found for this id::"+ iId));
		
		item.setItemDescription(i.getItemDescription());
		item.setItemMake(i.getItemMake());
		item.setIssueStatus(i.getIssueStatus());
		item.setItemCategory(i.getItemCategory());
		item.setItemValuation(i.getItemValuation());
		
		final Item updatedItem = itemService.saveItem(item);	
		return ResponseEntity.ok().body(updatedItem);	
	}
	
	@DeleteMapping("/deleteItem/{id}")
	public Map<Boolean, String> deleteItem(@PathVariable(value="id") Long id) throws ResourceNotFoundException {
		
		Item it = itemService.getItemById(id).orElseThrow(
				() -> new ResourceNotFoundException("No item found with id: " + id));
		
		return itemService.deleteItem(it);
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
