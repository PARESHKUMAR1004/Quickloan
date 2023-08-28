import axios from "axios";

const BASE_URL = "http://localhost:8085/quickloan/api";

class ItemService {
  static getItems() {
    try {
      return axios.get(BASE_URL + "/getItems");
    } catch (error) {
      console.log(error);
    }
  }

  static createItem(item) {
    try {
      return axios.post(BASE_URL + "/saveItem", item);
    } catch (error) {
      console.log(error);
    }
  }

  static getItemById(itemId) {
    try {
      return axios.get(BASE_URL + "/items/" + itemId);
    } catch (error) {
      console.log(error);
    }
  }

  static updateItem(item, itemId) {
    try {
      return axios.put(BASE_URL + "/items/" + itemId, item);
    } catch (error) {
      console.log(error);
    }
  }

  static deleteItem(itemId) {
    try {
      return axios.delete(BASE_URL + "/deleteItem/" + itemId);
    } catch (error) {
      console.log(error);
    }
  }

  static getItemsOfEmployee(employeeId) {
    try {
      return axios.get(BASE_URL + "/getIssueItemSummary/" + employeeId);
    } catch (error) {
      console.log(error);
    }
  }

  static getItemCategory() {
    try {
      return axios.get(BASE_URL + "/getItemCategory");
    } catch (error) {
      console.log(error);
    }
  }

  static getItemMake(category) {
    try {
      return axios.get(BASE_URL + "/getItemMake/" + category);
    } catch (error) {
      console.log(error);
    }
  }

  static getItemDesc(category, make) {
    try {
      return axios.get(BASE_URL + "/getItemDesc/" + category + "/" + make);
    } catch (error) {
      console.log(error);
    }
  }

  static getItemValue(category, make, desc) {
    try {
      return axios.get(
        BASE_URL + "/getItemValue/" + category + "/" + make + "/" + desc
      );
    } catch (error) {
      console.log(error);
    }
  }

  static getItemId(category, make, desc, value) {
    try {
      return axios.get(
        BASE_URL +
          "/getItem/" +
          category +
          "/" +
          make +
          "/" +
          desc +
          "/" +
          value
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default ItemService;
