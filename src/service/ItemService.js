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
        return axios.get(BASE_URL+'/items/'+itemId);
    }

    static updateItem(item,itemId){
        return axios.put(BASE_URL+'/items/'+itemId,item);
    }

    static deleteItem(itemId){
        return axios.delete(BASE_URL+'/deleteItem/'+itemId);
    }

}

export default ItemService;