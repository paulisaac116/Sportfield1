import React, { useEffect, useState } from 'react';
import { GreenButton } from '../Buttons/GreenButton';
import { PurpleButton } from '../Buttons/PurpleButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export const ModalUpdateInfo = ( { userData, isModalVisible, setIsModalVisible } ) => {


    const [formValues, setFormValues] = useState( {} );
    const [formErrors, setFormErrors] = useState( {} );

    const hiddeModal = () => {
        setFormErrors( {} );
        // setFormValues( course );
        setIsModalVisible( false );
    };


    const handleInputChange = ( e ) => {
        const { name, value } = e.target;
        setFormValues( { ...formValues, [name]: value } );
    };

    useEffect( () => {
        setFormValues( userData );
    }, [userData] );


    return (
        <div className={`modal animate__animated ${isModalVisible ? 'flex animate__fadeIn' : 'hidden'}`}>
            <div className='modal__content'>
                <h1 className='modal__content--title'>Actualizar información</h1>
                {/* <p className='modal__content--info'>Envía tus comentarios al administrador sobre el estado de las canchas, */}
                {/* la agenda de un turno o el funcionamiento de la aplicación</p> */}
                <div className="register__form form">
                    <div className="register__form--row">
                        <div className='register__form--column input__error--group'>
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                className={`input ${formValues?.name ? 'input__error' : ''}`}
                                name="name"
                                value={formValues?.name}
                                placeholder="Esta aplicación va genial"
                                onChange={handleInputChange}
                            />
                            {formErrors.name
                                ? <div className='form__errors'>
                                    <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                    <p className='form__errors--text'>{formErrors.name}</p>
                                </div>
                                : <></>
                            }
                        </div>
                        <div className='register__form--column input__error--group'>
                            <label htmlFor="lastName">Apellido</label>
                            <input
                                type="text"
                                className={`input ${formValues?.lastName ? 'input__error' : ''}`}
                                name="lastName"
                                value={formValues?.lastName}
                                placeholder="Esta aplicación va genial"
                                onChange={handleInputChange}
                            />
                            {formErrors.lastName
                                ? <div className='form__errors'>
                                    <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                    <p className='form__errors--text'>{formErrors.lastName}</p>
                                </div>
                                : <></>
                            }
                        </div>
                        <div className='register__form--column input__error--group'>
                            <label htmlFor="cellphone">Celular</label>
                            <input
                                type="text"
                                className={`input ${formValues?.cellphone ? 'input__error' : ''}`}
                                name="cellphone"
                                value={formValues?.cellphone}
                                placeholder="Esta aplicación va genial"
                                onChange={handleInputChange}
                            />
                            {formErrors.cellphone
                                ? <div className='form__errors'>
                                    <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                    <p className='form__errors--text'>{formErrors.cellphone}</p>
                                </div>
                                : <></>
                            }
                        </div>
                        <div className='register__form--column input__error--group'>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className={`input ${formValues?.email ? 'input__error' : ''}`}
                                name="email"
                                value={formValues?.email}
                                placeholder="Esta aplicación va genial"
                                onChange={handleInputChange}
                            />
                            {formErrors.email
                                ? <div className='form__errors'>
                                    <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                    <p className='form__errors--text'>{formErrors.email}</p>
                                </div>
                                : <></>
                            }
                        </div>

                        <div className="register__form--column input__error--group">
                            <label htmlFor="description">Contraseña</label>
                            <input
                                type="password"
                                className={`input ${formErrors.password ? 'input__error' : ''}`}
                                id="password"
                                name="password"
                                // value={formValues.password}
                                onChange={handleInputChange}
                                required
                            />
                            {formErrors.password
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
                    // button_func={handleSaveComment}
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
