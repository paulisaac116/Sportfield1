import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../../firebase';

import { GreenButton } from '../../Buttons/GreenButton';
import { PurpleButton } from '../../Buttons/PurpleButton';
import { Message } from '../../Message';

import '../../../styles/AdminPage/AdminPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export const ModalEditCourse = ( { isModalVisible, setIsModalVisible, course, setArrayMessage } ) => {

    const [formErrors, setFormErrors] = useState( {} );
    const [formValues, setFormValues] = useState( {} );

    const handleEditCourse = async () => {


        if ( !formValues.title ) setFormErrors( { title: 'Ingresa un título' } );
        else if ( !formValues.description ) setFormErrors( { description: 'Ingresa una descripción' } );
        else {

            const { id, title, description } = formValues;

            try {

                await db.collection( 'Courses' ).doc( id ).update( {
                    title: title,
                    description: description,
                } );

                setFormValues( {} );
                setFormErrors( {} );
                setIsModalVisible( false );
                setArrayMessage( ( prevState ) => (
                    [
                        ...prevState,
                        <Message
                            messageContent={'Curso actualizado'}
                        />
                    ]
                ) );


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
        setFormValues( course );
        setIsModalVisible( false );
    };

    const handleInputChange = ( e ) => {
        const { name, value } = e.target;
        setFormValues( { ...formValues, [name]: value } );
    };

    useEffect( () => {
        setFormValues( course );
    }, [course] );


    return (
        <div className={`modal animate__animated ${isModalVisible ? 'flex animate__fadeIn' : 'hidden'}`}>
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

ModalEditCourse.propTypes = {
    course: PropTypes.object,
    isModalVisible: PropTypes.bool,
    setIsModalVisible: PropTypes.func,
    setArrayMessage: PropTypes.func
};
