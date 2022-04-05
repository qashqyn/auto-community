import React from "react";

import {Form} from "react-bootstrap";

const Input = ({name, label, type, handleChange, value, disabled=false }) => {
    return (
        <Form.Group controlId={name}>
            {type !== 'checkbox' ? (
                <>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control name={name} type={type} disabled={disabled} onChange={handleChange} required value={value}></Form.Control>
                </>
            ) : (
                <Form.Check type={type} id={name} label={label} required/>
            )}
        </Form.Group>
    );
}

export default Input;