import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <div >
            <nav style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} className='navbar navbar-expand-lg navbar-light bg-light'>
                <NavLink className='navbar-brand' to='/'>
                    Logo
                </NavLink>

                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav ml-auto'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/create' >
                                Create Record
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar