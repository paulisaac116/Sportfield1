import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import firebase from 'firebase';

import { HeaderComp } from '../components/HeaderComp';
import { Menu } from '../components/AdminPage/Menu';

import '../styles/AdminPage/adminPage.css';
import { useFetchFirestore } from '../hooks/useFetchFirestore';
import HeaderAdmin from '../components/AdminPage/HeaderAdmin';

export const AdminPage = () => {

    const [adminSession, setAdminSession] = useState( false );
    const { data: adminData, loading } = useFetchFirestore( 'Admin' );

    const location = useLocation();
    const navigate = useNavigate();

    useEffect( () => {

        if ( location.state?.adminData !== undefined ) {
            setAdminSession( true );
            console.log( 'Admin data from login: ', location.state.adminData );
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
