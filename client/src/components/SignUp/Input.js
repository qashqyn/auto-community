import React from "react";

import {Form} from "react-bootstrap";
import './input.scss';

const Input = ({name, label, type, handleChange, value, disabled=false, required=true, options=[] }) => {
    if(type === 'checkbox')
        return (
            <Form.Group controlId={name} className="input">
                <Form.Check className="checkbox" type={type} id={name} label={label} required={required}/>
            </Form.Group>
        );
    else if(type === 'select')
        return (
            <Form.Group controlId={name} className="input">
                <Form.Select name={name} onChange={handleChange} required={required} placeholder={label}>
                    {label && (
                        <option>{label}</option>
                    )}
                    {options.map((option, key) => (
                        <option value={option} key={key}>{option}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        );
    else 
        return (
            <Form.Group controlId={name} className="input">
                <Form.Control placeholder={label} name={name} type={type} disabled={disabled} onChange={handleChange} required={required} value={value}></Form.Control>
            </Form.Group>
        );
}

export default Input;