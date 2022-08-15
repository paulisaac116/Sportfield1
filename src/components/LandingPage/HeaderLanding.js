import React, { useContext } from 'react';

import sportfield_logo from '../../images/sportfield_log.png';

import '../../styles/LandingPage/landingPage.css';

export const HeaderLanding = () => {

    return (
        <header className='header header__landing'>
            <img src={sportfield_logo} alt="sportfield logo" className='w-40 sm:w-48 lg:w-60' />
            <nav className='landing__nav'>
                <a
                    href='/login'
                    className='link__landing'
                >
                    Iniciar sesión
                </a>
                <a
                    href='/register'
                    className='link__landing'
                >
                    Registrarse
                </a>
            </nav>
        </header>
    );
};
