import React from "react";

import {Form} from "react-bootstrap";

const Input = ({name, label, type, handleChange }) => {
    return (
        <Form.Group controlId={name}>
            {type !== 'checkbox' ? (
                <>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control name={name} type={type} onChange={handleChange} required></Form.Control>
                </>
            ) : (
                <Form.Check type={type} id={name} label={label} required/>
            )}
        </Form.Group>
    );
}

export default Input;