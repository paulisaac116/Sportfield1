import React, { useState } from 'react';
import { GreenButton } from '../components/Buttons/GreenButton';

import sportfield_logo from '../images/sportfield_log.png';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/Login-RegisterPagesStyles/Login-RegisterPages.css';

const RegisterPage = () => {

  const initialValues = { name: '', lastName: '', land: '', email: "", password: "" };
  const [formValues, setFormValues] = useState( initialValues );
  const [formErrors, setFormErrors] = useState( {} );

  const handleInputChange = ( e ) => {
    const { name, value } = e.target;
    setFormValues( { ...formValues, [name]: value } );
    setFormErrors({...formErrors, [name]: ''});
  };

  // let history = useHistory();
  const navigate = useNavigate();

  // const handleAddUser = () => {
  //   if(formValues)
  // }

  const handleSubmit = async ( e ) => {
    e.preventDefault();

    const { name, lastName, land, email, password } = formValues;

    setFormErrors( validate( formValues ) );

    if ( Object.keys( formErrors ).length == 0 ) {

      try {
        const userCredential = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        // Signed in
        const user = userCredential.user;
        const userId = user.uid

        await db.collection( "Users" ).doc( userId ).set(
          {
            id: userId,
            name,
            lastName,
            email,
            land,
            courses: []
          }
        );
        navigate( '/profile' );
        // message.success( 'Usuario registrado exitosamente' );

      }

      catch ( error ) {
        const errorCode = error.code;
        const errorMesage = error.message;
        console.log( 'errorCode: ', errorCode );
        console.log( 'errorMesagge: ', errorMesage );
      }
    }
  };

  const validate = ( values ) => {

    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if ( !values.name ) {
      errors.name = 'Ingresa tu nombre';
    }
    if ( !values.lastName ) {
      errors.lastName = 'Ingresa tu apellido';
    }
    if ( !values.land ) {
      errors.land = 'Ingresa tu número de lote';
    }
    if ( !values.email ) {
      errors.email = 'Ingresa tu correo electrónico';
    } else if ( !regex.test( values.email ) ) {
      errors.email = 'No es un formato de correo válido';
    }
    if ( !values.password ) {
      errors.password = 'Ingresa tu contraseña';
    } else if ( values.password.length <= 5 ) errors.password = 'La contraseña debe tener mínino 6 caracteres';
    return errors;

  };

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
              id="email"
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
              id="password"
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

        </form>
        <GreenButton
          button_class='green-button'
          button_name="Registrarse"
          button_func={handleSubmit}
        />
      </div>

      {/* <RegisterForm
        setFormData={setFormValues}

      /> */}
    </div>
  );
};

export default RegisterPage;