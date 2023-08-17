import React from 'react'

import {Link} from 'react-router-dom'

import '../style/NavBar.css'

const NavBar = () => {
    return(
        <nav className='navbar'>
            <ul className='nav-list'>
                <li className='nav-item'>
                    <Link to="/" className='nav-link'>Home</Link> {/* <a href="/"></a> */}
                </li>
                <li className='nav-item'>
                    <Link to="/register/employee" className='nav-link'>Register</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/login/employee" className='nav-link'>Login</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/items" className='nav-link'>Items</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;