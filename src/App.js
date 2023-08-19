import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./style/themes/theme";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Home from "./components/Home";
import EmployeeRegister from "./components/EmployeeRegister";
import Login from "./components/Login";
import Items from "./components/Items";
import NavBar from "./components/NavBar";
import Loans from "./components/Loans";
import FAQ from "./components/FAQ";

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
        <ThemeProvider theme={theme}>
          <NavBar />
          <Routes>
            <Route path="/" exact Component={Home}></Route>
            <Route path="/register" Component={EmployeeRegister}></Route>
            <Route path="/login" Component={Login}></Route>
            {/* <Route path='/register/admin' Component={AdminRegister}></Route>
    
              <Route path='/login/admin' Component={AdminLogin}></Route> */}
            <Route path="/items" Component={Items}></Route>
            <Route path="/loans" Component={Loans}></Route>
            <Route path="/faqs" Component={FAQ}></Route>
          </Routes>
          <Box
            component="footer"
            sx={{
              backgroundColor: "primary.main",
              py: { xs: 2, md: 1 },
              color: "primary.contrastText",
            }}
          >
            <Typography variant="subtitle1" sx={{ letterSpacing: 1, mb: 2 }}>
              &copy; All Rights Reserved to Wells Fargo
            </Typography>
          </Box>
        </ThemeProvider>
      </Router>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Quickloans</h1>
      </header>

      <section>
      <div style={{ backgroundImage: "url(/images/lms1.jpg)",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize:'cover', minHeight:'100vh',minWidth:'100vw'}}>
          <Router>
            <NavBar></NavBar>
            <Routes>
              <Route path='/' exact Component={Home}></Route>
              <Route path='/register/employee' Component={EmployeeRegister}></Route>
              <Route path='/login/employee' Component={EmployeeLogin}></Route>
              <Route path='/register/admin' Component={AdminRegister}></Route>
    
              <Route path='/login/admin' Component={AdminLogin}></Route>
              <Route path='/items' Component={Items}></Route>
            </Routes>
          </Router>
        </div>
      </section>

      */}
    </div>
  );
}

export default App;
