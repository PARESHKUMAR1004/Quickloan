import axios from 'axios' ;

const LOANCARDS_REST_API_URL='http://localhost:8085/quickloan/api/loancards';

class LoancardService{

   static getLoanCards(){
        return axios.get(LOANCARDS_REST_API_URL);
    }

    static createLoanCard(loanCard){
        return axios.post('http://localhost:8085/quickloan/api/add/loancard',loanCard);
    }

    static getLoanCardById(loanCardId){
        return axios.get(LOANCARDS_REST_API_URL+'/'+loanCardId);
    }

    static updateLoanCard(loanCard,loanCardId){
        return axios.put(LOANCARDS_REST_API_URL+'/'+loanCardId,loanCard);
    }

    static deleteLoanCard(loanCardId){
        return axios.delete(LOANCARDS_REST_API_URL+'/'+loanCardId);
    }

}

export default LoancardService;