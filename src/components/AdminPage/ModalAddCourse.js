import React, { useEffect, useState } from 'react';

import { GreenButton } from '../Buttons/GreenButton';
import { PurpleButton } from '../Buttons/PurpleButton';

import '../../styles/AdminPage/adminPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from '../../firebase';

export const ModalAddCourse = ( { isModalVisible, setIsModalVisible, setIsMessageVisible } ) => {

    const initialValues = { title: '', description: '' };
    const [formValues, setFormValues] = useState( initialValues );
    const [formErrors, setFormErrors] = useState( {} );

    const handleInputChange = ( { target } ) => {
        const { name, value } = target;
        setFormValues( { ...formValues, [name]: value } );
    };



    const hiddeModal = () => {
        setFormErrors({})
        setIsModalVisible( false );

    };

    useEffect(() => {
        console.log('errors each time: ', formErrors)
    }, [formErrors])

    const handleAddCourse = async () => {

        
        setFormErrors( validate( formValues ) );
        
        if ( Object.keys( formErrors ).length === 0 ) {
            
            const { title, description } = formValues;

            try {
                console.log('start the try statement')
                await db.collection( 'Courses' ).add( {
                    title,
                    description,
                    registered: []
                } );

                setFormErrors({})
                setFormValues( initialValues );
                setIsModalVisible( false );
                setIsMessageVisible( 'flex slide-in-top' );
                setTimeout( () => setIsMessageVisible( 'flex slide-out-top' ), 2000 );
                setTimeout( () => setIsMessageVisible( 'hidden' ), 3500 );

            } catch ( error ) {
                const errorCode = error.code;
                const errorMesage = error.message;
                console.log( 'errorCode: ', errorCode );
                console.log( 'errorMesagge: ', errorMesage );

            }

        } else console.log('hay errores')

    };

    const validate = ( values ) => {

        const errors = {};
        if ( !values.title ) {
            errors.title = 'Ingresa un título';
        }
        if ( !values.description ) {
            errors.description = 'Ingresa la descripción del curso';
        }
        console.log('errors: ', errors)
        return errors;
    };


    return (
        <div className={`modal ${isModalVisible ? 'flex slide-in-fwd-center' : 'slide-out-bck-center hidden'}`}>
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
