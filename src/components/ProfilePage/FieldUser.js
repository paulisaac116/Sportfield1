import React, {useContext, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBatteryQuarter } from '@fortawesome/free-solid-svg-icons'
import { db } from '../../firebase'

import '../../styles/ProfilePage/ProfilePage.css';
import { GreenButton } from '../Buttons/GreenButton'

export const FieldUser = React.memo(() => {

    const [turnsData, setTurnsData] = useState(undefined);
    const userId = useContext(UserContext);

    // console.log('documentId: ', userId)

    const emptyTurns = 
        <div className="empty-turn-bar">
            <div className='empty-turn-bar--icon'><FontAwesomeIcon size="2x" icon={faBatteryQuarter} /></div>
            <p>No tienes turnos registrados</p>
            <p>¡Agenda Uno!</p>
        </div>

    useEffect(() => {
        db.collection("Users").doc(userId)
                .onSnapshot((doc) => {
                    setTurnsData(doc.data().turns)
                })
    },[turnsData])
    // added 'documentId' to the array dependencies in the 'useEffect' hook
    // for posible error
    
    const history = useHistory();
    const navigateTo = () => {
        history.push("/turns")
    }

    return (
        <div className="field__frame">
            <div className="field__title">CANCHAS</div>
            <div className="field__table">
                {turnsData === undefined
                ? emptyTurns
                : <p>Si hay pero no</p>}
            </div>
            <div className="field__button">
                <GreenButton button_name="Agendar turno" button_func={navigateTo}/>
            </div>
        </div>
    )
})
