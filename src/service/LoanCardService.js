import axios from 'axios' ;

const LOANCARDS_REST_API_URL='http://localhost:8085/quickloan/api/loancards';

class LoancardService{

   static getProducts(){
        return axios.get(LOANCARDS_REST_API_URL);
    }

    static createProduct(loanCard){
        return axios.post('http://localhost:8085/quickloan/api/add/loancard',loanCard);
    }

    static getProductById(loanCardId){
        return axios.get(LOANCARDS_REST_API_URL+'/'+loanCardId);
    }

    static updateProduct(loanCard,loanCardId){
        return axios.put(LOANCARDS_REST_API_URL+'/'+loanCardId,loanCard);
    }

    static deleteProduct(loanCardId){
        return axios.delete(LOANCARDS_REST_API_URL+'/'+loanCardId);
    }

}

export default LoancardService;