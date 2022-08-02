import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

import { GreenButton } from '../Buttons/GreenButton';
import { PurpleButton } from '../Buttons/PurpleButton';
// import {RedButton} from '../Buttons/RedButton';

import '../../styles/AdminPage/adminPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from '../../firebase';

export const ModalEditUser = ( { isModalVisible, setIsModalVisible, data, setIsMessageEditUserVisible, setIsMessageSendEmail } ) => {

    const [formErrors, setFormErrors] = useState( {} );
    const [formValues, setFormValues] = useState( {} );

    // console.log(data);

    useEffect( () => {
        setFormValues( data );
    }, [data] );

    const validate = ( values ) => {

        const errors = {};
        if ( !values.name ) errors.name = 'Ingresa tu nombre';
        if ( !values.lastName ) errors.lastName = 'Ingresa tu apellido';
        if ( !values.land ) errors.land = 'Ingresa tu número de lote';
        return errors;

    };

    const handleEditUser = async () => {

        const { id, name, lastName, land } = formValues;

        setFormErrors( validate( formValues ) );

        if ( Object.keys( formErrors ).length === 0 ) {

            try {

                await db.collection( 'Users' ).doc( formValues.id ).update( {
                    name: name,
                    lastName: lastName,
                    land: land,
                } );

                setFormValues( {} );
                setFormErrors( {} );
                setIsModalVisible( false );
                setIsMessageEditUserVisible( 'flex slide-in-top' );
                setTimeout( () => setIsMessageEditUserVisible( 'flex slide-out-top' ), 3000 );
                setTimeout( () => setIsMessageEditUserVisible( 'hidden' ), 4000 );

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

    // const handleChangeEmail = async () => {

    //         // const user = firebase.
    //         // const user = 

    //         try {
    //             const emailSended = await auth.sendSignInLinkToEmail(formValues.email)
    //         } catch (error) {

    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log( errorCode );
    //             console.log( errorMessage );


    //         }
    //         // console.log('user logged: ', user)

    //         // await firebase.auth().updateCurrentUser();
    //         // setFormValues( {} );
    //         // setFormErrors( {} );
    //         // setIsModalVisible( false );
    //         // setIsMessageSendEmail( 'flex slide-in-top' );
    //         // setTimeout( () => setIsMessageSendEmail( 'flex slide-out-top' ), 3000 );
    //         // setTimeout( () => setIsMessageSendEmail( 'hidden' ), 4000 );


       

    // };

    const handleChangePassword = async () => {

        try {

            await firebase.auth().sendPasswordResetEmail( formValues.email );
            setFormValues( {} );
            setFormErrors( {} );
            setIsModalVisible( false );
            setIsMessageSendEmail( 'flex slide-in-top' );
            setTimeout( () => setIsMessageSendEmail( 'flex slide-out-top' ), 3000 );
            setTimeout( () => setIsMessageSendEmail( 'hidden' ), 4000 );


        } catch ( error ) {
            const errorCode = error.code;
            const errorMesage = error.message;
            console.log( 'errorCode: ', errorCode );
            console.log( 'errorMesagge: ', errorMesage );

        }

    };




    return (
        <div className={`modal ${isModalVisible ? 'flex slide-in-fwd-center' : 'slide-out-bck-center hidden'}`}>
            <div className='modal__content'>
                <h1 className='modal__content--title'>Editar datos de usuario</h1>
                <div className="register__form form">
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

                    <div className="register__form--column input__error--group">
                        <label htmlFor="land">Número de lote</label>
                        <input
                            type="number"
                            className={`input ${formErrors.land ? 'input__error' : ''}`}
                            id="land"
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

                    {/* <div className="register__form--row input__error--group">
                        <label htmlFor="email">Correo electrónico</label>
                        <GreenButton
                            button_name={'Enviar correo'}
                            button_func={handleChangeEmail}
                        />
                    </div> */}


                    <div className="register__form--row input__error--group">
                        <label htmlFor="password">Nueva Contraseña</label>
                        <GreenButton
                            button_name={'Enviar correo'}
                            button_func={handleChangePassword}
                        />
                    </div>

                </div>
                <div className='modal__buttons'>
                    <GreenButton
                        button_name='Aceptar'
                        button_func={handleEditUser}
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
