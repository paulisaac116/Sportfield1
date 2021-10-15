import React from 'react'
import { GreenButton } from '../components/GreenButton'

import '../styles/Login-RegisterPagesStyles/Login-RegisterPages.css'
import sportfield_logo from '../images/sportfield_log.png'

const RegisterPage = () => {
  
  const onFinish = () => {

  }

  return (
    <div className="RegisterPage">
      <div className="content">
                <img className="content__logo" src={sportfield_logo} alt="sportfield logo"/>
                <h1 id="title">Registro de nuevo usuario</h1>
                <form className="content__form">
                    <div className="content__form--row">
                      <label htmlFor="userName">Usuario</label>
                      <input type="text" className="userName" id="userName" name="userName"/>
                    </div>
                    <div className="content__form--row">
                      <label htmlFor="name">Nombre</label>
                      <input type="text" className="name" id="name" name="name"/>
                    </div>
                    <div className="content__form--row">
                      <label htmlFor="lastName">Apellido</label>
                      <input type="text" className="lastName" id="lastName" name="lastName"/>
                    </div>
                    <div className="content__form--row">
                      <label htmlFor="email">Correo electrónico</label>
                      <input type="email" className="email" id="email" name="email"/>
                    </div>

                    <div className="content__form--row">
                      <label htmlFor="password">Contraseña</label>
                      <input type="password" className="email" id="password" name="password"/>
                    </div>

                    <div className="content__form--row">
                      <label htmlFor="land">Número de lote</label>
                      <input type="number" className="land" id="land" name="land"/>
                    </div>

                </form>
                <GreenButton button_name="Registrarse" button_func={() => onFinish()}/>
      </div>
    </div>
  )
}

export default RegisterPage