import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './mainStyle.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import News from "./components/News/News";
import NewsDetails from "./components/NewsDetails/NewsDetails";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import FooTer from "./components/FooTer/FooTer";
import SignUp from "./components/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import Antitheft from "./components/Antitheft/Antitheft";
import AntitheftDetails from "./components/AntitheftDetails/AntitheftDetails";
import AntitheftForm from "./components/Antitheft/AntitheftForm/AntitheftForm";
import Page404 from "./components/Page404";
import Videos from "./components/Videos/Videos";
import VideoDetails from "./components/VideoDetails/VideoDetails";
import Logbooks from './components/Logbooks/Logbooks';
import LogbookForm from "./components/Logbooks/LogbookForm/LogbookForm";
import LogbookDetails from "./components/LogbookDetails/LogbookDetails";

library.add(far, fas);

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <div id="mainBody">
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="">
                        {/* <Container> */}
                            <Route path="/login" exact element={<Login />} />
                            <Route path="/signup" exact element={<SignUp />} />
                            
                            <Route path="/news/:id" element={<NewsDetails />} />
                            <Route path="/news" exact element={<News />} />
                            <Route path="/news/search" exact element={<News />} />
                            
                            
                            <Route path="/antitheft/:id" element={<AntitheftDetails /> } />
                            <Route path="/antitheft" exact element={<Antitheft /> } />
                            <Route path="/antitheft/form" exact element={<AntitheftForm /> } />
                            
                            <Route path="/logbook/:id" element={<LogbookDetails />} />
                            <Route path="/logbook" exact element={<Logbooks />} />
                            <Route path="/logbook/form" exact element={<LogbookForm />} />

                            <Route path="/video/:id" element = {<VideoDetails /> } />
                            <Route path="/video" exact element = {<Videos />} />
                            
                            <Route path="/profile" exact element={<Profile />} />
                        {/* </Container> */}
                    </Route>
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </div>
            <FooTer />
        </BrowserRouter>
    );
}

export default App;