import React, { useState } from 'react';
import { auth } from '../firebase/index';
import { useNavigate } from "react-router-dom";

import '../styles/Header.css';
import sportfield_logo from '../images/sportfield_log.png';
import { ModalNotificationsUser } from './ProfilePage/ModalNotificationsUser';

export const HeaderComp = () => {

    const navigate = useNavigate();

    const [isModalNotificationUserVisible, setIsModalNotificationUserVisible] = useState( false );

    const [newNotificationsNumber, setNewNotificationsNumber] = useState( 0 );
    const [isNewNotificationsNumberVisible, setIsNewNotificationsNumberVisible] = useState( false );


    const showNotifications = () => {
        setIsNewNotificationsNumberVisible( false );
        setIsModalNotificationUserVisible( !isModalNotificationUserVisible );
        setNewNotificationsNumber( 1 );
    };

    const handleSignOut = () => {
        auth.signOut();
        navigate( "/login" );
    };


    return (
        <header className='header header-profile'>
            <img src={sportfield_logo} alt="sportfield logo" className='w-40 sm:w-48 lg:w-60' />
            <nav className='header-profile__nav'>
                <p
                    onClick={showNotifications}
                    className='header-profile__nav--notif'
                >
                    Notificaciones
                </p>
                <div className={`number ${newNotificationsNumber <= 1 || !isNewNotificationsNumberVisible || isModalNotificationUserVisible ? 'hidden' : 'flex'}`}>
                    <span>{newNotificationsNumber - 1}</span>
                </div>
                <a onClick={handleSignOut} href="/login">Salir</a>
            </nav>
            <ModalNotificationsUser
                isModalVisible={isModalNotificationUserVisible}
                setIsModalVisible={setIsModalNotificationUserVisible}
                setNumber={setNewNotificationsNumber}
                number={newNotificationsNumber}
                setNotificationNumber={setIsNewNotificationsNumberVisible}
            />
        </header>
    );
};
