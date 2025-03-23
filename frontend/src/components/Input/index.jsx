import React from 'react';
import './styles.css'

const Input = ({id, type, placeholder, onChange}) => {
    return (
        <input id={id} type={type} placeholder={placeholder} onChange={onChange} className='input-field' />
    );
};

export default Input;