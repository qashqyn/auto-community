import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';
import FileBase from 'react-file-base64';

import { Row, Col, Form, Container, Tab, Nav, Button, Image } from "react-bootstrap";

// import { getUser } from '../../actions/user';
import { useNavigate } from "react-router-dom";
import Input from "../SignUp/Input";

import { edit } from "../../actions/auth";
import { LOGOUT } from "../../constants/actionTypes";
import NewsForm from "./NewsForm/NewsForm";

import './styles.scss';
import VideoForm from "./VideoForm/VideoForm";
import MyPosts from "./MyPosts/MyPosts";



const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    const initialState = user.result;
    const [ formData, setFormData ] = useState(initialState);
    
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
      
            if (decodedToken.exp * 1000 < new Date().getTime()) 
                navigate('/');
          }
      
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [dispatch]);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(edit(formData, navigate));
        
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const logout = () => {
        dispatch({ type: LOGOUT });
    
        navigate('/login');
    
        setUser(null);
      };

    return (
        <Container className="profile" id="profile">
            <div className="profile-top">
                <div className="avatar avatar-lg">
                    <Image src={user.result.avatar}/>
                </div>
                <div className="ml-40px wrapper">
                    <div className="wrap">
                        <div className="h1">{user.result.firstname} {user.result.lastname}</div>
                        <div className="h5">{user.result._id}</div>
                    </div>
                </div>
            </div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="profile">??????????????</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="liked">??????????????????????????</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="notes">??????????????</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="posts">?????? ??????????</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="subsribes">????????????????</Nav.Link>
                            </Nav.Item>
                            {user.result.is_admin === true && (
                                <>
                                    <Nav.Item className="mod">
                                        ??????????????????
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="news">??????????????</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="video">??????????</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="antitheft">????????????????</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="images">??????????????????????</Nav.Link>
                                    </Nav.Item>
                                </>
                            )}
                            <Nav.Item>
                                <Nav.Link style={{cursor:"pointer"}} onClick={logout}>??????????</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="profile">
                                <div>
                                    <div className="h3">????????????????????</div>
                                    <Form onSubmit={handleSubmit}>
                                        <div>
                                            <div className="avatar avatar-sm">
                                                <Image src={formData.avatar} />
                                            </div>
                                            <FileBase 
                                                type="file"
                                                multiple={false}
                                                onDone={({base64}) => setFormData({ ...formData, avatar: base64 })}
                                            />
                                        </div>
                                        <Input name="firstname" type="text" handleChange={handleChange} value={formData.firstname}/>
                                        <Input name="lastname" type="text" handleChange={handleChange} value={formData.lastname}/>
                                        <Row xs={2}>
                                            <Col><Input name="id" type="text" disabled={true} value={user.result._id}/></Col>
                                            <Col><Input name="tel" type="text" handleChange={handleChange} value={formData.tel}/></Col>
                                        </Row>
                                        <Input name="email" type="email" handleChange={handleChange} value={formData.email}/>
                                        <Row xs={2}>
                                            <Col><Input name="country" type="text" handleChange={handleChange} value={formData.country}/></Col>
                                            <Col><Input name="city" type="text" handleChange={handleChange} value={formData.city}/></Col>
                                        </Row>
                                        <Input name="car" type="text" handleChange={handleChange} value={formData.car}/>
                                        <Button type="submit">??????????????????</Button>
                                    </Form>
                                </div>

                                <div>
                                    <div className="h3">?????????????? ????????????</div>
                                    <Form onSubmit={handleSubmit}>
                                        <Input name="currentPassword" label="?????????????? ????????????" type="password" handleChange={handleChange}/>
                                        <Input name="newPassword" label="?????????? ????????????" type="password" handleChange={handleChange}/>
                                        <Input name="confirmPassword" label="?????????????????????? ?????????? ????????????" type="password" handleChange={handleChange}/>
                                        <Button type="submit">?????????? ????????????</Button>
                                    </Form>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="liked">
                            </Tab.Pane>
                            <Tab.Pane eventKey="notes">
                            </Tab.Pane>
                            <Tab.Pane eventKey="posts">
                                <MyPosts />
                            </Tab.Pane>
                            <Tab.Pane eventKey="subscribes">
                            </Tab.Pane>
                            {user.result.is_admin === true && (
                                <>
                                    <Tab.Pane eventKey="news">
                                        <NewsForm />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="video">
                                        <VideoForm />
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

