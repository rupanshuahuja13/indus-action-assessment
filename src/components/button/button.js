
import React from 'react';
import { Button } from '@material-ui/core';
import './button.css';

// Function for creating button
const IndusButton = ({buttonText, click, buttonColor,disabled}) => {
    return (
        <div className="container">
            <Button disabled={disabled} style={{backgroundColor: buttonColor}} onClick={click} className="button margins" variant="contained" >
                {buttonText}
            </Button>
        </div>
    );
}

export default IndusButton;
