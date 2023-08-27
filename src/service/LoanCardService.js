import axios from 'axios' ;

const LOANCARDS_REST_API_URL='http://localhost:8085/quickloan/api/';

class LoancardService{

   static getLoanCards(){
        return axios.get(LOANCARDS_REST_API_URL+'getAllLoans');
    }

    static createLoanCard(loanCard){
        return axios.post(LOANCARDS_REST_API_URL+'saveLoanCard',loanCard);
    }

    static getLoanCardById(loanCardId){
        return axios.get(LOANCARDS_REST_API_URL+'getLoan'+'/'+loanCardId);
    }

    static updateLoanCard(loanCard,loanCardId){
        return axios.put(LOANCARDS_REST_API_URL+'loancards'+'/'+loanCardId,loanCard);
    }

    static deleteLoanCard(loanCardId){
        return axios.delete(LOANCARDS_REST_API_URL+'deleteLoan'+'/'+loanCardId);
    }

}

export default LoancardService;