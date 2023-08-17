import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../style/AdminRegistration.css'; // Import external CSS for styling
import AuthenticationService from '../service/AuthenticationService';

const AdminRegistration = () => {

    const history = useNavigate();  // Object to navigate 
  const [admin, setAdmin] = useState({
    email: '',
    fname: '',
    lname: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setAdmin((prevAdmin) => ({
        ...prevAdmin,
        [parent]: {
          ...prevAdmin[parent],
          [child]: value
        }
      }));
    } else {
      setAdmin((prevAdmin) => ({
        ...prevAdmin,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await AuthenticationService.registerAdmin(admin);
        setSuccessMessage('Admin Registration successful!');
        setTimeout(() => {
            history('/quickloan/api/loginAdmin'); // navigates to product Component
          }, 2000);
        // Clear form or navigate to another page
      } catch (error) {
        console.error('Registration error', error);
        setSuccessMessage('An error occurred during registration.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!admin.email) {
      validationErrors.email = 'Email is required.';
    }

    if (!admin.fname) {
        validationErrors.fname = 'First Name  is required.';
      }

      if (!admin.lname) {
        validationErrors.lname = 'Last Name  is required.';
      }


      if (!admin.password) {
        validationErrors.password = 'Password is required.';
      } else if (admin.password.length < 6) {
        validationErrors.password = 'Password must be at least 6 characters.';
      }
  
    // Add more validation rules for other fields

    return validationErrors;
  };

  return (
    <div className="registration-container">
      <h2>Admin Registration</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            className={errors.email && 'error'}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="fname"
            value={admin.fname}
            onChange={handleChange}
            className={errors.fname && 'error'}
          />
          {errors.fname && <p className="error-message">{errors.fname}</p>}
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lname"
            value={admin.lname}
            onChange={handleChange}
            className={errors.Lname && 'error'}
          />
          {errors.lname && <p className="error-message">{errors.lname}</p>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            className={errors.password && 'error'}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="form-group">
          <button type="submit" className="submit-button">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminRegistration;
