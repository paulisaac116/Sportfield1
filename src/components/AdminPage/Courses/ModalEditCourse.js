import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

import { GreenButton } from '../../Buttons/GreenButton';
import { PurpleButton } from '../../Buttons/PurpleButton';
// import {RedButton} from '../Buttons/RedButton';

import '../../../styles/AdminPage/adminPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from '../../../firebase';

export const ModalEditCourse = ( { isModalVisible, setIsModalVisible, course, setIsMessageVisible } ) => {

    const [formErrors, setFormErrors] = useState( {} );
    const [formValues, setFormValues] = useState( {} );

    // console.log(data);

    useEffect( () => {
        setFormValues( course );
    }, [course] );

    const validate = ( values ) => {

        const errors = {};
        if ( !values.title ) {
            errors.title = 'Ingresa un título';
        }
        if ( !values.description ) {
            errors.description = 'Ingresa la descripción del curso';
        }
        return errors;
    };

    const handleEditCourse = async () => {

        const { id, title, description } = formValues;

        setFormErrors( validate( formValues ) );

        if ( Object.keys( formErrors ).length === 0 ) {

            try {

                await db.collection( 'Courses' ).doc( id ).update( {
                    title: title,
                    description: description,
                } );

                setFormValues( {} );
                setFormErrors( {} );
                setIsModalVisible( false );
                setIsMessageVisible( 'flex slide-in-top' );
                setTimeout( () => setIsMessageVisible( 'flex slide-out-top' ), 3000 );
                setTimeout( () => setIsMessageVisible( 'hidden' ), 4000 );

            } catch ( error ) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log( errorCode );
                console.log( errorMessage );
            }
        }

    };


    const hiddeModal = () => {
        setFormErrors( {} );
        setIsModalVisible( false );
    };

    const handleInputChange = ( e ) => {
        const { name, value } = e.target;
        setFormValues( { ...formValues, [name]: value } );
    };

    return (
        <div className={`modal ${isModalVisible ? 'flex slide-in-fwd-center' : 'slide-out-bck-center hidden'}`}>
            <div className='modal__content  modal__addCourse'>
                <h1 className='modal__content--title'>Editar curso</h1>
                <div className="register__form form">
                    <div className="register__form--row">
                        <div className='register__form--column input__error--group'>
                            <label htmlFor="title">Título del curso</label>
                            <input
                                type="text"
                                className={`input ${formErrors.title ? 'input__error' : ''}`}
                                name="title"
                                value={formValues.title}
                                placeholder="Volley"
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
                            <label htmlFor="lastName">Descripción</label>
                            <textarea
                                type="text"
                                className={`input text-area ${formErrors.description ? 'input__error' : ''} `}
                                name="description"
                                value={formValues.description}
                                placeholder="Lunes a viernes, en las mañanas"
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
                        button_name='Aceptar'
                        button_func={handleEditCourse}
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
