import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';
import {faSquareCaretLeft} from '@fortawesome/free-regular-svg-icons'
// import {faAngry} from '@fortawesome/free-regular-svg-icons'

import sportfield_logo from '../images/sportfield_log.png';

import '../styles/Header.css';
export const HeaderBack = () => {

    const navigate = useNavigate();

    return (
        <header className='header'>
            <img src={sportfield_logo} alt="sportfield logo" className='w-40 sm:w-48 lg:w-60' />
            <nav>
                {/* <a href="/">Notificaciones</a> */}
                {/* <a onClick={handleSignOut} href="/login">Salir</a> */}
                <FontAwesomeIcon
                    icon={faSquareCaretLeft}
                    className='fa-2x back-logo'
                    onClick={() => navigate( -1 )}
                />
            </nav>
        </header>
    );
};
