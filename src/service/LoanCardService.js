import axios from "axios";

const BASE_URL = "http://localhost:8085/quickloan/api/";

class LoancardService {
  static getLoanCards() {
    try {
      return axios.get(BASE_URL + "getAllLoans");
    } catch (error) {
      console.log(error);
    }
  }

  static createLoanCard(loanCard) {
    try {
      return axios.post(BASE_URL + "saveLoanCard", loanCard);
    } catch (error) {
      console.log(error);
    }
  }

  static getLoanCardById(loanCardId) {
    try {
      return axios.get(BASE_URL + "getLoan/" + loanCardId);
    } catch (error) {
      console.log(error);
    }
  }

  static updateLoanCard(loanCard, loanCardId) {
    try {
      return axios.put(BASE_URL + "loancards/" + loanCardId, loanCard);
    } catch (error) {
      console.log(error);
    }
  }

  static deleteLoanCard(loanCardId) {
    try {
      return axios.delete(BASE_URL + "deleteLoan/" + loanCardId);
    } catch (error) {
      console.log(error);
    }
  }

  static getLoanCardByType(type) {
    try {
      return axios.get(BASE_URL + "getLoans/" + type);
    } catch (error) {
      console.log(error);
    }
  }

  static getLaonsOfEmployee(empId) {
    try {
      return axios.get(BASE_URL + "getLoanIssueSummary/" + empId);
    } catch (error) {
      console.log(error);
    }
  }
}

export default LoancardService;
