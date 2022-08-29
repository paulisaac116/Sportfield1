import React, { useEffect, useState } from 'react';
import { months } from '../../../data/CalendarMonths';
import { db } from '../../../firebase';
import { getDate } from '../../../helpers/getDate';
import { GreenButton } from '../../Buttons/GreenButton';
import { PurpleButton } from '../../Buttons/PurpleButton';
import { Message } from '../../Message';

export const ModalNotification = ( { isModalVisible, setIsModalVisible, setArrayMessage } ) => {

    const initialValue = { title: '', description: '' };

    const [formErrors, setFormErrors] = useState( {} );
    const [modalData, setModalData] = useState( initialValue );

    const handleInputChange = ( { target } ) => {
        const { name, value } = target;
        setModalData( { ...modalData, [name]: value } );
    };

    const hiddeModal = () => {
        setIsModalVisible( false );
    };

    const validate = ( values ) => {

        const error = {};
        if ( !values.title ) error.title = 'Ingresa un título';
        if ( !values.description ) error.description = 'Ingresa una descripción';

        return error;

    };

    const handleAddNotification = async ( e ) => {
        e.preventDefault();

        const { title, description } = modalData;
        const today = getDate();
        setFormErrors( validate( modalData ) );

        if ( Object.keys( formErrors ).length === 0 ) {

            try {
                await db.collection( 'Notifications' ).add( {
                    title: title,
                    description: description,
                    date: `${today.day} de ${months[today.month]} de ${today.year} - ${today.hour}:${today.minutes <= 9 ? `0${today.minutes}` : today.minutes}`
                } );
                setModalData( initialValue );
                setFormErrors( {} );
                setIsModalVisible( false );
                setArrayMessage( ( prevState ) => (
                    [
                        ...prevState,
                        <Message
                            messageContent={'Notificación creada'}
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

        } else console.log( 'no se pudo man :(' );
    };

    return (
        <div className={`modal ${isModalVisible ? 'flex slide-in-fwd-center' : 'hidden'}`}>
            <div className='modal__content modal__notification'>
                <h1 className='modal__content--title'>Enviar nueva notificación</h1>
                <form className='register__form form' onSubmit={handleAddNotification}>
                    <input
                        name='title'
                        className='input'
                        type='text'
                        placeholder='Titulo'
                        value={modalData.title}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name='description'
                        type='text'
                        placeholder='Descripción...'
                        value={modalData.description}
                        onChange={handleInputChange}

                    />
                </form>
                
                <div className='modal__buttons'>
                    <GreenButton
                        button_name='Enviar'
                        button_func={handleAddNotification}
                    />
                    <PurpleButton
                        button_name='Cancelar'
                        button_func={hiddeModal}
                    />
                </div>
            </div>
        </div>
    );
};
