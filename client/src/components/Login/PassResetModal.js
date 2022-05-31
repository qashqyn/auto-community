import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../actions/auth";
import Input from "../SignUp/Input";

import './modal.scss';

const PassResetModal = ({show, setShow}) => {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');

    const {status} = useSelector((state) => state.auth);

    
    const dispatch = useDispatch();


    const handleChange = (e) => {
        setError('');
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const regex = /^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        if(email){
            if(regex.test(email)){
                setError('');

                dispatch(resetPassword({email}));
            }else{
                setError('Напишите правильную почту');
            }
        }else{
            setError('Введите вашу электронную почту');
        }
    }

    const closeModal = () => {
        setShow(false);
    }
    return (
        <Modal show={show} onHide={closeModal} centered size="lg" id="resetModal">
            <Modal.Header closeButton>
                <Modal.Title>Сброс пароля</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(status && status===201) ? (
                    <p>Мы отправили вам электронное письмо с инструкциями по восстановлению пароля.</p>
                ):(
                    <>
                        <p>Введите адрес электронной почты, связанный с вашей учетной записью, и мы отправим электронное письмо с инструкциями по сбросу пароля.</p>
                        <br/>
                        <Input name="resetEmail" label="Электронная почта" type="text" error={error} handleChange={handleChange}/>                        
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                {(status && status === 201) ? (
                    <Button onClick={closeModal}>Продолжить</Button>
                ) : (
                    <Button onClick={handleSubmit}>Отправить</Button>
                )}
            </Modal.Footer>
        </Modal>
    )
};

export default PassResetModal;