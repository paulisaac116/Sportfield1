import React, { useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { auth, db } from '../../../firebase';

import { GreenButton } from '../../Buttons/GreenButton';
import { PurpleButton } from '../../Buttons/PurpleButton';

import '../../../styles/AdminPage/AdminPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Message } from '../../Message';
import { useFetchFirestore } from '../../../hooks/useFetchFirestore';

export const ModalAddUser = ( { isModalAddUserVisible, setIsModalAddUserVisible, setArrayMessage } ) => {

    const initialValues = { name: '', lastName: '', land: '', email: '', cellphone: '', password: '' };
    const [formValues, setFormValues] = useState( initialValues );
    const [formErrors, setFormErrors] = useState( {} );

    const { data, loading } = useFetchFirestore( 'Users' );

    const hiddeModal = () => {
        setFormErrors( {} );
        setIsModalAddUserVisible( false );
    };


    const handleSubmit = async ( e ) => {
        e.preventDefault();

        const { name, lastName, land, email, cellphone, password } = formValues;

        let errorsObj = validate( formValues );

        // setFormErrors( validate( formValues ) );

        if ( Object.keys( errorsObj ).length === 0 ) {

            try {
                const userCredential = await auth.createUserWithEmailAndPassword(
                    email,
                    password
                );

                firebase.auth().setPersistence( firebase.auth.Auth.Persistence.NONE );
                // Signed in
                const user = userCredential.user;
                const userId = user.uid;

                await db.collection( "Users" ).doc( userId ).set(
                    {
                        id: userId,
                        active: true,
                        name,
                        lastName,
                        land,
                        cellphone,
                        email,
                    }
                );

                setFormValues( initialValues );
                setFormErrors( {} );
                setIsModalAddUserVisible( false );
                setArrayMessage( ( previusState ) => (
                    [
                        ...previusState,
                        <Message
                            messageContent={'Usuario registrado'}
                        />
                    ]
                ) );
            }

            catch ( error ) {
                const errorCode = error.code;
                if ( errorCode === 'auth/email-already-in-use' ) setFormErrors( { ...formErrors, email: 'El email ya está registrado' } );
            }
        } else setFormErrors( errorsObj );


    };

    const handleInputChange = ( e ) => {
        const { name, value } = e.target;
        setFormValues( { ...formValues, [name]: value } );
    };

    // const validate = ( values ) => {

    //     const errors = {};
    //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //     if ( !values.name ) {
    //         errors.name = 'Ingresa tu nombre';
    //     }
    //     if ( !values.lastName ) {
    //         errors.lastName = 'Ingresa tu apellido';
    //     }
    //     if ( !values.land ) {
    //         errors.land = 'Ingresa tu número de lote';
    //     }
    //     if ( !values.email ) {
    //         errors.email = 'Ingresa tu correo electrónico';
    //     } else if ( !regex.test( values.email ) ) {
    //         errors.email = 'No es un formato de correo válido';
    //     }
    //     if ( !values.password ) {
    //         errors.password = 'Ingresa tu contraseña';
    //     } else if ( values.password.length <= 5 ) errors.password = 'La contraseña debe tener mínino 6 caracteres';
    //     return errors;

    // };


    const validate = ( values ) => {

        const errors = {};

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regexText = /^[A-za-z]{3,10}$/m;
        const regexLand = /^([1-9]|[1-9][0-9]|[1-3][0-5][0-9])$/m;
        const regexCellphone = /^(09\d{8})$/m;


        if ( !values.name ) errors.name = 'Ingrese su nombre';
        else if ( !regexText.test( values.name ) ) errors.name = 'Ingresa texto entre 3 y 15 caracteres';

        if ( !values.lastName ) errors.lastName = 'Ingrese su apellido';
        else if ( !regexText.test( values.lastName ) ) errors.lastName = 'Ingresa texto entre 3 y 15 caracteres';

        if ( !values.land ) errors.land = 'Ingrese su número de lote';
        else if ( !regexLand.test( values.land ) ) errors.land = 'Ingrese un lote entre 1 y 350';
        else if ( data.find( user => user.land === values.land ) ) errors.land = 'Lote ya registrado';

        if ( !values.cellphone ) errors.cellphone = 'Ingrese su número de celular';
        else if ( !regexCellphone.test( values.cellphone ) ) errors.cellphone = 'Ingrese un número de celular válido';

        if ( !values.email ) errors.email = 'Ingrese su correo electrónico';
        else if ( !regexEmail.test( values.email ) ) errors.email = 'No es un formato de correo válido';
        else if ( data.find( user => user.email === values.email ) ) errors.email = 'El email ya está registrado';

        if ( !values.password ) errors.password = 'Ingrese su contraseña';
        else if ( values.password.length <= 5 ) errors.password = 'La contraseña debe tener mínino 6 caracteres';

        return errors;

    };

    return (
        <div className={`modal animate__animated ${isModalAddUserVisible ? 'flex animate__fadeIn' : 'hidden'}`}>
            <div className='modal__content'>
                <h1 className='modal__content--title'>Agregar nuevo morador</h1>
                {/* <form className="register__form form" onSubmit={handleSubmit}>
                    <div className="register__form--row">
                        <div className='register__form--column input__error--group'>
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                className={`input ${formErrors.name ? 'input__error' : ''}`}
                                name="name"
                                value={formValues.name}
                                placeholder="Paul"
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
                        <div className="register__form--column input__error--group">
                            <label htmlFor="lastName">Apellido</label>
                            <input
                                type="text"
                                className={`input ${formErrors.lastName ? 'input__error' : ''}`}
                                name="lastName"
                                value={formValues.lastName}
                                placeholder="Guala"
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
                    </div>

                    <div className="register__form--row input__error--group">
                        <label htmlFor="land">Número de lote</label>
                        <input
                            type="number"
                            className={`input ${formErrors.land ? 'input__error' : ''}`}
                            name="land"
                            value={formValues.land}
                            placeholder='100'
                            onChange={handleInputChange}
                        />
                        {formErrors.land
                            ? <div className='form__errors'>
                                <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                <p className='form__errors--text'>{formErrors.land}</p>
                            </div>
                            : <></>
                        }
                    </div>

                    <div className="register__form--row input__error--group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            className={`input ${formErrors.email ? 'input__error' : ''}`}
                            name="email"
                            value={formValues.email}
                            placeholder='paulguala@gmail.com'
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

                    <div className="register__form--row input__error--group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            className={`input ${formErrors.password ? 'input__error' : ''}`}
                            name="password"
                            value={formValues.password}
                            onChange={handleInputChange}
                        />
                        {formErrors.password
                            ? <div className='form__errors'>
                                <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                <p className='form__errors--text'>{formErrors.password}</p>
                            </div>
                            : <></>
                        }
                    </div>

                </form> */}
                <form className="register__form form" onSubmit={handleSubmit}>
                    <div className="register__form--row">
                        <div className='register__form--column input__error--group'>
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                className={`input ${formErrors.name ? 'input__error' : ''}`}
                                id="name"
                                name="name"
                                value={formValues.name}
                                placeholder="Paul"
                                onChange={handleInputChange}
                                minLength="3"
                                maxLength="15"
                                required
                            />
                            {formErrors.name
                                ? <div className='form__errors'>
                                    <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                    <p className='form__errors--text'>{formErrors.name}</p>
                                </div>
                                : <></>
                            }
                        </div>
                        <div className="register__form--column input__error--group">
                            <label htmlFor="lastName">Apellido</label>
                            <input
                                type="text"
                                className={`input ${formErrors.lastName ? 'input__error' : ''}`}
                                id="lastName"
                                name="lastName"
                                value={formValues.lastName}
                                placeholder="Guala"
                                onChange={handleInputChange}
                                minLength="3"
                                maxLength="15"
                                required
                            />
                            {formErrors.lastName
                                ? <div className='form__errors'>
                                    <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                    <p className='form__errors--text'>{formErrors.lastName}</p>
                                </div>
                                : <></>
                            }
                        </div>
                    </div>

                    <div className="register__form--row input__error--group">
                        <label htmlFor="land">Número de lote</label>
                        <input
                            type="number"
                            className={`input ${formErrors.land ? 'input__error' : ''}`}
                            id="land"
                            name="land"
                            value={formValues.land}
                            placeholder='100'
                            onChange={handleInputChange}
                            min="1"
                            max="359"
                            required
                        />
                        {formErrors.land
                            ? <div className='form__errors'>
                                <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                <p className='form__errors--text'>{formErrors.land}</p>
                            </div>
                            : <></>
                        }
                    </div>

                    <div className="register__form--row input__error--group">
                        <label htmlFor="cellphone">Celular</label>
                        <input
                            type="number"
                            className={`input ${formErrors.cellphone ? 'input__error' : ''}`}
                            id="cellphone"
                            name="cellphone"
                            value={formValues.cellphone}
                            placeholder='0987654321'
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.cellphone
                            ? <div className='form__errors'>
                                <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                <p className='form__errors--text'>{formErrors.cellphone}</p>
                            </div>
                            : <></>
                        }
                    </div>
                    <div className="register__form--row input__error--group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            className={`input ${formErrors.email ? 'input__error' : ''}`}
                            id="email"
                            name="email"
                            value={formValues.email}
                            placeholder='paulguala@gmail.com'
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.email
                            ? <div className='form__errors'>
                                <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                <p className='form__errors--text'>{formErrors.email}</p>
                            </div>
                            : <></>
                        }
                    </div>

                    <div className="register__form--row input__error--group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            className={`input ${formErrors.password ? 'input__error' : ''}`}
                            id="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.password
                            ? <div className='form__errors'>
                                <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                <p className='form__errors--text'>{formErrors.password}</p>
                            </div>
                            : <></>
                        }

                    </div>
                </form>
                <div className='modal__buttons'>
                    <GreenButton
                        button_name='Aceptar'
                        button_func={handleSubmit}
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

ModalAddUser.propTypes = {
    isModalAddUserVisible: PropTypes.bool,
    setIsModalAddUserVisible: PropTypes.func,
    setIsMessageVisible: PropTypes.func
};