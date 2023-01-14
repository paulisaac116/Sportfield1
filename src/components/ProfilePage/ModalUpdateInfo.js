import React, { useEffect, useState } from 'react';
import { GreenButton } from '../Buttons/GreenButton';
import { PurpleButton } from '../Buttons/PurpleButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';
import firebase from 'firebase';
import { db } from '../../firebase';
import { Message } from '../Message';

export const ModalUpdateInfo = ( { userData, isModalVisible, setIsModalVisible, setArrayMessage } ) => {

    const { data, loading } = useFetchFirestore( 'Users' );
    const [formValues, setFormValues] = useState( {} );
    const [formErrors, setFormErrors] = useState( {} );


    useEffect( () => {
        const user = data.find( user => user.id === userData?.id );
        setFormValues( { ...user, password: '' } );
    }, [data, userData, isModalVisible] );

    const hiddeModal = () => {
        setFormErrors( {} );
        // setFormValues( userData );
        setIsModalVisible( false );
    };

    const handleInputChange = ( e ) => {
        const { name, value } = e.target;
        setFormValues( { ...formValues, [name]: value } );
        setFormErrors( { ...formErrors, [name]: '' } );
    };

    const handleUpdateInfo = async ( e ) => {
        e.preventDefault();

        let errorsObj = validate( formValues );

        if ( Object.keys( errorsObj ).length === 0 ) {

            try {

                const user = firebase.auth().currentUser;
                const credential = firebase.auth.EmailAuthProvider.credential( userData?.email, formValues.password );

                await user.reauthenticateWithCredential( credential ).then( () => {

                    db.collection( 'Users' ).doc( userData?.id ).update( {
                        name: formValues.name,
                        lastName: formValues.lastName,
                        email: formValues.email,
                        cellphone: formValues.cellphone
                    } );

                    user.updateEmail( formValues.email );

                    setFormValues( {} );
                    setFormErrors( {} );
                    setIsModalVisible( false );
                    setArrayMessage( ( prevState ) => (
                        [
                            ...prevState,
                            <Message
                                messageContent={'Datos actualizados'}
                            />
                        ]
                    ) );

                } ).catch( ( error ) => {

                    setFormErrors( { ...formErrors, password: 'Contraseña incorrecta' } );

                } );

            } catch ( error ) {
                console.log( error );
            }
        }
        else setFormErrors( errorsObj );

    };

    const validate = ( values ) => {

        const errors = {};

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regexText = /^[A-za-z]{3,10}$/m;
        const regexCellphone = /^(09\d{8})$/m;

        if ( !values.name ) errors.name = 'Ingrese su nombre';
        else if ( !regexText.test( values.name ) ) errors.name = 'Ingresa texto entre 3 y 15 caracteres';

        if ( !values.lastName ) errors.lastName = 'Ingrese su apellido';
        else if ( !regexText.test( values.lastName ) ) errors.lastName = 'Ingresa texto entre 3 y 15 caracteres';

        if ( !values.cellphone ) errors.cellphone = 'Ingrese su número de celular';
        else if ( !regexCellphone.test( values.cellphone ) ) errors.cellphone = 'Ingrese un número de celular válido';

        if ( !values.email ) errors.email = 'Ingrese su correo electrónico';
        else if ( !regexEmail.test( values.email ) ) errors.email = 'No es un formato de correo válido';
        else if ( values.email !== userData?.email && data.find( user => user.email === values.email ) ) errors.email = 'El email ya está registrado';

        if ( !values.password ) errors.password = 'Ingrese su contraseña';

        return errors;

    };



    return (
        <div className={`modal animate__animated ${isModalVisible ? 'flex animate__fadeIn' : 'hidden'}`}>
            <div className='modal__content modal__update-info'>
                <h1 className='modal__content--title'>Actualizar información</h1>
                <p className='modal__content--info'>Para actualizar su información y hacer efectivos los cambios, es necesario que valide su contraseña</p>
                <form className="register__form form" onSubmit={handleUpdateInfo}>
                    <div className="register__form--row">
                        <div className='register__form--column input__error--group'>
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                className={`input ${formErrors.name ? 'input__error' : ''}`}
                                name="name"
                                value={formValues?.name}
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
                        <div className='register__form--column input__error--group'>
                            <label htmlFor="lastName">Apellido</label>
                            <input
                                type="text"
                                className={`input ${formErrors.lastName ? 'input__error' : ''}`}
                                name="lastName"
                                value={formValues?.lastName}
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
                        <div className='register__form--column input__error--group'>
                            <label htmlFor="cellphone">Celular</label>
                            <input
                                type="text"
                                className={`input ${formErrors.cellphone ? 'input__error' : ''}`}
                                name="cellphone"
                                value={formValues?.cellphone}
                                placeholder="0987654321"
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
                                className={`input ${formErrors.email ? 'input__error' : ''}`}
                                name="email"
                                value={formValues?.email}
                                placeholder="paulguala@gmail.com"
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
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                className={`input ${formErrors.password ? 'input__error' : ''}`}
                                id="password"
                                name="password"
                                value={formValues?.password}
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
                    </div>

                </form>
                <div className='modal__buttons'>
                    <GreenButton
                        button_name='Enviar'
                        button_func={handleUpdateInfo}
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
