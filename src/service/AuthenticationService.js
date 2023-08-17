import axios from 'axios'

class AuthenticationService{
    
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
    
export default AuthenticationService;