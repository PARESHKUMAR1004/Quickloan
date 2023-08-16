import React,{Component} from 'react'
import {Link} from 'react-router-dom'

import '../style/NavBar.css'

export default class EmployeeRegister extends Component{
    render(){
        return(
            <div>
                <nav className='navbar2'>
                    <ul className='nav-list'>
                        <li className='nav-item'>
                            <Link to="/register/admin" className='nav-link'>Admin Register</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/register/employee" className='nav-link'>Employee Register</Link>
                        </li>
                    </ul>
                </nav>
                <h1>Employee Registration</h1>
            </div>
        );
    }
}