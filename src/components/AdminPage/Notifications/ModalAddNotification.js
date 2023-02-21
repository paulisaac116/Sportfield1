import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../../firebase';
import { getDate } from '../../../helpers/getDate';

import { PurpleButton } from '../../Buttons/PurpleButton';
import { GreenButton } from '../../Buttons/GreenButton';
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
        setFormErrors( { ...formErrors, [name]: '' } );
    };

    const hiddeModal = () => {
        setFormErrors( {} );
        setFormValues( initialValue );
        setIsModalVisible( false );
    };

    const handleAddNotification = async () => {

        let errorObj = validate( formValues );

        if ( Object.keys( errorObj ).length === 0 ) {

            const today = getDate();
            const { title, description } = formValues;
            try {

                const notification = db.collection( 'Notifications' ).doc();

                await notification.set( {
                    id: notification.id,
                    title: title,
                    description: description,
                    savedIn: {
                        date: today.day,
                        month: today.month,
                        year: today.year,
                        hour: today.hour,
                        minutes: today.minutes,
                        seconds: today.seconds
                    }
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

        else setFormErrors( errorObj );
    };

    const validate = ( values ) => {

        const errors = {};
        const regexTitle = /^(?=.{5,50}$)[\w\s.,:!!¿?()'"ÁÉÍÓÚáéíóúÜüñ-]+$/m;
        const regexDescription = /^(?=.{5,400}$)[\w\s.,:!¿?()'"ÁÉÍÓÚáéíóúÜüñ-]+$/m;

        if ( !values.title ) errors.title = 'Ingrese un título';
        else if ( !regexTitle.test( values.title ) ) errors.title = 'Ingrese texto entre 5 y 45 caracteres';

        if ( !values.description ) errors.description = 'Ingese una descripción';
        else if ( !regexDescription.test( values.description ) ) errors.description = 'Ingrese una descripción entre 5 y 400 caracteres';

        return errors;
    };

    return (
        <div className={`modal animate__animated ${isModalVisible ? 'flex animate__fadeIn' : 'hidden'}`}>
            <div className='modal__content modal__notification'>
                <h1 className='modal__content--title'>Enviar nueva notificación</h1>
                <form className='register__form form' onSubmit={handleAddNotification}>
                    <input
                        name='title'
                        className={`input ${formErrors.title ? 'input__error' : ''}`}
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
                        className={formErrors.title ? 'input__error' : ''}
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