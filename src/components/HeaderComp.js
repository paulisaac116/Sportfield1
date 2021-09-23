import React from 'react'
import  {auth} from '../firebase/index'
import {useHistory}  from "react-router-dom";


import sportfield_logo from '../images/sportfield_log.png'

import '../styles/Header.css'
export const HeaderComp = () => {
    
    let history = useHistory()

    const handleSignOut = () => {        
        auth.signOut()
        history.push("/")
    }


    return (
        <header>
            <img src={sportfield_logo} alt="sportfield logo"/>
            <nav>
                <a href="/">Notificaciones</a>
                <a onClick={handleSignOut} href="/login">Salir</a>
            </nav>
        </header>
    )
}
