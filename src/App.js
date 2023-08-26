import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./style/themes/theme";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Home from "./components/Main/Home";
import EmployeeRegister from "./components/EmployeeRegister";
import MainLogin from "./components/Main/MainLogin";
import Items from "./components/Items";
import NavBar from "./components/NavBar";
import MainLoan from "./components/Main/MainLoan";


import { AuthProvider } from "./service/AuthContext";

import About from "./components/Main/About";
import Profile from "./components/Profile";
import Employees from "./components/Employees";
import ApplyLoans from "./components/ApplyLoans";

/*
	React Router is a standard library for routing in React. 
	It enables the navigation among views of various components in a React Application, allows 
  changing the browser URL, and keeps the UI in sync with the URL. 
	React Router is a JavaScript framework that lets us handle client and server-side routing in 
  React applications. 
	It enables the creation of single-page web or mobile apps that allow navigating without refreshing the page. 
	It also allows us to use browser history features while preserving the right application view.
  Use Version-6 of Router
  > npm install rect-router-dom --save
*/

function App() {
  return (
    <div className="App">
      <Router>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <NavBar />
          <div style={{minHeight: "100vh"}}>
      <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/register" element={<EmployeeRegister />}></Route>
            <Route path="/login" element={<MainLogin />}></Route>
            <Route path="/items" element={<Items />}></Route>
            <Route path="/loans" element={<MainLoan />}></Route>
            <Route path="/aboutus" element={<About />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/employees" element={<Employees />}></Route>
            <Route path="/applyloans" element={<ApplyLoans />}></Route>
          </Routes>
      </div>
          <Box
            component="footer"
            sx={{
              backgroundColor: "primary.main",
              py: { xs: 2, md: 1 },
              color: "primary.contrastText",
             
            }}
          >
            <Typography variant="subtitle1" sx={{ letterSpacing: 1, mb: 2 }}>
              &copy; All Rights Reserved to Quickloans
            </Typography>
          </Box>
        </ThemeProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
