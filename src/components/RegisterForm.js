import React, { useEffect, useState } from 'react';
import { useFetchFirestore } from '../hooks/useFetchFirestore';
import { auth, db } from '../firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import '../styles/Login-RegisterPagesStyles/Login-RegisterPages.css';

export const RegisterForm = ( { setStatus, buttonPushed, setUserId } ) => {

    const { data, loading } = useFetchFirestore( 'Users' );

    const initialValues = { name: '', lastName: '', land: '', email: '', cellphone: '', password: '' };
    const [formValues, setFormValues] = useState( initialValues );
    const [formErrors, setFormErrors] = useState( {} );

    const handleInputChange = ( e ) => {
        const { name, value } = e.target;
        setFormValues( { ...formValues, [name]: value } );
        setFormErrors( { ...formErrors, [name]: '' } );
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        const { name, lastName, land, email, cellphone, password } = formValues;
        let errorsObj = validate( formValues );

        if ( Object.keys( errorsObj ).length === 0 ) {

            try {
                const userCredential = await auth.createUserWithEmailAndPassword(
                    email,
                    password
                );

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
                        courses: []
                    }
                );
                // navigate( '/profile', { state: { userId: user.uid } } );
                setUserId( user.uid );
                setStatus( true );

            }

            catch ( error ) {
                const errorCode = error.code;
                if ( errorCode === 'auth/email-already-in-use' ) setFormErrors( { ...formErrors, email: 'El email ya est?? registrado' } );
            }
        } else setFormErrors( errorsObj );

    };

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

        if ( !values.land ) errors.land = 'Ingrese su n??mero de lote';
        else if ( !regexLand.test( values.land ) ) errors.land = 'Ingrese un lote entre 1 y 350';
        else if ( data.find( user => user.land === values.land ) ) errors.land = 'Lote ya registrado';

        if ( !values.cellphone ) errors.cellphone = 'Ingrese su n??mero de celular';
        else if ( !regexCellphone.test( values.cellphone ) ) errors.cellphone = 'Ingrese un n??mero de celular v??lido';

        if ( !values.email ) errors.email = 'Ingrese su correo electr??nico';
        else if ( !regexEmail.test( values.email ) ) errors.email = 'No es un formato de correo v??lido';
        else if ( data.find( user => user.email === values.email ) ) errors.email = 'El email ya est?? registrado';

        if ( !values.password ) errors.password = 'Ingrese su contrase??a';
        else if ( values.password.length <= 5 ) errors.password = 'La contrase??a debe tener m??nino 6 caracteres';

        return errors;

    };


    useEffect( () => {

        handleSubmit();
        console.log( 'button pushed: ', buttonPushed );

    }, [buttonPushed] );


    return (
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
                <label htmlFor="land">N??mero de lote</label>
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
                <label htmlFor="email">Correo electr??nico</label>
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
                <label htmlFor="password">Contrase??a</label>
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
    );
};
