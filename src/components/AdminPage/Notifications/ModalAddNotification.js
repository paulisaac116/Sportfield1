import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { months } from '../../../data/CalendarMonths';
import { db } from '../../../firebase';
import { getDate } from '../../../helpers/getDate';
import { GreenButton } from '../../Buttons/GreenButton';
import { PurpleButton } from '../../Buttons/PurpleButton';
import { Message } from '../../Message';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export const ModalAddNotification = ( { isModalVisible, setIsModalVisible, setArrayMessage } ) => {

    const initialValue = { title: '', description: '' };

    const [formErrors, setFormErrors] = useState( {} );
    const [formValues, setFormValues] = useState( initialValue );

    const handleInputChange = ( { target } ) => {
        const { name, value } = target;
        setFormValues( { ...formValues, [name]: value } );
    };

    const hiddeModal = () => {
        setFormErrors( {} );
        setFormValues( initialValue );
        setIsModalVisible( false );
    };

    const handleAddNotification = async () => {


        if ( !formValues.title ) setFormErrors( { title: 'Ingresa un título' } );
        else if ( !formValues.description ) setFormErrors( { description: 'Ingresa una descripción' } );
        else {

            const today = getDate();
            const { title, description } = formValues;
            try {
                await db.collection( 'Notifications' ).add( {
                    title: title,
                    description: description,
                    date: `${today.day} de ${months[today.month]} de ${today.year} - ${today.hour}:${today.minutes <= 9 ? `0${today.minutes}` : today.minutes}`
                } );
                setFormValues( initialValue );
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

        }
    };

    return (
        <div className={`modal animate__animated ${isModalVisible ? 'flex animate__fadeIn' : 'hidden'}`}>
            <div className='modal__content modal__notification'>
                <h1 className='modal__content--title'>Enviar nueva notificación</h1>
                <form className='register__form form' onSubmit={handleAddNotification}>
                    <input
                        name='title'
                        className='input'
                        type='text'
                        placeholder='Titulo'
                        value={formValues.title}
                        onChange={handleInputChange}
                    />
                    {
                        formErrors.title
                            ? <div className='form__errors'>
                                <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                <p className='form__errors--text'>{formErrors.title}</p>
                            </div>
                            : <></>
                    }
                    <textarea
                        name='description'
                        type='text'
                        placeholder='Descripción...'
                        value={formValues.description}
                        onChange={handleInputChange}
                    />
                    {
                        formErrors.description
                            ? <div className='form__errors'>
                                <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                <p className='form__errors--text'>{formErrors.description}</p>
                            </div>
                            : <></>
                    }
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


ModalAddNotification.propTypes = {
    isModalVisible: PropTypes.bool,
    setIsModalVisible: PropTypes.func,
    setArrayMessage: PropTypes.func
};