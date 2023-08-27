import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./style/themes/theme";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Home from "./components/Main/Home";
import EmployeeRegister from "./components/EmployeeRegister";
import MainLogin from "./components/Main/MainLogin";
import NavBar from "./components/NavBar";
import MainLoan from "./components/Main/MainLoan";


import { AuthProvider } from "./service/AuthContext";

import About from "./components/Main/About";
import Profile from "./components/Profile";
import Employees from "./components/Employees";
import ApplyLoans from "./components/ApplyLoans";
import MainItem from "./components/Main/MainItem";

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
            <Route path="/items" element={<MainItem />}></Route>
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
