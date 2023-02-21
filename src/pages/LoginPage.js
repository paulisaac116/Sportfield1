import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from "react-router-dom";
import { GreenButton } from '../components/Buttons/GreenButton';
import { PurpleButton } from '../components/Buttons/PurpleButton';
import { auth } from '../firebase/index';

import '../styles/Login-RegisterPagesStyles/Login-RegisterPages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import sportfield_logo from '../images/sportfield_log.png';
import { useFetchFirestore } from '../hooks/useFetchFirestore';
import { InputPassword } from '../components/InputPassword';
import { ErrorMessage } from '../components/ErrorMessage';

export const LoginPage = () => {

  const navigate = useNavigate();

  const [loginSession, setLoginSession] = useState( false );
  const [adminLogged, setAdminLogged] = useState( false );
  const [adminId, setAdminId] = useState( undefined );

  const [userLogged, setUserLogged] = useState( false );
  const [userId, setUserId] = useState( undefined );

  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState( initialValues );
  const [formErrors, setFormErrors] = useState( {} );

  const [messageInactiveUser, setMessageInactiveUser] = useState( [] );

  const [messages, setMessages] = useState( 0 );


  const handleInputChange = ( e ) => {
    const { name, value } = e.target;
    setFormValues( { ...formValues, [name]: value } );
    setFormErrors( { ...formErrors, [name]: '' } );
  };

  const { data, loading } = useFetchFirestore( 'Users' );
  const { data: admin, loading: loading1 } = useFetchFirestore( 'Admin' );


  const handleSubmit = async ( e ) => {

    e.preventDefault();
    const { email, password } = formValues;
    const errorsObj = validate( formValues );


    if ( Object.keys( errorsObj ).length === 0 ) {

      if ( admin.find( admin => admin.email === email ) ) {

        try {
          const userCredential = await auth.signInWithEmailAndPassword(
            email,
            password
          );

          const user = userCredential.user;
          setAdminLogged( true );
          setLoginSession( true );
          setAdminId( user.uid );
          navigate( "/admin", { state: { adminData: user.uid } } );

        } catch ( error ) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log( error );
          if ( errorCode === 'auth/user-not-found' ) setFormErrors( { ...formErrors, email: 'Email no registrado' } );
          // if ( errorCode === 'auth/wrong-password' && errorMessage === 'The password is invalid or the user does not have a password.' ) setFormErrors( { ...formErrors, password: 'Contraseña errónea' } );
          if ( errorCode === 'auth/wrong-password' ) setFormErrors( { ...formErrors, password: 'Contraseña errónea' } );
          if ( errorCode === 'auth/too-many-requests' ) navigate( '/404' );
        }

      } else if ( data.find( user => user.email === email && user.active === true ) ) {

        try {
          const userCredential = await auth.signInWithEmailAndPassword(
            email,
            password
          );

          // Signed in
          const user = userCredential.user;

          setUserLogged( true );
          setLoginSession( true );
          setUserId( user.uid );
          navigate( "/profile", { state: { userId: user.uid } } );

        } catch ( error ) {
          const errorCode = error.code;
          const errorMessage = error.message;
          // console.log( 'errorMessage: ', error );
          if ( errorCode === 'auth/user-not-found' ) setFormErrors( { ...formErrors, email: 'Email no registrado' } );
          // if ( errorCode === 'auth/wrong-password' && errorMessage === 'The password is invalid or the user does not have a password.' ) setFormErrors( { ...formErrors, password: 'Contraseña errónea' } );
          if ( errorCode === 'auth/wrong-password' ) setFormErrors( { ...formErrors, password: 'Contraseña errónea' } ); if ( errorCode === 'auth/too-many-requests' ) navigate( '/404' );
        }
      } else if ( data.find( user => user.email === email && user.active === false ) ) setMessageInactiveUser( [...messageInactiveUser, <ErrorMessage messageContent='Usuario inactivo. Contáctese con el administrador' />] );

      else setFormErrors( { ...formErrors, email: 'Email no registrado' } );
    } else setFormErrors( errorsObj );


  };


  useEffect( () => {

    if ( adminLogged && loginSession ) navigate( '/admin', { state: { adminId: adminId } } );

  }, [adminLogged, adminId] );

  useEffect( () => {

    if ( userLogged && loginSession ) navigate( '/profile', { state: { userId: userId } } );

  }, [userLogged, userId] );


  useEffect( () => {

    setTimeout( () => {
      while ( messageInactiveUser.length !== 0 ) {
        messageInactiveUser.pop();
      }
    }, 4000 );

  }, [messageInactiveUser] );

  const validate = ( values ) => {

    const errors = {};

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if ( !values.email ) errors.email = 'Ingrese su correo';
    else if ( !regexEmail.test( values.email ) ) errors.email = 'Ingrese un correo de la forma: ejemplo@correo.com';
    if ( !values.password ) errors.password = 'Ingrese su contraseña';

    return errors;

  };


  return (
    !loginSession
      ? <div className="LoginPage">
        <div className="login__content">
          <img className="w-60 md:w-72 lg:w-80" src={sportfield_logo} alt="sportfield logo" />
          <h1 id="title">Inicio de sesión</h1>
          <form className="login__form form" onSubmit={handleSubmit}>
            <div className='input__error--group'>
              <input
                type="email"
                className={`input ${formErrors.email ? 'input__error' : ''}`}
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                placeholder="Correo electrónico"
              />
              {formErrors.email
                ? <div className='form__errors'>
                  <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                  <p className='form__errors--text'>{formErrors.email}</p>
                </div>
                : <></>
              }
            </div>
            <div className='input__error--group'>
              <InputPassword
                extraClass={`${formErrors.password ? 'input__error' : ''}`}
                inputValue={formValues.password}
                onChangeInput={handleInputChange}

              />
              {formErrors.password
                ? <div className='form__errors'>
                  <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                  <p className='form__errors--text'>{formErrors.password}</p>
                </div>
                : <></>
              }
            </div>

            <GreenButton
              button_class='green-button '
              button_name="Aceptar"
              button_func={handleSubmit}
              name='Aceptar'
            />
          </form>
          <div className='login__link'>
            <Link to='/register'>¿No tienes una cuenta?<p>Regístrate</p></Link>
          </div>
        </div>
        {
          messageInactiveUser.map( message => message )
        }
      </div>
      : <div className='bg-purple-mid h-screen'></div>
  );
};
