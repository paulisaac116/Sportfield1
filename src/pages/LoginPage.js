import React from 'react';
import { useHistory } from "react-router-dom";
import { GreenButton } from '../components/GreenButton';
import { auth } from '../firebase/index';


import '../styles/Login-RegisterPagesStyles/Login-RegisterPages.css';
import sportfield_logo from '../images/sportfield_log.png';

const LoginPage = () => {

  let history = useHistory();
  const onFinish = async ( email, password ) => {

    // console.log( email );
    // console.log( password );

    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );

      // Signed in
      const user = userCredential.user;
      // console.log( user );
      history.push( "/profile" );

    } catch ( error ) {
      const errorCode = error.code;
      console.log( "errorCode", errorCode );
    }
  };


  return (
    <div className="LoginPage">
      <div className="content">
        <img className="content__logo" src={sportfield_logo} alt="sportfield logo" />
        <h1 id="title">Inicio de sesión</h1>
        <form className="content__form" onSubmit={() => onFinish(
            document.getElementById( "email" ).value,
            document.getElementById( "password" ).value )}>
          <input
            type="email"
            className="email"
            id="email"
            name="email"
            placeholder="Correo electrónico"
          />
          <input
            type="password"
            className="email"
            id="password"
            name="password"
            placeholder="Contraseña"
          />
        </form>
        <GreenButton
          button_name="Aceptar"
          button_func={() => onFinish(
            document.getElementById( "email" ).value,
            document.getElementById( "password" ).value )}
        />
        <p>¿No tienes una cuenta? Regístrate <a href="/register">AQUÍ</a></p>
      </div>
    </div>
  );
};

export default LoginPage;