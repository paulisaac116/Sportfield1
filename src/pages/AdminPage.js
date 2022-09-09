import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Menu } from '../components/AdminPage/Menu';
import HeaderAdmin from '../components/AdminPage/HeaderAdmin';

import '../styles/AdminPage/AdminPage.css';

export const AdminPage = () => {

    const [adminSession, setAdminSession] = useState( false );
    const location = useLocation();
    const navigate = useNavigate();

    useEffect( () => {

        if ( location.state?.adminId !== undefined ) {
            setAdminSession( true );
        }
        else {
            navigate( '/login' );
        }

    }, [] );

    return (

        adminSession
            ? <div className='admin-page bg-purple-mid'>
                <HeaderAdmin
                    setAdminSession={setAdminSession}
                />
                <Menu />
            </div >
            : <div className='bg-purple-mid h-screen'></div>

    );
};
