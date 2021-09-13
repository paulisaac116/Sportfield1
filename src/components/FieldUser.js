import {React, useState} from 'react'

import '../styles/FieldUser.css'
import { GreenButton } from './GreenButton'

export const FieldUser = () => {
    
    const [field, setField] = useState([])

    return (
        <div className="field">
            <div className="field__title">CANCHAS</div>
            <div className="field__table"></div>
            <div className="field__button">
                <GreenButton button_name="Agendar cancha"/>
            </div>
        </div>
    )
}
