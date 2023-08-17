import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import AuthenticationService from '../service/AuthenticationService'
import '../style/Login.css'
import '../style/NavBar.css'

const EmployeeLogin = () => {
    const history = useNavigate();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    const handleLogin = async () => {
      if (!email || !password) {
        setErrorMessage('Please enter both email and password.');
        return;
      }
  
      const employee = {
        email,
        password
      };
  try {
      const loginSuccess = await AuthenticationService.login(employee,'loginEmployee');
      console.log('API response:', loginSuccess.data);
      if (loginSuccess) {
        setErrorMessage('');
        setSuccessMessage('Login successful. Redirecting...');
        setTimeout(() => {
          history('/items');
        }, 2000);
      } else {
        setErrorMessage('Invalid email or password.');
      }
    } catch (error) {
      console.error('Login error', error);
      setErrorMessage('An error occurred during login.');
    }
    
    };
  
    return (
        <div>
            <nav className='navbar2'>
                    <ul className='nav-list'>
                        <li className='nav-item'>
                            <Link to="/login/admin" className='nav-link'>Admin Login</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/login/employee" className='nav-link'>Employee Login</Link>
                        </li>
                    </ul>
                </nav>
                <div className="container">
          <br></br>
      <h2>Employee Login</h2>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
     
      </div>
        </div>
      
    );
  };
  
  export default EmployeeLogin;