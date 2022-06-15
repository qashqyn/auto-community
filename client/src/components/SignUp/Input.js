import React, { useState } from "react";
import FileBase from 'react-file-base64';
import {Form, Image} from "react-bootstrap";
import './input.scss';
import ImageIcon from '../../images/addImgIcon.png';
import moment from 'moment';

const Input = ({error='', name, label, type, handleChange, value, disabled=false, required=false, options=[], keyAsValue=false, maxCharacters=0 }) => {
    const [ charCount, setCharCount ] = useState(0);

    // EDITABLE
    const checkChar = (e) => {
        if(e.target.textContent.length > maxCharacters && e.keyCode !== 8)
            e.preventDefault();
        setCharCount(e.target.textContent.length, handleChange(e));
    }
    const formatDoc = (command) => {
        document.execCommand(command, false, null);
    }

    const pasteImage = (img) => {
        document.execCommand('insertImage', false, img);
    }

    function generateArrayOfYears() {
        var max = new Date().getFullYear();
        var min = max - 100;
        var years = [];
      
        for (var i = max; i >= min; i--) {
          years.push(i);
        }
        return years;
    }

    switch(type) {
        case 'tel':
            const telHandler = (e) => {
                // e.preventDefault();
                let value = e.target.value;
                if(value === '') return;
                value = value.replace(/\D/g, "");
                let valNums = value.replace(/ /g, '').replace(/\+/g, '');
                switch(valNums.length){
                    case 0:
                        value = "";
                        break;
                    case 1:
                        value = "+" + valNums;
                        break;
                    case 2:
                    case 3:
                    case 4:
                        value = "+" + valNums.substring(0,1) + " " + valNums.substring(1,4);
                        break;
                    case 5:
                    case 6:
                    case 7:
                        value = "+" + valNums.substring(0,1) + " " + valNums.substring(1,4) + " " + valNums.substring(4,7);
                        break;    
                    default:
                        value = "+" + valNums.substring(0,1) + " " + valNums.substring(1,4) + " " + valNums.substring(4,7) + " " + valNums.substring(7,11);
                        break
                }
                e.target.value = value;
            }
            return (
                <Form.Group controlId={name} className="input">
                    <Form.Control isInvalid={error} type="text" onLoad={telHandler} value={value} placeholder={label} label={label} name={name} onKeyUp={telHandler} onChange={handleChange} required={required} />
                    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                </Form.Group>
            );
        case 'currency':
            const currencyHandler = (e) => {
                // e.preventDefault();
                let value = e.target.value;
                if(value === '') return;
                value = value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                e.target.value = value;
            }
            return (
                <Form.Group controlId={name} className="input">
                    <Form.Control isInvalid={error} type="text" value={value} placeholder={label} label={label} name={name} onKeyUp={currencyHandler} onChange={handleChange} required={required} />
                    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                </Form.Group>
            );
        case 'date':
            return (
                <Form.Group controlId={name} className="input">
                    <Form.Control isInvalid={error} type="date" placeholder={label} name={name} onChange={handleChange} max={moment(new Date()).format("YYYY-MM-DD")} className="datepicker" label={label} required={required} />
                    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                </Form.Group>
            )
        case 'checkbox':
            return (
                <Form.Group controlId={name} className="input">
                    <Form.Check onChange={handleChange} className="checkbox"  type={type} id={name} label={label} required={required}/>
                </Form.Group>
            );
        case 'radio':
            return (
                <Form.Group >
                    {options.map((option, key) => (
                        <Form.Check onChange={handleChange} className="radio-button" key={key} label={option.label} id={name+key} type="radio" value={option.value} name={name}/>
                    ))}
                </Form.Group>
            )
        case 'select':
            return (
                <Form.Group controlId={name} className="input">
                    <Form.Select name={name} onChange={handleChange} required={required} placeholder={label}>
                        {label && (
                            <option value="">{label}</option>
                        )}
                        {options.map((option, key) => (
                            <option value={keyAsValue ? key : option} key={key}>{option}</option>
                        ))}
                    </Form.Select>
                    <Form.Control isInvalid={error} hidden />
                    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                </Form.Group>
            );
        case 'year':
            return (
                <Form.Group controlId={name} className="input">
                    <Form.Select name={name} onChange={handleChange} required={required} placeholder={label}>
                        {label && (
                            <option value="">{label}</option>
                        )}
                        {generateArrayOfYears().map((year, key) => (
                            <option value={year} key={key}>{year}</option>
                        ))}
                    </Form.Select>
                    <Form.Control isInvalid={error} className="d-none" />
                    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                </Form.Group>
            );
        case 'editable':
            return (
                <Form.Group controlId={name} className="input">
                    <div contentEditable='true' className="editable" placeholder={label} name={name} onKeyDown={checkChar} id={`editable`}></div>
                    <Form.Control isInvalid={error} hidden />
                    <Form.Control.Feedback type="invalid" >{error}</Form.Control.Feedback>
                    <div className="bottom">
                        <div className="formatBtns">
                            <div onMouseDown={(e) => e.preventDefault()} onClick={(e) => {e.preventDefault();formatDoc('bold')}} className="formatBtn">
                                <span className="bold">
                                B
                                </span>
                            </div>
                            <div onMouseDown={(e) => e.preventDefault()} onClick={(e) => {e.preventDefault();formatDoc('italic')}} className="formatBtn">
                                <span className="italic">
                                i
                                </span>
                            </div>
                            <label className="formatBtn">
                                <FileBase onMouseDown={(e)=>e.preventDefault()} type="file" id="paseImage" className="d-none" multiple={false} 
                                    onDone={(data) => pasteImage(data.base64)}
                                />
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.5 3H4.5C3.67158 3 3 3.67158 3 4.5V19.5C3 20.3285 3.67158 21 4.5 21H19.5C20.3285 21 21 20.3285 21 19.5V4.5C21 3.67158 20.3285 3 19.5 3Z" stroke="#8E8E8E"/>
                                    <path d="M9 11.5C10.3807 11.5 11.5 10.3807 11.5 9C11.5 7.6193 10.3807 6.5 9 6.5C7.6193 6.5 6.5 7.6193 6.5 9C6.5 10.3807 7.6193 11.5 9 11.5Z" stroke="#8E8E8E"/>
                                    <path d="M21 18L15.5 13L10.5 17.5L7 14.5L3 17.5" stroke="#8E8E8E"/>
                                </svg>
                            </label>
                            {/* <div onMouseDown={(e) => e.preventDefault()} onClick={createLink} className="formatBtn">
                                L
                            </div> */}
                        </div>
                        <div>{charCount}/{maxCharacters}</div>
                    </div>
                    
                </Form.Group>
            )
        case 'textarea':
            return (
                <Form.Group controlId={name} className="input">
                    <Form.Control isInvalid={error.length > 0} placeholder={label} name={name} rows={5} as={type} disabled={disabled} onChange={handleChange} required={required} value={value}></Form.Control>
                    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                </Form.Group>
            );    
        default:
            return (
                <Form.Group controlId={name} className="input">
                    <Form.Control isInvalid={error.length > 0} placeholder={label} name={name} type={type} disabled={disabled} onChange={handleChange} required={required} value={value}></Form.Control>
                    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                </Form.Group>
            );
    }
}

export default Input;