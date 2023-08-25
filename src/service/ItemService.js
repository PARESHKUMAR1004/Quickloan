import axios from 'axios' ;

const ITEMS_REST_API_URL='http://localhost:8085/quickloan/api';

class ItemService{

   static getItems(){
        return axios.get(ITEMS_REST_API_URL+"/getItems");
    }

    static createItem(item){
        return axios.post(ITEMS_REST_API_URL+"/saveItem",item);
    }

    static getItemById(itemId){
        return axios.get(ITEMS_REST_API_URL+'/'+itemId);
    }

    static updateItem(item,itemId){
        return axios.put(ITEMS_REST_API_URL+'/'+itemId,item);
    }

    static deleteItem(itemId){
        return axios.delete(ITEMS_REST_API_URL+'/'+itemId);
    }

}

export default ItemService;