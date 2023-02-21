import React from 'react';
import PropTypes from 'prop-types';
import { db } from '../../../firebase';

import { PurpleButton } from '../../Buttons/PurpleButton';
import { RedButton } from '../../Buttons/RedButton';
import { Message } from '../../Message';

import { months } from '../../../data/CalendarMonths';
import { hours } from '../../../data/CalendarHours';

export const ModalDeleteTurn = ( { turn, isModalVisible, setIsModalVisible, setArrayMessage } ) => {

    const hiddeModal = () => {
        setIsModalVisible( false );
    };

    const handleEndTurn = async ( id ) => {

        try {
            await db.collection( 'Turns' ).doc( id ).update( {
                active: false
            } );
            setIsModalVisible( false );
            setArrayMessage( ( prevState ) => (
                [
                    ...prevState,
                    <Message
                        messageContent={'Turno finalizado'}
                    />
                ]
            ) );

        }
        catch ( error ) {
            const errorCode = error.code;
            const errorMesage = error.message;
            console.log( 'errorCode: ', errorCode );
            console.log( 'errorMesagge: ', errorMesage );
        }
    };


    return (
        <div className={`modal animate__animated ${isModalVisible ? 'flex animate__fadeIn' : 'hidden'}`}>
            <div className='modal__content modal-delete-turn'>
                <h1 className='modal__content--title'>Finalizar turno</h1>
                <p className='modal__deleteUser--text'>Está a punto de finalizar el agendamiento del siguiente turno:</p>
                <div className='modal__deleteUser--userData'>
                    <div className='userData--row'>
                        <p className='userData__title'>Morador: </p>
                        <p>{`${turn.name} ${turn.lastName}`}</p>
                    </div>
                    <div className='userData--row'>
                        <p className='userData__title'>Cancha:</p>
                        <p>{turn.field?.fieldType} {turn.field?.fieldId} - {turn.field?.location}</p>
                    </div>
                    {Array.isArray( turn.date )
                        ? turn.date.length === 1 || turn.date[0]?.date !== turn.date[1]?.date
                            ? turn.date.map( ( date, key ) => (
                                <>
                                    <div className='userData--row' key={key}>
                                        <p className='userData__title'>{`Fecha ${turn.date.length === 2 ? key + 1 : ''}:`}</p>
                                        <p>{`${date.day} ${date.date} de ${months[date.month]}`}</p>
                                    </div>
                                    <div className='userData--row'>
                                        <p className='userData__title'>Hora: </p>
                                        <p>{`${hours.find( turn => turn.start === date.timeStart ).timeRange}`}</p>
                                    </div>

                                </>
                            ) )
                            : <>
                                <div className='userData--row'>
                                    <p className='userData__title'>Fecha:</p>
                                    <p>{`${turn.date[0].day} ${turn.date[0].date} de ${months[turn.date[0].month]}`}</p>
                                </div>
                                {
                                    turn?.date.map( ( date, key ) => (
                                        <div className='userData--row'>
                                            <p className='userData__title'>{`Hora ${key + 1}:`}</p>
                                            <p>{`${hours.find( item => item.start === date.timeStart ).timeRange}`}</p>
                                        </div>
                                    ) )
                                }
                            </>
                        : <p>no is not :c</p>
                    }

                </div>

                <p className='modal__deleteUser--text'>¿Desea continuar?</p>

                <div className='modal__buttons'>
                    <PurpleButton
                        button_name='Cancelar'
                        button_func={hiddeModal}
                    />
                    <RedButton
                        button_name='Finalizar'
                        button_func={() => handleEndTurn( turn.id )}
                    />

                </div>
            </div>
        </div >
    );
};

ModalDeleteTurn.propTypes = {
    turn: PropTypes.object,
    isModalVisible: PropTypes.bool,
    setIsModalVisible: PropTypes.func,
    setArrayMessage: PropTypes.func,
};