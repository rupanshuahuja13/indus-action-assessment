
import React from 'react';
import './input.css';

// Function for creating button
const IndusInput = ({value, onChange}) => {
    return (
        <div className="containerInput">
            <textarea value={value} className="inputField" type="textarea" 
                name="textValue" onChange={onChange}
                />
        </div>
    );
}

export default IndusInput;
