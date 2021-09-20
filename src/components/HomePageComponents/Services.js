import React from 'react';
import cancha2 from '../../images/HomePageImages/cancha2.PNG';
import futbol2 from '../../images/HomePageImages/futbol2.PNG';
import {Card, Col, Row} from 'antd';
import {useHistory } from "react-router-dom";
import '../../styles/HomePageStyles/services.css';
import {GreenButton} from "../GreenButton";


const { Meta } = Card;


const Services = () => {
    const history = useHistory();
    const handleLogout =  () => {
        history.push("/inicio-sesion");
    };
    return (
        <>

            <Row >
                <Col  span={12}>
                    <Card
                    cover={<img className="imgServices" alt="Cancha" src={cancha2} />}
                >
                    <Meta

                        title="Alquiler de Canchas Deportivas" description="Reserva tu cancha en la fecha y hora que deseas" />
                        <div className="btnServices">
                            <GreenButton  button_name="Agendar cancha" button_func={handleLogout}/>
                        </div>

                </Card></Col>
                <Col span={12}>
                    <Card
                        cover={<img className="imgServices" alt="Futbol" src={futbol2} />}
                    >
                        <Meta title="Inscripción en Cursos Deportivos" description="Aprende nuevas habilidades deportivas con los cursos ofertados" />
                        <div className="btnServices">

                                <GreenButton  button_name="Inscribirse" button_func={GreenButton}></GreenButton>


                        </div>

                    </Card>
                </Col>
            </Row>

        </>
    );
};

export default Services;