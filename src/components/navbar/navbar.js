
import React from 'react';
import './navbar.css';

// Function for creating button
const IndusNavbar = ({text}) => {
    return (
        <div className="navBar">
            <nav><h1>{text}</h1></nav>
        </div>
    );
}

export default IndusNavbar;
