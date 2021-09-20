import React from 'react';
import { Carousel } from 'antd';
import futCarusel from '../../images/HomePageImages/futCarusel.jpg'
import basCarusel from '../../images/HomePageImages/basCarusel.jpg'
import tennisCarusel from '../../images/HomePageImages/tennisCarusel.jpg'
import voleyCarusel from '../../images/HomePageImages/voleyCarusel.jpg'
import '../../styles/HomePageStyles/CaruselFut.css';

const Carouselinfo = () => {
    return (
        <>
            <Carousel autoplay className="futCarusel">
                <div >
                    <h3 >FÚTBOL</h3>
                    <img src={futCarusel} alt="FUTBOL"/>
                </div>
                <div>
                    <h3 >BALONCESTO</h3>
                    <img src={basCarusel} alt="BALONCESTO"/>
                </div>
                <div>
                    <h3 >TENNIS</h3>
                    <img src={tennisCarusel} alt="TENNIS"/>
                </div>
                <div>
                    <h3 >ECUAVOLEY</h3>
                    <img src={voleyCarusel} alt="ECUAVOLEY"/>
                </div>
            </Carousel>,
        </>
    );
};

export default Carouselinfo;