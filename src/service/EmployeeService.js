import axios from "axios";

const EMPLOYEE_REST_API_URL = "http://localhost:8085/quickloan/api";

class EmployeeService {
  static getEmployees() {
    try {
      return axios.get(EMPLOYEE_REST_API_URL + "/employees");
    } catch (error) {
      console.log(error);
    }
  }

  static getEmployeeById(employeeId) {
    try {
      return axios.get(
        EMPLOYEE_REST_API_URL + "/getEmployeeById/" + employeeId
      );
    } catch (error) {
      console.log(error);
    }
  }

  static updateEmployee(employee, employeeId) {
    try {
      return axios.put(
        EMPLOYEE_REST_API_URL + "/updateEmployee/" + employeeId,
        employee
      );
    } catch (error) {
      console.log(error);
    }
  }

  static deleteEmployee(employeeId) {
    try {
      return axios.delete(
        EMPLOYEE_REST_API_URL + "/deleteEmployee/" + employeeId
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default EmployeeService;
