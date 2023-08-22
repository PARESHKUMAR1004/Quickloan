import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// import AuthenticationService from "../service/AuthenticationService"

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import {
  RadioGroup,
  Radio,
} from "@mui/material";
import { AuthContext } from "../service/AuthContext";


const Login = () => {
  const history = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userTypePath, setUserTypePath] = useState("loginEmployee");

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    const user = {
      email,
      password,
    };
    try {
      const loginSuccess = await login(
        user,
        userTypePath
      );
      console.log("API response:", loginSuccess.data);
      if (loginSuccess) {
        setErrorMessage("");
        setSuccessMessage("Login successful. Redirecting...");
        setTimeout(() => {
          history("/items");
        }, 2000);
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error", error);
      setErrorMessage("An error occurred during login.");
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="Employee"
          name="radio-buttons-group"
          row
        >
        <FormControlLabel value="Employee" control={<Radio color="primary" />} label="Employee" 
        checked={userTypePath === "loginEmployee"}
        onChange={() => setUserTypePath("loginEmployee")}
        />
        <FormControlLabel value="Admin" control={<Radio color="primary" />} label="Admin"
        checked={userTypePath === "loginAdmin"}
        onChange={() => setUserTypePath("loginAdmin")}
        />
    
        </RadioGroup>
        <Box component="form" sx={{ mt: 1 }}>
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
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 ,padding:'15px',boxShadow:'2'}}
            onClick={handleLogin}
            color="primary"
          >
            Login
          </Button>
          
          {errorMessage && <p className="error-message" style={{color:'red'}}>{errorMessage}</p>}
          {successMessage && <p className="success-message" style={{color:'green'}} >{successMessage}</p>}

          <Grid container justifyContent='flex-end' >

            <Grid item sx={{padding:'15px'}}>
              <Link href='/register' >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      
    </Container>
   
  );
};

export default Login;
