import React from 'react';
import { Card, Col, Row} from 'antd';
import cursosFut from "../../images/HomePageImages/cursosFut.PNG";
import cursosTennis from "../../images/HomePageImages/cursosTennis.PNG";
import cursosBasquet from "../../images/HomePageImages/cursosBasquet.PNG";
import cursosVoley from "../../images/HomePageImages/cursosVoley.PNG";
import {GreenButton} from "../GreenButton";

import '../../styles/HomePageStyles/curses.css';




const Course = () => {

    return (
        <>
            <Row>
                <Col span={12} className="curses">
                    <Card>
                        <Row>
                            <Col span={12}>
                                <img className="imgServices" src={cursosFut} alt="Futbol"/>
                            </Col>
                            <Col span={12}><h1>Fútbol</h1>
                                <div className="btnCourse">
                                    <GreenButton button_name="Info" button_func={GreenButton}></GreenButton>
                                </div>

                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={12} className="curses">
                    <Card>
                        <Row>
                            <Col span={12}>
                                <img className="imgServices" src={cursosTennis} alt="Tennis"/>
                            </Col>
                            <Col span={12}><h1>Tennis</h1>
                                <div className="btnCourse">
                                    <GreenButton button_name="Info" button_func={GreenButton}></GreenButton>
                                </div>
                                </Col>
                        </Row>
                    </Card>
                </Col>

                <Col span={12} className="curses">
                    <Card>
                        <Row>
                            <Col span={12}>
                                <img className="imgServices" src={cursosBasquet} alt="Baloncesto"/>
                            </Col>
                            <Col span={12}><h1>Baloncesto</h1>
                                <div className="btnCourse">
                                    <GreenButton  button_name="Info" button_func={GreenButton}></GreenButton>
                                </div>
                                </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={12} className="curses">
                    <Card>
                        <Row>
                            <Col span={12}>
                                <img className="imgServices" src={cursosVoley} alt="Ecuavoley"/>
                            </Col>
                            <Col span={12}><h1>Ecuavoley</h1>
                                <div className="btnCourse">
                                    <GreenButton button_name="Info" button_func={GreenButton}></GreenButton>
                                </div>
                                </Col>
                        </Row>
                    </Card>
                </Col>

            </Row>
        </>
    );
};

export default Course;