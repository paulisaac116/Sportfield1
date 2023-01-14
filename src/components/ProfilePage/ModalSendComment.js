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
    };

    const handleSaveComment = async () => {

        if ( !commentData.title ) setFormErrors( { title: 'Ingresa un título' } );
        else if ( !commentData.description ) setFormErrors( { description: 'Ingresa una descripción' } );
        else {
            const { title, description } = commentData;
            try {
                await db.collection( "Comments" ).add( {
                    title: title,
                    description: description,
                    date: `${commentDate.day} de ${months[commentDate.month]} de ${commentDate.year} - ${commentDate.hour}:${commentDate.minutes <= 9 ? `0${commentDate.minutes}` : commentDate.minutes}`,
                    userName: userData.name,
                    userLastName: userData.lastName,
                    userLand: userData.land,
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

        }
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
                                className={`input input__comment-notification ${commentData.title ? 'input__error' : ''}`}
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
                                className={`input input__comment-notification ${commentData.title ? 'input__error' : ''}`}
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
