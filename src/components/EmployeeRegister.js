import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthenticationService from "../service/AuthenticationService"

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import { Stack } from "@mui/material";

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { LockOpen } from "@mui/icons-material";

import { RadioGroup, Radio, FormControlLabel, FormControl, FormLabel} from "@mui/material"



const EmployeeRegister = () => {
  const history = useNavigate();


  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [date_of_birth, setDOB] = useState('');
  const [date_of_joining, setDOJ] = useState('');
  const [phoneno, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  

  const handleRegister= async () => {
    /*
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    */

    const user = {
      fname,
      lname,
      designation,
      department,
      password,
      date_of_birth,
      date_of_joining,
      phoneno,
      email,
      gender
    };
    try {
      console.log(user);
      const registerSuccess = await AuthenticationService.registerEmployee(user);
      console.log("API response:", registerSuccess.data);
      if (registerSuccess) {
        setErrorMessage("");
        setSuccessMessage("Registration successful. Redirecting...");
        setTimeout(() => {
          history("/items");
        }, 2000);
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (error) {
      console.error("Registration error", error);
      setErrorMessage("An error occurred during registration.");
    }
  };

  return (
    
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding:'25px',
          bgcolor:'white',
          boxShadow:'2',
          margin:'10px',
          borderRadius:'5px'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpen />
        </Avatar>
        <Typography component="h1" variant="h5">
         Employee Sign Up 
        </Typography>
        <br></br>
        <Box component="form" sm={{ mt: 1 }}>
        <Stack spacing={2} direction="row" sx={{marginBottom: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="fname"
            label="First Name"
            name="fname"
            
            autoFocus
            value={fname}
            onChange={(e)=>setFirstName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lname"
            label="Last Name"
            name="lname"
            
            autoFocus
            value={lname}
            onChange={(e)=>setLastName(e.target.value)}
          />
          </Stack>
         
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
         
         <Stack spacing={2} direction="row" sx={{marginBottom: 2, marginTop:1}}>
           <TextField
            margin="normal"
            required
            fullWidth
            id="designation"
            label="Designation"
            name="designation"
            autoComplete="designation"
            autoFocus
            value={designation}
            onChange={(e)=>setDesignation(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="department"
            label="Department"
            name="department"
            autoComplete="department"
            autoFocus
            value={department}
            onChange={(e)=>setDepartment(e.target.value)}
          />
         </Stack>
          <Stack spacing={2} direction="row" sx={{marginBottom: 1, marginTop: 1}}>
          <TextField
          label="Date of Birth"
          id="date_of_birth"
          name="date_of_birth"
          type="date"
          autoFocus
          value={date_of_birth}
          onChange={(e) => setDOB(e.target.value)}
          fullWidth
          margin="normal"
          required
          
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
           label="Date of Joining"
           id="date_of_joining"
           name="date_of_joining"
           type="date"
           autoFocus
           value={date_of_joining}
           onChange={(e) => setDOJ(e.target.value)}
           fullWidth
           margin="normal"
           required
           
           InputLabelProps={{
             shrink: true,
           }}
        />
         </Stack>
        <TextField
          label="Phone Number"
          value={phoneno}
          id="phoneno"
          name="phoneno"
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
          autoFocus
          required
        />
     
          <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            aria-label="gender"
            name="gender"
            value={gender}
            required
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value="M" control={<Radio />} label="Male" />
            <FormControlLabel value="F" control={<Radio />} label="Female" />
            <FormControlLabel value="O" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 ,padding:'15px',boxShadow:'2'}}
            onClick={handleRegister}
            color="primary"
          >
            Sign Up
          </Button>
          
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <Grid container justifyContent='flex-end' >

            <Grid item sx={{padding:'15px'}}>
              <Link href='/login' >
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      
    </Container>
   
  );
};

export default EmployeeRegister;