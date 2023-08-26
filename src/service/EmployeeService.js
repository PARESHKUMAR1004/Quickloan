import axios from 'axios' ;

const EMPLOYEE_REST_API_URL='http://localhost:8085/quickloan/api/allEmployees';

class EmployeeService{

   static getEmployees(){
        return axios.get(EMPLOYEE_REST_API_URL);
    }

    static getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_REST_API_URL+'/'+employeeId);
    }

    static updateEmployee(employee,employeeId){
        return axios.put(EMPLOYEE_REST_API_URL+'/'+employeeId,employee);
    }

    static deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_REST_API_URL+'/'+employeeId);
    }

}

export default EmployeeService;
