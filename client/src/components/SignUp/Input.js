import React, { useState } from "react";
import FileBase from 'react-file-base64';
import {Form} from "react-bootstrap";
import './input.scss';

const Input = ({name, label, type, handleChange, value, disabled=false, required=true, options=[], maxCharacters=0 }) => {
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

    if(type === 'checkbox')
        return (
            <Form.Group controlId={name} className="input">
                <Form.Check onChange={handleChange} className="checkbox" type={type} id={name} label={label} required={required}/>
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
                        <option value={option} key={key}>{option}</option>
                    ))}
                </Form.Select>
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
    else 
        return (
            <Form.Group controlId={name} className="input">
                <Form.Control placeholder={label} name={name} type={type} disabled={disabled} onChange={handleChange} required={required} value={value}></Form.Control>
            </Form.Group>
        );
}

export default Input;