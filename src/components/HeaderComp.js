import React from 'react'

import '../styles/Header.css'
import sportfield_logo from '../img/sportfield_log.png'

export const HeaderComp = () => {
    return (
        <header>
            <img src={sportfield_logo} alt="sportfield logo"/>
            <nav>
                <a href="">Notificaciones</a>
                <a href="">Salir</a>
            </nav>
        </header>
    )
}
