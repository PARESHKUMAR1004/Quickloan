import axios from 'axios' ;


const BASE_URL='http://localhost:8085/quickloan/api/'

class LoancardService{

   static getLoanCards(){
        return axios.get(BASE_URL+'getAllLoans');
    }

    static createLoanCard(loanCard){
        return axios.post(BASE_URL+'saveLoanCard',loanCard);
    }

    static getLoanCardById(loanCardId){
        return axios.get(BASE_URL+'getLoan/'+loanCardId);
    }

    static updateLoanCard(loanCard,loanCardId){
        return axios.put(BASE_URL+'loancards/'+loanCardId,loanCard);
    }

    static deleteLoanCard(loanCardId){
        return axios.delete(BASE_URL+'deleteLoan/'+loanCardId);
    }

    static getLoanCardByType(type){
        return axios.get(BASE_URL+'getLoans/'+type);
    }

    static getLaonsOfEmployee(empId){
        return axios.get(BASE_URL+'getLoanIssueSummary/'+empId);
    }

}

export default LoancardService;