import React, { useState } from "react";
import FileBase from 'react-file-base64';
import {Form} from "react-bootstrap";
import './input.scss';
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

    if(type === 'date')
        return (
            <Form.Group controlId={name} className="input">
                <Form.Control isInvalid={error} type="date" placeholder={label} name={name} onChange={handleChange} max={moment(new Date()).format("YYYY-MM-DD")} className="datepicker" label={label} required={required} />
                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            </Form.Group>
        )
    else if(type === 'checkbox')
        return (
            <Form.Group controlId={name} className="input">
                <Form.Check onChange={handleChange} className="checkbox"  type={type} id={name} label={label} required={required}/>
            </Form.Group>
        );
    else if(type === 'radio')
        return (
            <Form.Group >
                {options.map((option, key) => (
                    <Form.Check className="radio-button" key={key} label={option.label} id={name+key} type="radio" value={option.value} name={name}/>
                ))}
            </Form.Group>
        )
    else if(type === 'select')
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
            </Form.Group>
        );
    else if(type === 'year')
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
    else if(type === 'editable')
        return (
            <Form.Group controlId={name} className="input">
                <div contentEditable='true' className="editable" placeholder={label} name={name} onKeyDown={checkChar} id={`editable`}></div>
                <div>
                    <div className="formatBtns">
                        <div onMouseDown={(e) => e.preventDefault()} onClick={(e) => {e.preventDefault();formatDoc('bold')}} className="formatBtn">
                            B
                        </div>
                        <div onMouseDown={(e) => e.preventDefault()} onClick={(e) => {e.preventDefault();formatDoc('italic')}} className="formatBtn">
                            I
                        </div>
                        <FileBase onMouseDown={(e)=>e.preventDefault()} type="file" id="paseImage" multiple={false} 
                            onDone={(data) => pasteImage(data.base64)}
                        />
                        {/* <div onMouseDown={(e) => e.preventDefault()} onClick={createLink} className="formatBtn">
                            L
                        </div> */}
                    </div>
                    <div>{charCount}/{maxCharacters}</div>
                </div>
            </Form.Group>
        )
    else if(type === 'textarea') 
        return (
            <Form.Group controlId={name} className="input">
                <Form.Control isInvalid={error.length > 0} placeholder={label} name={name} rows={5} as={type} disabled={disabled} onChange={handleChange} required={required} value={value}></Form.Control>
                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            </Form.Group>
        );    
    else 
        return (
            <Form.Group controlId={name} className="input">
                <Form.Control isInvalid={error.length > 0} placeholder={label} name={name} type={type} disabled={disabled} onChange={handleChange} required={required} value={value}></Form.Control>
                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            </Form.Group>
        );
}

export default Input;