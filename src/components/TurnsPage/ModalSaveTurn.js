import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { hours } from '../../data/CalendarHours';
import { months } from '../../data/CalendarMonths';
import { db } from '../../firebase';
import { GreenButton } from '../Buttons/GreenButton';
import { PurpleButton } from '../Buttons/PurpleButton';
import { getDate } from '../../helpers/getDate';
import { bodyOverflow } from '../../helpers/bodyOverflow';

export const ModalSaveTurn = React.memo( ( { history, isModalVisible, setIsModalVisible, dateData, fieldData, userId } ) => {


    const [userData, setUserData] = useState( [] );
    const today = getDate();
    const navigate = useNavigate();

    const hiddeModal = () => {
        bodyOverflow( 'auto' );
        setIsModalVisible( false );

    };

    const handleSaveTurn = async () => {

        try {

            const turn = db.collection( 'Turns' ).doc();

            await turn.set( {
                id: turn.id,
                active: true,
                name: userData.name,
                lastName: userData.lastName,
                email: userData.email,
                land: userData.land,
                field: {
                    location: fieldData.location,
                    fieldType: fieldData.fieldType,
                    fieldId: fieldData.id
                },
                date: dateData.map( item => ( {
                    year: item.year,
                    month: item.month,
                    date: item.date,
                    day: item.day,
                    timeStart: item.timeStart,
                    timeEnd: item.timeEnd
                } ) )
                ,
                savedIn: {
                    year: today.year,
                    month: today.month,
                    day: today.day,
                    hour: today.hour,
                    minutes: today.minutes,
                    seconds: today.seconds
                }

            } );

            bodyOverflow( 'auto' );
            setIsModalVisible( false );
            navigate( -1 );
            // history.goBack();

        } catch ( error ) {
            const message = error.message;
        }
    };


    useEffect( () => {

        db.collection( "Users" ).doc( userId )
            .onSnapshot( ( doc ) => {
                setUserData( doc.data() );
            } );


        return () => {
            const unsubscribe = db.collection( "Users" )
                .onSnapshot( () => { } );
            unsubscribe();
        };


    }, [userId] );

    return (
        <div className={`modal animate__animated ${isModalVisible ? 'flex animate__fadeIn' : 'hidden'}`}>
            <div className='modal__content'>
                <h1 className='modal__content--title'>Detalle del turno</h1>
                <div className='modal-turn__content'>
                    <div className='modal-turn__field'>


                    </div>
                    <div className='modal-turn__data'>
                        <div className='modal-turn__data--row'>
                            <p>Cancha</p>
                            <p>{fieldData.fieldType}</p>

                        </div>
                        <div className='modal-turn__data--row'>
                            <p>Ubicación</p>
                            <p>{fieldData.location}</p>

                        </div>
                        {
                            dateData.length === 1 || dateData[0]?.date !== dateData[1]?.date
                                ? ( dateData.map( ( day, key ) => (
                                    <>
                                        <div className='modal-turn__data--row date-row' key={key}>
                                            <p>{`Fecha ${dateData.length === 2 ? key + 1 : ''}`}</p>
                                            <p>{`${day.day} ${day.date} de ${months[day.month]}`}</p>

                                        </div>
                                        <div className='modal-turn__data--row' key={key + 1}>
                                            <p>Hora</p>
                                            <p>{`${hours.find( item => item.start === day.timeStart ).timeRange}`}</p>

                                        </div>
                                    </>
                                ) )
                                )
                                : (
                                    <>
                                        <div className='modal-turn__data--row date-row'>
                                            <p>Fecha</p>
                                            <p>{`${dateData[0]?.day} ${dateData[0]?.date} de ${months[dateData[0]?.month]}`}</p>
                                        </div>
                                        {
                                            dateData.map( ( day, key ) => (
                                                <div className='modal-turn__data--row' key={key + 1}>
                                                    <p>{`Hora ${key + 1}`}</p>
                                                    <p>{`${hours.find( item => item.start === day.timeStart )?.timeRange}`}</p>

                                                </div>
                                            ) )
                                        }
                                    </>
                                )

                        }

                    </div>
                </div>
                <div className='modal__buttons'>
                    <GreenButton
                        button_name='Guardar'
                        button_func={handleSaveTurn}
                    />
                    <PurpleButton
                        button_name='Cancelar'
                        button_func={hiddeModal}
                    />
                </div>
            </div>
        </div>
    );
} );
