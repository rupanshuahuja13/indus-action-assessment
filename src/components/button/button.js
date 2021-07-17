
import React from 'react';
import { Button } from '@material-ui/core';
import './button.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// Function for creating button
const IndusButton = ({buttonText, click, buttonColor,disabled,iconName}) => {
    return (
        <div className="container">
            <Button disabled={disabled} style={{backgroundColor: buttonColor}} onClick={click} className="button margins" variant="contained" >
            {iconName && <FontAwesomeIcon className="icon" icon={iconName} />}{buttonText}
            </Button>
        </div>
    );
}

export default IndusButton;
