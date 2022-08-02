import React, {useContext} from 'react'
import  {auth} from '../firebase/index'
import {useHistory}  from "react-router-dom";
import { UserContext } from './UserContext';



import sportfield_logo from '../images/sportfield_log.png'

import '../styles/Header.css'
export const HeaderComp = () => {
    
    let history = useHistory()

    const userId = useContext( UserContext );


    const handleSignOut = () => {        
        auth.signOut()
        console.log('usuario sigOut: ', userId)
        history.push("/")
    }


    return (
        <header className='header'>
            <img src={sportfield_logo} alt="sportfield logo" className='w-40 sm:w-48 lg:w-60' />
            <nav>
                {/* <a href="/">Notificaciones</a> */}
                <a onClick={handleSignOut} href="/login">Salir</a>
            </nav>
        </header>
    )
}
