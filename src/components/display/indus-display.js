
import React from 'react';
import './indus-display.css';

// Function for creating button
const IndusDisplay = ({text, displayName}) => {
    return (
        <div className="valueContainer">
            <div style={{textAlign: 'center'}} className="label">{displayName}: </div>
           <div style={{textAlign: 'center'}}>{text}</div>
        </div>
    );
}

export default IndusDisplay;
