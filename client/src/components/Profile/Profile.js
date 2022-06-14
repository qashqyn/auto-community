import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import decode from 'jwt-decode';
import FileBase from 'react-file-base64';

import { Row, Col, Form, Container, Tab, Nav, Button, Image } from "react-bootstrap";

// import { getUser } from '../../actions/user';
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../SignUp/Input";

import { edit } from "../../actions/auth";
import { LOGOUT } from "../../constants/actionTypes";
import NewsForm from "./NewsForm/NewsForm";

import './styles.scss';
import VideoForm from "./VideoForm/VideoForm";
import MyPosts from "./MyPosts/MyPosts";
import AntitheftPosts from "./AntitheftPosts/AntitheftPosts";
import LikedPosts from "./LikedPosts/LikedPosts";
import CarMarks from "./CarMarks/CarMarks";

import NoImg from '../../images/noimg.jpg';
import { getCars } from "../../actions/carModels";
import Subs from "./Subs/Subs";
import Breadcrumbs from "../Breadcrumbs";



const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [crTab, setCrTab] = useState("profile");
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    const initialState = user.result;
    const [ formData, setFormData ] = useState(initialState);
    
    const {carModels} = useSelector((state) => state.posts);    

    useEffect(() => {
        dispatch(getCars());

        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
      
            if (decodedToken.exp * 1000 < new Date().getTime()) 
                navigate('/');
          }
      
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [dispatch]);

    useEffect(() => {
        if(location.hash){
            setCrTab(location.hash.substring(1));
        }
    }, [location])
    const [marks, setMarks] = useState([]);
    const [models, setModels] = useState([]);
    const [generations, setGenerations] = useState([]);
    const colors = ["Белый", "Черный", "Серый", "Бежевый", "Красный", "Синий"];
    const carstatuses = ["Текущая машина", "Бывшая машина"];
    const [addCar, setAddCar] = useState({mark: '',model: '',color: '',generation: '',carStatus: '', image: ''});
    const [newCarForm, setNewCarForm] = useState(false);

    useEffect(()=>{
        if(carModels){
            let markss = [];
            carModels.map((car) => {
                markss.push(car.mark);
            })
            setMarks(markss);
        }
    }, [carModels]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(addCar.mark){
            formData.cars.push({...addCar, mark: carModels[addCar.mark].mark, model: carModels[addCar.mark].models[addCar.model].name, generation: carModels[addCar.mark].models[addCar.model].generations[addCar.generation]});
        }
        setNewCarForm(false);
        dispatch(edit(formData, navigate));
        
    }
    const handleChange = (e) => {
        if(e.target.name === 'newmark'){
            let modells = [];
            if(e.target.value){
                carModels[e.target.value].models.map((model) => {
                    modells.push(model.name);
                })
            }
            setModels(modells);
            setGenerations([]);
            setAddCar({...addCar, mark: e.target.value, model: '', color: '', generation: '',carStatus: '', image: ''});
        }else if(e.target.name === 'newmodel'){
            let gens = [];
            carModels[addCar.mark].models[e.target.value].generations.map((gen)=>{
                gens.push(gen);
            })
            setGenerations(gens);
            setAddCar({...addCar, model: e.target.value, color: '', generation: '',carStatus: '', image: ''})
        }
        else if(e.target.name === 'newcolor'){
            setAddCar({...addCar, color: e.target.value});
        }
        else if(e.target.name === 'newgeneration'){
            setAddCar({...addCar, generation: e.target.value});
        }
        else if(e.target.name === 'newcarstatus'){
            setAddCar({...addCar, carStatus: e.target.value});
        }
        else{
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    const addNewCar = (e) =>{
        e.preventDefault();
        setNewCarForm(true);
    }
    const cancelNewCar = (e) =>{
        e.preventDefault();
        setNewCarForm(false);
    }
    

    const logout = () => {
        dispatch({ type: LOGOUT });
    
        navigate('/login');
    
        setUser(null);
      };

    return (
        <Container className="profile" id="profile">
            <Breadcrumbs currentPage='Профиль' />
            <div className="profile-top">
                <div className="avatar avatar-lg">
                    <Image src={user.result.avatar ? user.result.avatar : NoImg}/>
                </div>
                <div className="ml-40px wrapper">
                    <div className="wrap">
                        <div className="h1">{user.result.firstname} {user.result.lastname}</div>
                        <div className="h5">{user.result._id}</div>
                    </div>
                </div>
            </div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="profile" activeKey={crTab}>
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="profile" href="">Профиль</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="liked" href="#liked">Понравившиеся</Nav.Link>
                            </Nav.Item>
                            {/* <Nav.Item>
                                <Nav.Link eventKey="notes" href="#notes">Заметки</Nav.Link>
                            </Nav.Item> */}
                            <Nav.Item>
                                <Nav.Link eventKey="myposts" href="#myposts">Мои посты</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="subscribes" href="#subscribes">Подписка</Nav.Link>
                            </Nav.Item>
                            {user.result.is_admin === true && (
                                <>
                                    <Nav.Item className="mod">
                                        Модератор
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="news" href="#news">Новости</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="video" href="#video">Видео</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="antitheft" href="#antitheft">Антиугон</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="carmodels" href="#carmodels">Марки авто</Nav.Link>
                                    </Nav.Item>
                                    {/* <Nav.Item>
                                        <Nav.Link eventKey="images" href="#images">Изображение</Nav.Link>
                                    </Nav.Item> */}
                                </>
                            )}
                            <Nav.Item>
                                <Nav.Link style={{cursor:"pointer"}} onClick={logout}>Выйти</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="profile">
                                <div>
                                    <div className="h3">Информация</div>
                                    <Form onSubmit={handleSubmit}>
                                        <div className="avatar-change">
                                            <div className="avatar avatar-sm">
                                                <Image src={formData.avatar ? formData.avatar : NoImg} />
                                            </div>
                                            <div className="avatar-btns">
                                                <label className="avatar-upload btn">
                                                    <FileBase 
                                                        type="file"
                                                        multiple={false}
                                                        onDone={({base64}) => setFormData({ ...formData, avatar: base64 })}
                                                    />Загрузить
                                                </label>
                                                <Button className="avatar-remove" onClick={(e)=>{e.preventDefault(); setFormData({...formData, avatar: ''})}}>Удалить</Button>
                                            </div>
                                        </div>
                                        <Input name="firstname" type="text" handleChange={handleChange} value={formData.firstname}/>
                                        <Input name="lastname" type="text" handleChange={handleChange} value={formData.lastname}/>
                                        <Row xs={2}>
                                            <Col><Input name="id" type="text" disabled={true} value={user.result._id}/></Col>
                                            <Col><Input name="tel" type="tel" handleChange={handleChange} value={formData.tel}/></Col>
                                        </Row>
                                        <Input name="email" type="email" handleChange={handleChange} value={formData.email}/>
                                        <Row xs={2}>
                                            <Col><Input name="country" type="text" handleChange={handleChange} value={formData.country}/></Col>
                                            <Col><Input name="city" type="text" handleChange={handleChange} value={formData.city}/></Col>
                                        </Row>
                                        {formData.cars.length === 0 ? (
                                            <>
                                                <Input name="newmark" type="select" handleChange={handleChange} options={marks} keyAsValue={true} label="У меня нет машины"/>
                                                {addCar.mark && (
                                                    <Row xs={1} lg={2}>
                                                        <Col>
                                                            <Input name="newmodel" value={addCar.model} type="select" handleChange={handleChange} options={models} keyAsValue={true} label="Модель"/>                                                
                                                        </Col>
                                                        <Col>
                                                            <Input name="newcolor" value={addCar.color} type="select" handleChange={handleChange} options={colors} label="Цвет"/>                                                
                                                        </Col>
                                                        <Col>
                                                            <Input name="newgeneration" value={addCar.generation} type="select" handleChange={handleChange} options={generations} keyAsValue={true} label="Поколение"/>                                                
                                                        </Col>
                                                        <Col>
                                                            <Input name="newcarstatus" value={addCar.carStatus} type="select" handleChange={handleChange} options={carstatuses} label="Промежуток"/>                                                
                                                        </Col>
                                                    </Row>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                            {formData.cars.map((car, key) => {
                                                return (
                                                <div key={key}>
                                                    <Input disabled={true} name="mark" type="text" handleChange={handleChange} value={car.mark}/>
                                                    <Row xs={1} lg={2}>
                                                        <Col>
                                                            <Input disabled={true} name="model" type="text" value={car.model} handleChange={handleChange} options={models} keyAsValue={true} label="Модель"/>                                                
                                                        </Col>
                                                        <Col>
                                                            <Input disabled={true} name="color" type="text" value={car.color} handleChange={handleChange} options={colors} label="Цвет"/>                                                
                                                        </Col>
                                                        <Col>
                                                            <Input disabled={true} name="generation" type="text" value={car.generation} handleChange={handleChange} options={generations} keyAsValue={true} label="Поколение"/>                                                
                                                        </Col>
                                                        <Col>
                                                            <Input disabled={true} name="carstatus" type="text" value={car.carStatus} handleChange={handleChange} options={carstatuses} label="Промежуток"/>                                                
                                                        </Col>
                                                    </Row>
                                                </div>)
                                            })}
                                            {newCarForm ? (
                                                <>
                                                    <Input name="newmark" type="select" handleChange={handleChange} options={marks} keyAsValue={true} label="Марка"/>
                                                    <Row xs={1} lg={2}>
                                                        <Col>
                                                            <Input name="newmodel" value={addCar.model} type="select" handleChange={handleChange} options={models} keyAsValue={true} label="Модель"/>                                                
                                                        </Col>
                                                        <Col>
                                                            <Input name="newcolor" value={addCar.color} type="select" handleChange={handleChange} options={colors} label="Цвет"/>                                                
                                                        </Col>
                                                        <Col>
                                                            <Input name="newgeneration" value={addCar.generation} type="select" handleChange={handleChange} options={generations} keyAsValue={true} label="Поколение"/>                                                
                                                        </Col>
                                                        <Col>
                                                            <Input name="newcarstatus" value={addCar.carStatus} type="select" handleChange={handleChange} options={carstatuses} label="Промежуток"/>                                                
                                                        </Col>
                                                    </Row>
                                                    <p onClick={cancelNewCar}>Отмена</p>
                                                </>
                                            ) : (
                                                <p onClick={addNewCar}>Добавить еще машину</p>
                                            )}
                                            </>
                                            )
                                        }
                                        <Button type="submit">Сохранить</Button>
                                    </Form>
                                </div>

                                <div>
                                    <div className="h3">Сменить пароль</div>
                                    <Form onSubmit={handleSubmit}>
                                        <Input name="currentPassword" label="Текущий пароль" type="password" handleChange={handleChange}/>
                                        <Input name="newPassword" label="Новый пароль" type="password" handleChange={handleChange}/>
                                        <Input name="confirmPassword" label="Подтвердить новый пароль" type="password" handleChange={handleChange}/>
                                        <Button type="submit">Сброс пароля</Button>
                                    </Form>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="liked">
                                {crTab === "liked" && (
                                    <LikedPosts />
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="notes">
                            </Tab.Pane>
                            <Tab.Pane eventKey="myposts">
                                {crTab === "myposts" && (
                                    <MyPosts />
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="subscribes">
                                {crTab === "subscribes" && (
                                    <Subs />
                                )}
                            </Tab.Pane>
                            {user.result.is_admin === true && (
                                <>
                                    <Tab.Pane eventKey="news">
                                        {crTab === "news" && (
                                            <NewsForm />
                                        )}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="video">
                                        {crTab === "video" && (
                                            <VideoForm />
                                        )}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="antitheft">
                                        {crTab === "antitheft" && (
                                            <AntitheftPosts />
                                        )}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="carmodels">
                                        {crTab === "carmodels" && (
                                            <CarMarks />
                                        )}
                                    </Tab.Pane>
                                </>
                            )}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
}

export default Profile;

