import React,{Component} from 'react'
import {Link} from 'react-router-dom'

import '../style/NavBar.css'

export default class EmployeeLogin extends Component{
    render(){
        return(
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
                <h1>Employee Login</h1>
            </div>
        );
    }
}