import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './mainStyle.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import News from "./components/News/News";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import FooTer from "./components/FooTer/FooTer";
import SignUp from "./components/SignUp/SignUp";

library.add(far, fas);

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="">
                    {/* <Container> */}
                        <Route path="/news" exact element={<News />} />
                        <Route path="/login" exact element={<Login />} />
                        <Route path="/signup" exact element={<SignUp />} />
                    {/* </Container> */}
                </Route>
            </Routes>
            <FooTer />
        </BrowserRouter>
    );
}

export default App;