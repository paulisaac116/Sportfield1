import React, { useState } from 'react';
import { db } from '../../../firebase';
import PropTypes from 'prop-types';

import { GreenButton } from '../../Buttons/GreenButton';
import { PurpleButton } from '../../Buttons/PurpleButton';
import { Message } from '../../Message';

import '../../../styles/AdminPage/AdminPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export const ModalAddCourse = ( { isModalVisible, setIsModalVisible, setArrayMessage } ) => {

    const initialValues = { title: '', description: '' };
    const [formValues, setFormValues] = useState( initialValues );
    const [formErrors, setFormErrors] = useState( {} );

    const hiddeModal = () => {
        setFormValues( initialValues );
        setFormErrors( {} );
        setIsModalVisible( false );

    };

    const handleAddCourse = async () => {

        if ( !formValues.title ) setFormErrors( { title: 'Ingresa un título' } );
        else if ( !formValues.description ) setFormErrors( { description: 'Ingresa una descripción' } );
        else {

            const { title, description } = formValues;

            try {
                await db.collection( 'Courses' ).add( {
                    title,
                    description,
                    registered: []
                } );

                setFormErrors( {} );
                setFormValues( initialValues );
                setIsModalVisible( false );
                setArrayMessage( ( prevState ) => (
                    [
                        ...prevState,
                        <Message
                            messageContent={'Curso registrado'}
                        />
                    ]
                ) );

            } catch ( error ) {
                const errorCode = error.code;
                const errorMesage = error.message;
                console.log( 'contact with the provider' );
                // console.log( 'errorCode: ', errorCode );
                // console.log( 'errorMesagge: ', errorMesage );

            }
        }

    };

    const handleInputChange = ( { target } ) => {
        const { name, value } = target;
        setFormValues( { ...formValues, [name]: value } );
    };


    return (
        <div className={`modal animate__animated ${isModalVisible ? 'flex animate__fadeIn' : 'hidden'}`}>
            <div className='modal__content  modal__addCourse'>
                <h1 className='modal__content--title'>Agregar nuevo curso</h1>
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
                        button_func={handleAddCourse}
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

ModalAddCourse.propTypes = {
    isModalVisible: PropTypes.bool,
    setIsModalVisible: PropTypes.func,
    setArrayMessage: PropTypes.func
};

