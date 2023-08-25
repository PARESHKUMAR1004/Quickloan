import axios from 'axios' ;

const BASE_URL='http://localhost:8085/quickloan/api';

class ItemService{

   static getItems(){
        return axios.get(BASE_URL+"/getItems");
    }

    static createItem(item){
        return axios.post(BASE_URL+"/saveItem",item);
    }

    static getItemById(itemId){
        return axios.get(BASE_URL+'/'+itemId);
    }

    static updateItem(item,itemId){
        return axios.put(BASE_URL+'/'+itemId,item);
    }

    static deleteItem(itemId){
        return axios.delete(BASE_URL+'/'+itemId);
    }

    static getItemCategory(){
        return axios.get(BASE_URL+"/getItemCategory")
    }

    static getItemMake(category){
        return axios.get(BASE_URL+"/getItemMake/"+category);
    }

    static getItemDesc(category,make){
        return axios.get(BASE_URL+"/getItemDesc/"+category+"/"+make);
    }

    static getItemValue(category,make,desc){
        return axios.get(BASE_URL+"/getItemValue/"+category+"/"+make+"/"+desc);
    }

    static getItemId(category,make,desc,value){
        return axios.get(BASE_URL+"/getItem/"+category+"/"+make+"/"+desc+"/"+value);
    }
}

export default ItemService;