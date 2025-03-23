import React from 'react';
import './styles.css'
import Input from '../Input';

const FormGroup = ({label, id, type, placeholder, onChange}) => {
    return (
        <div className="form-group flex column">
            <label htmlFor={id} >{label}</label>
            <Input id={id} type={type} placeholder={placeholder} onChange={onChange}></Input>
        </div>
    );
};

export default FormGroup;