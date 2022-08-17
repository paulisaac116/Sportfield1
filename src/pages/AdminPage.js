import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

import { HeaderComp } from '../components/HeaderComp';
import { Menu } from '../components/AdminPage/Menu';

import '../styles/AdminPage/adminPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFetchFirestore } from '../hooks/useFetchFirestore';

export const AdminPage = () => {

    const [adminSession, setAdminSession] = useState( false );
    const {data: adminData, loading} = useFetchFirestore('Admin')

    let navigation = useNavigate();
    const location = useLocation()

    useEffect( () => {

        // console.log(location.state.id)
        // if (location.state.id === adminData[0]?.id) setAdminSession(true)
        // else console.log('nel')

        // console.log('useEffect init: ')

        firebase.auth().onAuthStateChanged( ( user ) => {

            if ( user ) {
                if ( user.email === 'paulgualab@gmail.com') {
                    console.log( 'si entro' );
                    setAdminSession( true );
                }
                else navigation( '/login' );
            }
            else navigation( '/login' );
        } );

    }, [] );


    useEffect( () => {

        console.log( 'adminData ', adminData );
    }, [adminData] );

    return (

        adminSession
            ? <div className='admin-page bg-purple-mid'>
                < HeaderComp />
                <Menu />
            </div >
            : <div className='bg-purple-mid h-screen'></div>

    );
};
