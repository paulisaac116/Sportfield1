import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';

import { GreenButton } from '../Buttons/GreenButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryQuarter } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import { db } from '../../firebase';

import '../../styles/ProfilePage/ProfilePage.css';
// import '../../styles/AdminPage/adminPage.css'
import { hours } from '../../data/CalendarHours';
import { months } from '../../data/CalendarMonths';

export const FieldUser = React.memo( ( { userData } ) => {

    const navigate = useNavigate();
    const { data: turnsData, loading } = useFetchFirestore( 'Turns' );
    const [turnsUser, setTurnsUser] = useState( [] );

    const emptyTurns = () => (
        <div className="empty-turn-bar">
            <div className='empty-turn-bar--icon'><FontAwesomeIcon size="2x" icon={faBatteryQuarter} /></div>
            <p>No tienes turnos registrados</p>
            <p>¡Agenda Uno!</p>
        </div>
    );

    const navigateTo = () => {
        navigate( "/turns", {state:{id: userData?.id}});
    };

    useEffect( () => {

        // console.log( 'turnsData: ', turnsData );

        const turnsArray = turnsData.filter( item => item.email === userData.email );
        setTurnsUser( turnsArray );
        // console.log( 'tursUser: ', turnsUser );


    }, [turnsData] );

    return (
        <div className="field__frame">
            <div className="field__title">CANCHAS</div>
            <div className="field__table">
                {
                    loading
                        ? <FontAwesomeIcon icon={faSpinner} className='animate-spin fa-2x text-white' />
                        : turnsUser.length !== 0
                            ? turnsUser.map( ( turn, key ) => (
                                <div className='field__table--row'>
                                    <div className='turnData--row' key={key}>
                                        <p className='turnData__field'>{turn.field?.fieldType} - {turn.field?.location}</p>
                                    </div>

                                    {
                                        Array.isArray( turn.date )
                                            ? turn.date.length === 1 || turn.date[0]?.date !== turn.date[1]?.date
                                                ? turn.date.map( ( date, key ) => (
                                                    <>
                                                        <div className='turnData--row' key={key}>
                                                            <p className='turnData__title'>{`Fecha ${turn.date.length === 2 ? key + 1 : ''}: `}</p>
                                                            <p>{`${date.day} ${date.date} de ${months[date.month]}`}</p>
                                                        </div>
                                                        <div className='turnData--row' key={date.id}>
                                                            <p className='turnData__title'>Hora: </p>
                                                            <p>{`${hours.find( turn => turn.start === date.timeStart ).timeRange}`}</p>
                                                        </div>

                                                    </>
                                                ) )
                                                : <>
                                                    <div className='turnData--row'>
                                                        <p className='turnData__title'>Fecha: </p>
                                                        <p>{`${turn.date[0].day} ${turn.date[0].date} de ${months[turn.date[0].month]}`}</p>
                                                    </div>
                                                    {
                                                        turn?.date.map( ( date, key ) => (
                                                            <div className='turnData--row' key={key}>
                                                                <p className='turnData__title'>{`Hora ${key + 1}: `}</p>
                                                                <p>{`${hours.find( item => item.start === date.timeStart ).timeRange}`}</p>
                                                            </div>
                                                        ) )
                                                    }
                                                </>
                                            : <p key={key}>no is not :c</p>
                                    }
                                </div>
                            ) )


                            : ( emptyTurns() )
                }
            </div>
            <div className="field__button">
                <GreenButton button_name="Agendar turno" button_func={navigateTo} />
            </div>
        </div>
    );
} );
