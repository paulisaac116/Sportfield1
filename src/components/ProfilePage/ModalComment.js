import React, { useEffect, useState } from 'react';

import { db } from '../../firebase';
import { GreenButton } from '../Buttons/GreenButton';
import { PurpleButton } from '../Buttons/PurpleButton';
import { months } from '../../data/CalendarMonths';

import '../../styles/ProfilePage/ModalComment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { getDate } from '../../helpers/getDate';

export const ModalComment = React.memo(( { userName, userLastName, userLand, isModalVisible, setIsModalVisible, setIsMessageVisible} ) => {

    const initialValues = { title: '', description: '' };
    const [commentData, setCommentData] = useState( initialValues );
    const [formErrors, setFormErrors] = useState( {} );
    const [commentDate, setCommentDate] = useState('');

    
    
    useEffect(() => {
        
        console.log('useEffect started')
        const date = getDate();

        setCommentDate(date)
    }, [isModalVisible])


    const hiddeModal = () => {
        setFormErrors( {} );
        setIsModalVisible( false );
    };

    const handleInputChange = ( e ) => {
        const { name, value } = e.target;
        setCommentData( { ...commentData, [name]: value } );
    };

    const handleSaveComment = async () => {

        const { title, description } = commentData;

        setFormErrors( validate( commentData ) );

        if ( Object.keys( formErrors ).length === 0 ) {

            try {
                await db.collection( "Comments" ).add( {
                    title: title,
                    description: description,
                    date: `${commentDate.day} de ${months[commentDate.month]} de ${commentDate.year} - ${commentDate.hour}:${commentDate.minutes <= 9 ? `0${commentDate.minutes}` : commentDate.minutes}`,
                    userName: userName,
                    userLastName: userLastName,
                    userLand: userLand,
                } );
                // console.log( 'Comentario registrado con éxito' );

            } catch ( error ) {
                const errorCode = error.code;
                const errorMesage = error.message;
                console.log( 'errorCode: ', errorCode );
                console.log( 'errorMesagge: ', errorMesage );
            }

            setCommentData( initialValues );
            setFormErrors( {} );
            setIsModalVisible( false );
            setIsMessageVisible( 'flex slide-in-top' );
            setTimeout( () => setIsMessageVisible( 'flex slide-out-top' ), 3000 );
            setTimeout( () => setIsMessageVisible( 'hidden' ), 4000 );

        }


    };

    const validate = ( values ) => {

        const errors = {};
        if ( !values.title ) {
            errors.title = 'Ingresa un título';
        }
        if ( !values.description ) {
            errors.description = 'Ingresa tu comentario';
        }

        return errors;

    };


    return (

        <div className={`modal ${isModalVisible ? 'flex slide-in-fwd-center' : 'hidden slide-out-bck-center'}`}>
            <div className='modal__content'>
                <h1 className='modal__content--title'>Enviar comentario</h1>
                <p className='modal__content--info'>Envíanos tus comentarios, opiniones o reclamos sobre el estado de las canchas,
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
});
