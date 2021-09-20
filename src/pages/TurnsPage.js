import React from 'react'
import { HeaderComp } from '../components/HeaderComp';
import {PurpleTitle} from '../components/PurpleTitle'
import {InstructionCard} from '../components/InstructionCard'
import {GreenButton} from '../components/GreenButton'
import { FieldsTable } from '../components/FieldsTable';
import { FieldBar } from '../components/FieldBar';

import { Calendar } from 'antd';

import '../styles/TurnsPage.css'

const TurnsPage = () => {

    const onPanelChange = (value, mode) => {
        console.log(value, mode);
      }

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
                        <FieldsTable />
                        <FieldBar />
                    </div>
                </div>
                <div className="turn__date">
                    <div className="turn__date__instruction">
                        <PurpleTitle title="PASO 2"/>
                        <InstructionCard instruction="Escoge la hora y fecha que deseas agendar. Finalmente, selecciona “Agendar turno”"/>
                        <GreenButton button_name="Agendar turno"/>
                    </div>
                    <div className="turn__date__calendar">
                        <div>
                            
                        </div>

                        <div className="site-calendar-demo-card">
                            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                        </div>,

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TurnsPage