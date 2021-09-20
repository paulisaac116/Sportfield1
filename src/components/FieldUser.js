import React from 'react'
import { useHistory } from 'react-router-dom'

import '../styles/FieldUser.css'
import { GreenButton } from './GreenButton'

export const FieldUser = () => {
    
    const history = useHistory();

    const navigateTo = () => {
        history.push("/turns")
    }


    return (
        <div className="field">
            <div className="field__title">CANCHAS</div>
            <div className="field__table"></div>
            <div className="field__button">
                <GreenButton button_name="Agendar cancha" button_func={navigateTo}/>
            </div>
        </div>
    )
}
