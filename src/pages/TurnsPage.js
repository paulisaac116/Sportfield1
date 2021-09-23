import React, { useState } from 'react'
import { HeaderComp } from '../components/HeaderComp';
import {PurpleTitle} from '../components/PurpleTitle'
import {InstructionCard} from '../components/InstructionCard'
import {GreenButton} from '../components/GreenButton'
import { FieldsTable } from '../components/FieldsTable';
import { FieldBar } from '../components/FieldBar';

import { Calendar, Modal } from 'antd';

import '../styles/TurnsPage.css'
import { HourBar } from '../components/HourBar';

const TurnsPage = () => {

    const [verifyFieldSelected, setVerifyFieldSelected] = useState(false)
    const [fieldType, setFieldType] = useState("")
    const [fieldLocation, setFieldLocation] = useState("")
    const [fieldCode, setFieldCode] = useState("")
    const [fieldBackground, setFieldBackground] = useState("")

    const [hour, setHour] = useState("")
    const [timePeriod, setTimePeriod] = useState("")

    const [isModalVisible, setIsModalVisible] = useState(false);

    const onSelect = (date) => {
        console.log(date)
    }

    const saveTurn = () => {
        if(verifyFieldSelected) {
            showModal()
            console.log("esta es la hora:", hour)
        } else {
            console.log("Primero, selecciona una cancha")
        }
    }

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <HeaderComp />
            <div className="turn">
                <div className="turn__field">
                    <div className="turn__field__instruction">
                        <PurpleTitle title="INSTRUCCIONES"/>
                        <PurpleTitle title="PASO 1"/>
                        <InstructionCard instruction="Selecciona el sector de ubicación, y a continuación, 
                        el tipo de cancha que deseas agendar"/>
                    </div>
                    <div className="turn__field__fieldCards">
                        <h2>CANCHAS</h2>    
                        <FieldsTable confirmField={(fieldValue) => setVerifyFieldSelected(fieldValue)} wichField={(field) => setFieldType(field)} wichSector={(sector) => setFieldLocation(sector)} wichColor={(color) => setFieldBackground(color)} wichCode={(code) => setFieldCode(code)}/>
                        <FieldBar />
                    </div>
                </div>
                <div className="turn__date">
                    <div className="turn__date__instruction">
                        <PurpleTitle title="PASO 2"/>
                        <InstructionCard instruction="Escoge la hora y fecha que deseas agendar. Finalmente, selecciona “Agendar turno”"/>
                        <GreenButton button_name="Agendar turno" button_func={saveTurn}/>
                        <Modal className="turn-page-modal" title="Confirmación de datos" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <div className="left__modal">
                                <p>CANCHA</p>
                                <div className="left__modal--background">
                                    <div className="left__modal--card" style={{backgroundColor: fieldBackground}}>
                                        {fieldCode}
                                    </div>
                                </div>
                            </div>                    
                            <div className="right__modal">
                                <p>DATOS</p>
                                <div className="right__modal--table">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Cancha tipo</th>
                                                <td>{fieldType}</td>
                                            </tr>
                                            <tr>
                                                <th>Ubicación</th>
                                                <td>{fieldLocation}</td>
                                            </tr>
                                            <tr>
                                                <th>Fecha</th>
                                                <td>{}</td>
                                            </tr>
                                            <tr>
                                                <th>Hora</th>
                                                <td>{}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                       </Modal>
                    </div>
                    <div className="turn__date__calendar">
                        <div>
                            <HourBar wichHour={(hourValue) => setHour(hourValue)}/>
                        </div>
                        <div className="site-calendar-demo-card">
                            <Calendar fullscreen={false}  onSelect={onSelect}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TurnsPage