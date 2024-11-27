import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="navbar-nav sidebar-menu">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                        <i className="fas fa-home"></i>
                        <span>Home</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/books" className="nav-link">
                        <i className="fas fa-book"></i>
                        <span>Books</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/authors" className="nav-link">
                        <i className="fas fa-user"></i>
                        <span>Authors</span>
                    </NavLink>
                </li>
            </ul>
            
        </div>
    );
};

export default Sidebar;
