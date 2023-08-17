<<<<<<< Updated upstream
=======
<<<<<<< HEAD
import axios from  'axios';

/*
  Axios, which is a popular library is mainly used to send asynchronous 
  HTTP requests(GET,POST,PUT,DELETE) to REST endpoints. 
This library is very useful to perform CRUD operations.
This popular library is used to communicate with the backend. 
Axios supports the Promise API, native to JS ES6.
Using Axios we make API requests in our application. 
Once the request is made we get the data in Return, and then we use this data in our React APPL. 

> npm install axios

*/
// Service class interacts with REST API

// to make rest (spring boot) api calls , we use axios
// npm install axios


class AuthenticationService {
   

    static async registerAdmin(admin) {
        try {
          const response = await axios.post('http://localhost:8085/quickloan/api/registerAdmin', admin); // Adjust the API endpoint
          return response.data;
        } catch (error) {
          console.error('Registration error', error);
          throw new Error('An error occurred during registration.');
        }
      }

  

}
export default AuthenticationService; 
=======
>>>>>>> Stashed changes
import axios from 'axios'

class AuthenticationService{

    static async registerEmployee(Employee) {
        try {
          const response = await axios.post('http://localhost:8085/quickloan/api/registerEmployee', Employee); // Adjust the API endpoint
          return response.data;
        } catch (error) {
          console.error('Registration error', error);
          throw new Error('An error occurred during registration.');
        }
    }
    
    static async registerAdmin(Admin) {
        try {
          const response = await axios.post('http://localhost:8085/quickloan/api/registerAdmin', Admin); // Adjust the API endpoint
          return response.data;
        } catch (error) {
          console.error('Registration error', error);
          throw new Error('An error occurred during registration.');
        }
    }

    static async login(user, path) {
        try {
          const response = await axios.post('http://localhost:8085/quickloan/api/'+path, user);
          console.log('SAPI response:', response.data +"Hello"+response.data.success); 
          if (response.data === true) {
            return true; // Return true for successful login
          } else {
            return false; // Return false for unsuccessful login
          }
        } catch (error) {
          console.error('Login error', error);
          throw new Error('An error occurred during login.');
        }
    }
    
}
    
<<<<<<< Updated upstream
export default AuthenticationService;
=======
export default AuthenticationService;
>>>>>>> 26c7d7fddd0d1b6f67db8b3abc587b681eb18d7c
>>>>>>> Stashed changes
