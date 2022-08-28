import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

import sportfield_logo from '../../images/sportfield_log.png'


const HeaderAdmin = ({setAdminSession}) => {

    const navigate = useNavigate();

    const handleSignOut = () => {
        setAdminSession(false)
        auth.signOut();
        navigate( "/login" );
    };


    return (
        <header className=' header header-admin'>
            <img src={sportfield_logo} alt="sportfield logo" className='w-40 sm:w-48 lg:w-60' />
            <nav>
                {/* <a href="/">Notificaciones</a> */}
                <a onClick={handleSignOut} href="/login">Salir</a>
            </nav>
        </header>
    );
};

export default HeaderAdmin;