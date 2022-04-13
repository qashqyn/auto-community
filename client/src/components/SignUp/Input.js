import React from "react";

import {Form} from "react-bootstrap";
import './input.scss';

const Input = ({name, label, type, handleChange, value, disabled=false, required }) => {
    return (
        <Form.Group controlId={name} className="input">
            {type !== 'checkbox' ? (
                <>
                    {/* <Form.Label>{label}</Form.Label> */}
                    <Form.Control placeholder={label} name={name} type={type} disabled={disabled} onChange={handleChange} required value={value}></Form.Control>
                </>
            ) : (
                <Form.Check className="checkbox" type={type} id={name} label={label} required={required}/>
            )}
        </Form.Group>
    );
}

export default Input;