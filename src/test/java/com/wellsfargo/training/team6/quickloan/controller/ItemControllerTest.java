package com.wellsfargo.training.team6.quickloan.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;



import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellsfargo.training.team6.quickloan.model.Employee;
import com.wellsfargo.training.team6.quickloan.model.Item;
import com.wellsfargo.training.team6.quickloan.model.LoanCard;
import com.wellsfargo.training.team6.quickloan.service.EmployeeCardService;
import com.wellsfargo.training.team6.quickloan.service.ItemService;


@WebMvcTest(ItemController.class)
class ItemControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private ItemService itemService;
    
    
    
    private Item item;
    private String itemJson;
    private List<Item>itemList;

    @BeforeAll
    static void setUpBeforeClass() throws Exception {
        
        
    }

    @AfterAll
    static void tearDownAfterClass() throws Exception {
    }

    @BeforeEach
    void setUp() throws Exception {
        itemList=new ArrayList<>();
        
        item = new Item(1L, "TABLE", "WOODEN", 'N', "FURNITURE",1200);
        itemList.add(item);
        
        Item nItem=new Item(2L, "SPOON", "GLASS", 'N', "STATIONARY",1200);
        itemList.add(nItem);
            
        
        ObjectMapper objMapper = new ObjectMapper();
        itemJson = objMapper.writeValueAsString(item);
    }

    @AfterEach
    void tearDown() throws Exception {
        item=null;
        itemList=null;
        itemJson=null;
        
    }

    @Test
    void testSaveItem() throws Exception {
        
        when(itemService.saveItem(any(Item.class))).thenReturn(item);
        
        
         mockMvc.perform(MockMvcRequestBuilders.post("/api/saveItem")
                .contentType(MediaType.APPLICATION_JSON).content(itemJson))
                .andExpect(MockMvcResultMatchers.jsonPath("$.itemId").value(1L))
                .andExpect(MockMvcResultMatchers.jsonPath("$.itemDescription").value("TABLE"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.itemValuation").value(1200));
                
                

                

        
    }

    @Test
    void testGetAllProducts() throws Exception {
        
        
        
        when(itemService.getAll()).thenReturn(itemList);
        
        mockMvc.perform(MockMvcRequestBuilders.get("/api/getItems"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].itemDescription").value("TABLE"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].itemDescription").value("SPOON"));
        
        
        
        
        
    }

    @Test
    void testGetItemById() throws Exception {
        Long itemId=1L;
        when(itemService.getItemById(itemId)).thenReturn(Optional.of(itemList.get(0)));
        
        mockMvc.perform(MockMvcRequestBuilders.get("/api/items/{id}",itemId))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.itemId").value(1L))
            .andExpect(MockMvcResultMatchers.jsonPath("$.itemDescription").value("TABLE"));
            
            //.andExpect(MockMvcResultMatchers.jsonPath("$.itemDescription").value("TABLE"));)
        
    }
    
    @Test
    void testItemNotFound() throws Exception {
        Long itemId=3L;
        when(itemService.getItemById(itemId)).thenReturn(Optional.empty());
        
        mockMvc.perform(MockMvcRequestBuilders.get("/api/items/{id}",itemId))
            .andExpect(MockMvcResultMatchers.status().isNotFound())
            .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Item not found for this id::"+ itemId));
            
        
    }

    @Test
    void testUpdateItem() throws Exception {
        Long itemId=1L;
        when(itemService.getItemById(itemId)).thenReturn(Optional.of(itemList.get(0)));
        
        Item nItem=itemList.get(0);
        nItem.setItemDescription("CUPBOARD");
        
        when(itemService.saveItem(any(Item.class))).thenReturn(nItem);
        
        mockMvc.perform(MockMvcRequestBuilders.put("/api/items/{itemId}",itemId)
                .contentType(MediaType.APPLICATION_JSON).content("{\"itemDescription\":\"CUPBOARD\"}"))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.itemId").value(1L))
        .andExpect(MockMvcResultMatchers.jsonPath("$.itemDescription").value("CUPBOARD"));
        
        
        
    }
    
    @Test
    void testFailedUpdateItem() throws Exception{
        Long itemId=3L;
        
        when(itemService.getItemById(itemId)).thenReturn(Optional.empty());
        
        mockMvc.perform(MockMvcRequestBuilders.put("/api/items/{itemId}",itemId)
                .contentType(MediaType.APPLICATION_JSON).content(itemJson))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value
                        ("Item not found for this id::"+ itemId));
                
        
        
        
        
    }

    @Test
    void testDeleteIssuedItem() throws Exception {
        Item issuedItem=new Item(3L, "CUP", "GLASS", 'Y', "STATIONARY",200);
        Long itemId=3L;
        
        when(itemService.getItemById(itemId)).thenReturn(Optional.of(issuedItem));
        
        when(itemService.deleteItem(issuedItem)).thenReturn(
                
                Collections.singletonMap(false, ("Can't delete item: " + issuedItem.getItemId() + 
                        ". The item is issued by an employee.")));
        
        
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/deleteItem/{itemId}",itemId))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.false").value("Can't delete item: " + issuedItem.getItemId() + 
                ". The item is issued by an employee."));
        
    }
    
    @Test
    void testDeleteNotIssuedItem() throws Exception {
        Item NotIssuedItem=new Item(4L, "ALMIRAH", "STEEL", 'N', "STATIONARY",2200);
        Long itemId=4L;
        
        when(itemService.getItemById(itemId)).thenReturn(Optional.of(NotIssuedItem));
        
        //
        
        when(itemService.deleteItem(NotIssuedItem)).thenReturn(
                
                Collections.singletonMap(true, "Item successfully deleted. Unapproved loans on this item are also rejected."));
        
        
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/deleteItem/{itemId}",itemId))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.true").value("Item successfully deleted. Unapproved loans on this item are also rejected."));
        
    }
    
    @Test
    void testFailedDeleteItem() throws Exception{
        Long itemId=3L;
        
        when(itemService.getItemById(itemId)).thenReturn(Optional.empty());
        
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/deleteItem/{itemId}",itemId))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value
                        ("No item found with id: " + itemId));
                
        
        
        
        
    }

    @Test
    void testGetItemCategory() throws Exception {
        
        ArrayList<String> distinctCategories = new ArrayList<>();
        distinctCategories.add("FURNITURE");
        distinctCategories.add("STATIONARY");
        
        
        when(itemService.getUniqueItemCategory()).thenReturn(distinctCategories);
        
        mockMvc.perform(MockMvcRequestBuilders.get("/api/getItemCategory"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[0]").value("FURNITURE"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.[1]").value("STATIONARY"));
        
        
        
        
    }

    @Test
    void testGetItemMakeByCategory() throws Exception {
        item = new Item(1L, "WINDOW", "GLASS", 'N', "FURNITURE",5200);
        
        itemList.add(item);
        String category="FURNITURE";
        
        ArrayList<String>distinctMake=new ArrayList<>();
        distinctMake.add("WOODEN");
        distinctMake.add("GLASS");
        
        
        System.out.println(itemList.toString());
        when(itemService.getItemMakeByCategory(category)).thenReturn(distinctMake);
        
        mockMvc.perform(MockMvcRequestBuilders.get("/api/getItemMake/{category}",category))
                .andExpect(MockMvcResultMatchers.jsonPath("$.[0]").value("WOODEN"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.[1]").value("GLASS"));
        
        
        
    }

    @Test
    void testGetItemDescByCategoryMake() throws Exception {
        item = new Item(1L, "CHAIR", "WOODEN", 'N', "FURNITURE",1200);
        itemList.add(item);
        String category="FURNITURE";
        String make="WOODEN";
        
        ArrayList<String>distinctDesc=new ArrayList<>();
        
        distinctDesc.add("TABLE");
        distinctDesc.add("CHAIR");
        
        
        when(itemService.getItemDescByMakeCategory(category,make)).thenReturn(distinctDesc);
        
        mockMvc.perform(MockMvcRequestBuilders.get("/api/getItemDesc/{category}/{make}",category,make))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0]").value("TABLE"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[1]").value("CHAIR"));
        
    }

    @Test
    void testGetItemValByFilter() throws Exception {
        Item item = new Item(1L, "TABLE", "WOODEN", 'N', "FURNITURE",2000);
        itemList.add(item);
        String category="FURNITURE",make="WOODEN",desc="TABLE";
        ArrayList<Integer>values=new ArrayList<>();
        values.add(1200);
        values.add(2000);
        
        when(itemService.getItemValuesByFilters(category, make, desc)).thenReturn(values);
        
        mockMvc.perform(MockMvcRequestBuilders.get("/api/getItemValue/{category}/{make}/{desc}"
                ,category,make,desc))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[0]").value(1200))
                .andExpect(MockMvcResultMatchers.jsonPath("$.[1]").value(2000));
        
    }

    @Test
    void testGetItem() throws Exception {
        String category="FURNITURE",make="WOODEN",desc="TABLE";
        int value=1200;
        when(itemService.getItem(category, make, desc, value)).thenReturn(1L);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/getItem/{category}/{make}/{desc}/{value}"
                ,category,make,desc,value))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("1"));
        
    }

}
