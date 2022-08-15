import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

import { HeaderComp } from '../components/HeaderComp';
import { Menu } from '../components/AdminPage/Menu';

import '../styles/AdminPage/adminPage.css';
import { useNavigate } from 'react-router-dom';

export const AdminPage = ({adminData}) => {

    const [adminSession, setAdminSession] = useState( false );

    let navigation = useNavigate();

    useEffect( () => {

        firebase.auth().onAuthStateChanged( ( user ) => {

            if ( user ) {
                if ( user.email === 'paulgualab@gmail.com' ) {
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
