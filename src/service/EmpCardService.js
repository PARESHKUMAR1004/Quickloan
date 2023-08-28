import axios from 'axios' ;

const BASE_URL='http://localhost:8085/quickloan/api/';

class EmpCardService{

    static getPendingCards(){
        try{
            return axios.get(BASE_URL+"getStatusPendingCards");
        } catch (error){
            console.log(error);
        }
    }

    static rejectLoan(id){
        try{
            return axios.post(BASE_URL+"rejectLoan/"+id);
        }catch(error){
            console.log(error);
        }
    }

    static approveLoan(id){
        try{
            return axios.post(BASE_URL+"approveLoan/"+id);
        }catch(error){
            console.log(error);
        }
        
    }

    static applyLoan(userId,loanId,itemId){
        try{
            return axios.post(BASE_URL+"saveEmpCard/"+userId+"/"+loanId+"/"+itemId);
        }catch(error){
            console.log(error);
        }
    }

}

export default EmpCardService;