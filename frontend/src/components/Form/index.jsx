import React from 'react';
import './styles.css'
import Button from '../Button';

const Form = ({children, onClick, buttonText, onToggle, toggleText}) => {
    return (
        <div className='form-container flex column justify-evenly align-center'>
            <h2>Code Snippets</h2>
            <div className="form-body flex column justify-center align-center">
                {children}
            </div>
            <Button buttonText={buttonText} onClick={onClick}></Button>
            <p onClick={onToggle} className="toggle-text">
                {toggleText}
            </p>
        </div>
    );
};

export default Form;