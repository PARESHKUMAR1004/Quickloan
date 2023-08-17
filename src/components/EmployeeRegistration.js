import React,{useState}  from "react";
import { useNavigate } from "react-router-dom";
import "../style/EmployeeRegistration.css"
import AuthenticationService from "../service/AuthenticationService";


const EmployeeRegistration=()=>{

    const history=useNavigate();

    const [employee, setEmployee] = useState({
       
        fname: '',
        lname: '',
        designation:'',
        department:'',
        password: '',
        date_of_birth: '',
        date_of_joining:'',
        phoneno: '',
        email: '',
        gender:''
        
      });

        
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');




    
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        [parent]: {
          ...prevEmployee[parent],
          [child]: value
        }
      }));
    } else {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        [name]: value
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await AuthenticationService.registerEmployee(employee);
        setSuccessMessage('Registration successful!');
        setTimeout(()=>{
            history("/login");
        },2000)
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

    if (!employee.email) {
      validationErrors.email = 'Email is required.';
    }

    if(!employee.fname){
        validationErrors.fname="First Name is required";
    }
    else if(!/^[a-zA-Z]*$/.test(employee.fname))
    {
        validationErrors.fname="Enter alphabets only"
    }

    if(!employee.lname){
        validationErrors.lname="Last Name is required";
    }
    
    if(!employee.department){
        validationErrors.department="DEpartment is required";
    }

    
    if(!employee.designation){
        validationErrors.designation="Designation is required";
    }


    
    if(!employee.gender){
        validationErrors.gender="Gender is required";
    }


    





    if (!employee.password) {
        validationErrors.password = 'Password is required.';
      } else if (employee.password.length < 6) {
        validationErrors.password = 'Password must be at least 6 characters.';
      }
  
       if (!employee.date_of_birth) {
        validationErrors.date_of_birth = 'Date of Birth is required.';
      } 
      if (!employee.date_of_joining) {
        validationErrors.date_of_joining = 'Date of Joining is required.';
      } 
  
  
      if (!employee.phoneno) {
        validationErrors.phoneno = 'Phone number is required.';
      } else if (!/^\d{10}$/.test(employee.phoneno)) {
        validationErrors.phoneno = 'Invalid phone number. Please enter a 10-digit number.';
      }
      
    // Add more validation rules for other fields

    return validationErrors;
  };




  return (
    <div className="registration-container">
      <h2>Employee Registration</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
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
            value={employee.fname}
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
            value={employee.lname}
            onChange={handleChange}
            className={errors.lname && 'error'}
          />
          {errors.lname && <p className="error-message">{errors.lname}</p>}
        </div>


        
        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            className={errors.department && 'error'}
          />
          {errors.department && <p className="error-message">{errors.department}</p>}
        </div>

        <div className="form-group">
          <label>Designation:</label>
          <input
            type="text"
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            className={errors.designation && 'error'}
          />
          {errors.designation && <p className="error-message">{errors.designation}</p>}
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={employee.gender}
            onChange={handleChange}
            className={errors.gender && 'error'}
          />
          {errors.gender && <p className="error-message">{errors.gender}</p>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={employee.password}
            onChange={handleChange}
            className={errors.password && 'error'}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input
          type="date"
          name="date_of_birth"
          value={employee.date_of_birth}
          onChange={handleChange}
          className={errors.dob && 'error'}
        />
        {errors.date_of_birth && <p className="error-message">{errors.date_of_birth}</p>}
      </div>


      <div className="form-group">
          <label>Date of Joining:</label>
          <input
          type="date"
          name="date_of_joining"
          value={employee.date_of_joining}
          onChange={handleChange}
          className={errors.dob && 'error'}
        />
        {errors.date_of_joining && <p className="error-message">{errors.date_of_joining}</p>}
      </div>

      <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneno"
            value={employee.phoneno}
            onChange={handleChange}
            className={errors.phoneno && 'error'}
          />
          {errors.phoneno && <p className="error-message">{errors.phoneno}</p>}
        </div>


        {/* Add more form fields with similar structure */}
       

       

       
        <div className="form-group">
          <button type="submit" className="submit-button">
            Register
          </button>
        </div>
      </form>
        
    </div>
  );
};
            

export default EmployeeRegistration;


