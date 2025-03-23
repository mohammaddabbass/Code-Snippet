import React from 'react';
import './styles.css';

const Button = ({onClick, variant= "primary", buttonText}) => {
    return (
        <button className={`button ${variant}`} onClick={onClick}>{buttonText}</button>
    );
};

export default Button;