import React from 'react'
import { HeaderComp } from '../components/HeaderComp';
import {PurpleTitle} from '../components/PurpleTitle'
import {InstructionCard} from '../components/InstructionCard'
import {GreenButton} from '../components/GreenButton'
import {BlackButton} from '../components/BlackButton'

import '../styles/TurnsPage.css'

export const TurnsPage = () => {
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
                        <BlackButton button_name="SECTOR MEDIO"/>

                    </div>
                </div>
                <div className="turn__date">
                    <div className="turn__date__instruction">
                        <PurpleTitle title="PASO 2"/>
                        <InstructionCard instruction="Escoge la hora y fecha que deseas agendar. Finalmente, selecciona “Agendar turno”"/>
                        <GreenButton button_name="Agendar turno"/>
                    </div>
                    <div className="turn__date__calendar">

                    </div>
                </div>
            </div>
        </div>
    )
}
