import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import EmployeeRegister from './components/EmployeeRegister';
import EmployeeLogin from './components/EmployeeLogin';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import NavBar from './components/NavBar';
import Loan from './components/Loan';

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
      <header className="App-header">
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
              <Route path='/loans' Component={Loan}></Route>
            </Routes>
          </Router>
        </div>
      </section>

      <footer className="App-footer">
        <p>&copy; All Rights Reserved to Wells Fargo</p>
      </footer>
    </div>
  );
}

export default App;
