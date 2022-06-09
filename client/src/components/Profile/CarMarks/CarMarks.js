import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCar, getCars } from '../../../actions/carModels';
import Input from '../../SignUp/Input';

const initialState = {mark: '', model:'', generation: ''};
const initialStateErrors = {mark: '', model:'', generation: ''};
const CarMarks = () => {
    const dispatch = useDispatch();
    const {isLoading, carModels} = useSelector((state) => state.posts);
    useEffect(() => {
        dispatch(getCars());
    }, [dispatch]);

    const [rs, setRs] = useState([]);
    useEffect(()=>{
        if(carModels){
            carModels.map((mark, key) => {
                let count = 0;
                mark.models.map((model) => count += model.generations.length);   
                let newRs = rs;
                newRs[key] = count;
                setRs(newRs);
            })
        }
    }, [carModels]);

    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState(initialStateErrors);

    const handleChange = (e) => {
        e.preventDefault();
        setFormErrors({...formErrors, [e.target.name]: ''});
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let errCnt = 0;
        let errs = initialStateErrors;
        if(!formData.mark){
            errCnt++;
            errs.mark = 'Заполните поле';
        }
        if(!formData.model){
            errCnt++;
            errs.model = 'Заполните поле';
        }
        if(!formData.generation){
            errCnt++;
            errs.generation = 'Заполните поле';
        }
        setFormErrors(errs);
        if(errCnt === 0){
            dispatch(addCar(formData));
            setFormErrors(initialStateErrors);
            setFormData(initialState);
        }
    }

    return (
        <>
            <h1>Все марки авто</h1>
            {(isLoading || !carModels) ? (
                <div className="spinner text-center m-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <Form onSubmit={handleSubmit}>
                        <h3>Добавить новую марку авто</h3>
                        <Row xs={1} md={4}>
                            <Col>
                                <Input type="text" name="mark" label="Марка" error={formErrors.mark} value={formData.mark} handleChange={handleChange}/>
                            </Col>
                            <Col>
                                <Input type="text" name="model" label="Модель" error={formErrors.model} value={formData.model} handleChange={handleChange}/>
                            </Col>
                            <Col>
                                <Input type="text" name="generation" label="Поколение" error={formErrors.generation} value={formData.generation} handleChange={handleChange}/>
                            </Col>
                            <Col>
                                <Button type='submit'>Добавить</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Table>
                        <thead>
                            <tr>
                                <th>Марка</th>
                                <th>Модель</th>
                                <th>Поколение</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carModels.map((carModel, i) => 
                                carModel.models.map((model, j)=>
                                    model.generations.map((gen, k) => (
                                        <tr key={`${i}_${j}_${k}`}>
                                            {j===0 && k===0 && (<th rowSpan={rs[i]} >{carModel.mark}</th>)}
                                            {k===0 && (<td rowSpan={model.generations.length}>{model.name}</td>)}
                                            <td>{gen}</td>
                                        </tr>
                                    ))
                                )
                            )}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    );
}
export default CarMarks;