import React, {useContext, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../components/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBatteryQuarter } from '@fortawesome/free-solid-svg-icons'
import { db } from '../firebase'

import '../styles/FieldUser.css'
import { GreenButton } from './GreenButton'

export const FieldUser = () => {

    const [turnsData, setTurnsData] = useState(undefined)
    const documentId = useContext(UserContext)  

    const emptyTurns = 
        <div className="empty-turn-bar">
            <FontAwesomeIcon size="2x" icon={faBatteryQuarter} />
            <p>No tienes turnos almacenados ¡Agenda Uno!</p>    
        </div>

    useEffect(() => {
        db.collection("Users").doc(documentId)
                .onSnapshot((doc) => {
                    setTurnsData(doc.data().turns)
                })
    },[turnsData])
    
    const history = useHistory();
    const navigateTo = () => {
        history.push("/turns")
    }

    return (
        <div className="field">
            <div className="field__title">CANCHAS</div>
            <div className="field__table">
                {turnsData === undefined
                ? emptyTurns
                : <p>Si hay pero no</p>}
            </div>
            <div className="field__button">
                <GreenButton button_name="Agendar cancha" button_func={navigateTo}/>
            </div>
        </div>
    )
}
