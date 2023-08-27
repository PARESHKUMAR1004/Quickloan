import axios from 'axios' ;

const BASE_URL='http://localhost:8085/quickloan/api/';

class EmpCardService{

    static getPendingCards(){
        return axios.get(BASE_URL+"getStatusPendingCards");
    }

    static rejectLoan(id){
        return axios.post(BASE_URL+"rejectLoan/"+id);
    }

    static approveLoan(id){
        return axios.post(BASE_URL+"approveLoan/"+id);
    }

    static applyLoan(userId,loanId,itemId){
        return axios.post(BASE_URL+"saveEmpCard/"+userId+"/"+loanId+"/"+itemId);
    }

}

export default EmpCardService;