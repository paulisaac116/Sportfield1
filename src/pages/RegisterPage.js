import React from 'react';
import { GreenButton } from '../components/GreenButton';

import '../styles/Login-RegisterPagesStyles/Login-RegisterPages.css';
import sportfield_logo from '../images/sportfield_log.png';
import { auth, db } from '../firebase';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';

const RegisterPage = () => {

  let history = useHistory();

  const onFinish = async ( name, lastName, email, password, land ) => {

    // console.log(name);
    // console.log(lastName);
    // console.log(email);
    // console.log(password);
    // console.log(land);

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
          name,
          lastName,
          email,
          land
        }
      );
      history.push( '/profile' );
      message.success( 'Usuario registrado exitosamente' );

    }

    catch ( error ) {
      const errorCode = error.code;
      const errorMesage = error.message;
      console.log( 'errorCode: ', errorCode );
      console.log( 'errorMesagge: ', errorMesage );

    }


  };

  return (
    <div className="RegisterPage">
      <div className="content">
        <img className="content__logo" src={sportfield_logo} alt="sportfield logo" />
        <h1 id="title">Registro de nuevo usuario</h1>
        <form className="content__form">
          {/* <div className="content__form--row">
            <label htmlFor="userName">Usuario</label>
            <input
              type="text"
              className="userName"
              id="userName"
              name="userName"
            />
          </div> */}

          <div className="content__form--column">
            <div className='content__form--row'>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                className="name"
                id="name"
                name="name"
                placeholder="Paul"
              />
            </div>
            <div className="content__form--row">
              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                className="lastName"
                id="lastName"
                name="lastName"
                placeholder="Guala"
              />
            </div>
          </div>

          <div className="content__form--row">
            <label htmlFor="land">Número de lote</label>
            <input
              type="number"
              className="land"
              id="land"
              name="land"
              placeholder='100'
            />
          </div>

          <div className="content__form--row">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              className="email"
              id="email"
              name="email"
              placeholder='paulguala@gmail.com'
            />
          </div>

          <div className="content__form--row">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              className="email"
              id="password"
              name="password"
            />
          </div>



        </form>
        <GreenButton
          button_name="Registrarse"
          button_func={() => onFinish(
            document.getElementById( "name" ).value,
            document.getElementById( "lastName" ).value,
            document.getElementById( "email" ).value,
            document.getElementById( "password" ).value,
            document.getElementById( "land" ).value)}
        />
      </div>
    </div>
  );
};

export default RegisterPage;