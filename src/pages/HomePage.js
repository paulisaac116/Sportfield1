import React from 'react';
import Carouselinfo from "../components/HomePageComponents/Carouselinfo"
import Services from "../components/HomePageComponents/Services";
import Course from "../components/HomePageComponents/Course";
import MainMenu from "../components/HomePageComponents/MainMenu";

import { Header } from 'antd/lib/layout/layout';


import sportFieldLogo from '../images/HomePageImages/sportFieldLogo.jpg';
import '../styles/HomePageStyles/App.css';


const HomePage = () => {
    return (
        <>
            <Header className="main-header">
                <img src={sportFieldLogo} alt="SportField" />
                <MainMenu />
            </Header>

            <div className="imagesInfo">
                <Carouselinfo />
            </div>
            <div className="services">
                <h2>SERVICIOS</h2>
                <Services />
                <div className="curses">
                    <h2>CURSOS DISPONIBLES</h2>
                    <Course />
                </div>

            </div>
        </>
    );
};

export default HomePage;