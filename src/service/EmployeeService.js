import axios from 'axios' ;

const EMPLOYEE_REST_API_URL='http://localhost:8085/quickloan/api';

class EmployeeService{

   static getEmployees(){
        return axios.get(EMPLOYEE_REST_API_URL+'/employees');
    }

    static getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_REST_API_URL+'/getEmployeeById/'+employeeId);
    }

    static updateEmployee(employee,employeeId){
        return axios.put(EMPLOYEE_REST_API_URL+'/updateEmployee/'+employeeId,employee);
    }

    static deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_REST_API_URL+'/deleteEmployee/'+employeeId);
    }

}

export default EmployeeService;
