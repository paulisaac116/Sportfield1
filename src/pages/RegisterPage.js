import React, { useEffect, useState } from 'react';
import { GreenButton } from '../components/Buttons/GreenButton';

import sportfield_logo from '../images/sportfield_log.png';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/Login-RegisterPagesStyles/Login-RegisterPages.css';
import { useFetchFirestore } from '../hooks/useFetchFirestore';
// import { RegisterForm } from '../components/RegisterForm';

const RegisterPage = () => {

  const { data, loading } = useFetchFirestore( 'Users' );
  const initialValues = { name: '', lastName: '', land: '', email: '', cellphone: '', password: '' };
  const [formValues, setFormValues] = useState( initialValues );
  const [formErrors, setFormErrors] = useState( {} );

  const [buttonPushed, setButtonPushed] = useState( false );
  // const [status, setStatus] = useState( false );
  // const [userId, setUserId] = useState( '' );

  // let initial = true

  const handleInputChange = ( e ) => {
    const { name, value } = e.target;
    setFormValues( { ...formValues, [name]: value } );
    setFormErrors( { ...formErrors, [name]: '' } );
  };

  const navigate = useNavigate();

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
            email
          }
        );
        navigate( '/profile', { state: { userId: user.uid } } );

      }

      catch ( error ) {
        const errorCode = error.code;
        if ( errorCode === 'auth/email-already-in-use' ) setFormErrors( { ...formErrors, email: 'El email ya está registrado' } );
      }
    } else setFormErrors( errorsObj );

  };

  // const handleSubmit = () => {
  //   setButtonPushed( !buttonPushed );
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

  // useEffect( () => {

  //   if ( status ) navigate( '/profile', { state: { userId: userId } } );

  // }, [status, userId] );

  return (
    <div className="RegisterPage">
      <div className="content">
        <img className="content__logo w-60 sm:w-64 md:w-72 lg:w-80" src={sportfield_logo} alt="sportfield logo" />
        <h1 id="title">Registro de nuevo usuario</h1>
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
        {/* <RegisterForm
          setStatus={setStatus}
          buttonPushed={buttonPushed}
          setUserId={setUserId}
        /> */}
        <GreenButton
          button_class='green-button'
          button_name="Registrarse"
          button_func={handleSubmit}
        />
      </div>
    </div>
  );
};

export default RegisterPage;