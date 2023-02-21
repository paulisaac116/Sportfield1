import React, { useEffect, useState } from 'react';

import { db } from '../../firebase';
import { GreenButton } from '../Buttons/GreenButton';
import { PurpleButton } from '../Buttons/PurpleButton';
import { months } from '../../data/CalendarMonths';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { getDate } from '../../helpers/getDate';
import { bodyOverflow } from '../../helpers/bodyOverflow';
import { Message } from '../Message';

export const ModalSendComment = React.memo( ( { userData, isModalVisible, setIsModalVisible, setArrayMessage } ) => {

    const initialValues = { title: '', description: '' };
    const [commentData, setCommentData] = useState( initialValues );
    const [formErrors, setFormErrors] = useState( {} );
    const [commentDate, setCommentDate] = useState( '' );


    const hiddeModal = () => {
        setFormErrors( {} );
        bodyOverflow( 'auto' );
        setIsModalVisible( false );
    };

    const handleInputChange = ( e ) => {
        const { name, value } = e.target;
        setCommentData( { ...commentData, [name]: value } );
        setFormErrors( { ...formErrors, [name]: '' } );
    };

    const handleSaveComment = async () => {

        let errorsObj = validate( commentData );

        if ( Object.keys( errorsObj ).length === 0 ) {

            const { title, description } = commentData;
            const today = getDate();

            try {
                await db.collection( "Comments" ).add( {
                    title: title,
                    description: description,
                    userName: userData.name,
                    userLastName: userData.lastName,
                    userLand: userData.land,
                    savedIn: {
                        date: today.day,
                        month: today.month,
                        year: today.year,
                        hour: today.hour,
                        minutes: today.minutes,
                        seconds: today.seconds
                    }
                } );

                setCommentData( initialValues );
                setFormErrors( {} );
                setIsModalVisible( false );
                bodyOverflow( 'auto' );
                setArrayMessage( [
                    <Message
                        messageContent={'Comentario enviado al administrador'}
                    />
                ] );

            } catch ( error ) {
                const errorCode = error.code;
                const errorMesage = error.message;
                console.log( 'errorCode: ', errorCode );
                console.log( 'errorMesagge: ', errorMesage );
            }
        } else setFormErrors( errorsObj );

    };


    const validate = ( values ) => {

        const errors = {};

        const regexTitle = /^(?=.{5,50}$)[\w\s.,:¡!¿?()'"ÁÉÍÓÚáéíóúÜüñ-]+$/m;
        const regexDescription = /^(?=.{5,400}$)[\w\s.,:¡!¿?()'"ÁÉÍÓÚáéíóúÜüñ-]+$/m;

        if ( !values.title ) errors.title = 'Ingrese un título';
        else if ( !regexTitle.test( values.title ) ) errors.title = 'Ingrese texto entre 5 y 45 caracteres';

        if ( !values.description ) errors.description = 'Ingese una descripción';
        else if ( !regexDescription.test( values.description ) ) errors.description = 'Ingrese una descripción entre 5 y 200 caracteres';

        return errors;
    };

    useEffect( () => {

        const date = getDate();
        setCommentDate( date );

    }, [isModalVisible] );

    return (

        <div className={`modal animate__animated ${isModalVisible ? 'flex animate__fadeIn' : 'hidden'}`}>
            <div className='modal__content modal__send-comment'>
                <h1 className='modal__content--title'>Enviar comentario</h1>
                <p className='modal__content--info'>Envía tus comentarios al administrador sobre el estado de las canchas,
                    la agenda de un turno o el funcionamiento de la aplicación</p>
                <div className="register__form form">
                    <div className="register__form--row">
                        <div className='register__form--column input__error--group'>
                            <label htmlFor="title">Título</label>
                            <input
                                type="text"
                                className={`input input__comment-notification ${formErrors.title ? 'input__error' : ''}`}
                                name="title"
                                value={commentData.title}
                                placeholder="Esta aplicación va genial"
                                onChange={handleInputChange}
                            />
                            {formErrors.title
                                ? <div className='form__errors'>
                                    <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                    <p className='form__errors--text'>{formErrors.title}</p>
                                </div>
                                : <></>
                            }
                        </div>
                        <div className="register__form--column input__error--group">
                            <label htmlFor="description">Descripción</label>
                            <textarea
                                name="description"
                                className={`input input__comment-notification ${formErrors.description ? 'input__error' : ''}`}
                                value={commentData.description}
                                placeholder="Descripción"
                                autoComplete="off"
                                onChange={handleInputChange}
                            />
                            {formErrors.description
                                ? <div className='form__errors'>
                                    <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                    <p className='form__errors--text'>{formErrors.description}</p>
                                </div>
                                : <></>
                            }
                        </div>
                    </div>

                </div>
                <div className='modal__buttons'>
                    <GreenButton
                        button_name='Enviar'
                        button_func={handleSaveComment}
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
