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
  const [isModalChangePassVisible, setIsModalChangePassVisible] = useState( false );

  const handleInputChange = ( e ) => {
    const { name, value } = e.target;
    setFormValues( { ...formValues, [name]: value } );
    setFormErrors( { ...formErrors, [name]: '' } );
  };

  const hiddeModal = () => {
    setIsModalChangePassVisible( 'hidden' );
  };

  const { data, loading } = useFetchFirestore( 'Users' );
  const { data: admin, loading: loading1 } = useFetchFirestore( 'Admin' );


  const handleSubmit = async ( e ) => {

    e.preventDefault();
    const { email, password } = formValues;

    if ( admin.find( item => item.email === email ) ) {

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
        console.log( 'errorMessage: ', errorMessage );
        if ( errorCode === 'auth/invalid-email' ) setFormErrors( { ...formErrors, email: 'Ingresa tu correo' } );
        if ( errorCode === 'auth/user-not-found' ) setFormErrors( { ...formErrors, email: 'Usuario no registrado' } );
        if ( errorMessage === 'The password is invalid or the user does not have a password.' && errorCode === 'auth/wrong-password' ) setFormErrors( { ...formErrors, password: 'Ingresa tu contraseña' } );
        if ( errorCode === 'auth/wrong-password' ) setFormErrors( { ...formErrors, password: 'Contraseña errónea' } );
        if ( errorCode === 'auth/too-many-requests' ) navigate( '/404' );
      }

    } else if ( data.find( item => item.email === email ) ) {

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
        // console.log( 'errorMessage: ', errorMessage );
        if ( errorCode === 'auth/invalid-email' ) setFormErrors( { ...formErrors, email: 'Ingresa tu correo' } );
        if ( errorCode === 'auth/user-not-found' ) setFormErrors( { ...formErrors, email: 'Usuario no registrado' } );
        if ( errorMessage === 'The password is invalid or the user does not have a password.' && errorCode === 'auth/wrong-password' ) setFormErrors( { ...formErrors, password: 'Ingresa tu contraseña' } );
        if ( errorCode === 'auth/wrong-password' ) setFormErrors( { ...formErrors, password: 'Contraseña errónea' } );
        if ( errorCode === 'auth/too-many-requests' ) navigate( '/404' );
      }

    } else setFormErrors( { ...formErrors, email: 'Usuario no registrado' } );

  };

  useEffect( () => {

    if ( adminLogged && loginSession ) navigate( '/admin', { state: { adminId: adminId } } );

  }, [adminLogged, adminId] );

  useEffect( () => {

    if ( userLogged && loginSession ) navigate( '/profile', { state: { userId: userId } } );

  }, [userLogged, userId] );


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
              <input
                type="password"
                className={`input ${formErrors.password ? 'input__error' : ''}`}
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
                placeholder="Contraseña"
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

          {/* <div className={`modal ${isModalChangePassVisible ? 'flex slide-in-fwd-center' : 'hidden slide-out-bck-center'}`}>
            <div className='modal__content'>
              <h1 className='modal__content--title'>Agregar nuevo usuario</h1>

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

          </div> */}
        </div>
      </div>
      : <div className='bg-purple-mid h-screen'></div>
  );
};
