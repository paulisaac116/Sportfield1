import React, { useEffect, useState } from 'react';

import '../../styles/ProfilePage/ProfilePage.css';
import profile_photo from '../../images/dragonball.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { ModalNotificationsUser } from './ModalNotificationsUser';

//import { UserContext } from './UserContext'

export const ProfileFrame = ( { userData } ) => {

    const [isModalNotificationUserVisible, setIsModalNotificationUserVisible] = useState( false );

    const [bellActive, setBellActive] = useState( false );

    const [notificationData, setNotificationData] = useState([])

    const [notificationNumber, setNotificationNumber] = useState(notificationData.length);


    const showNotifications = () => {
        setBellActive( true );
        setIsModalNotificationUserVisible( true );

        if ( isModalNotificationUserVisible ) {
            setIsModalNotificationUserVisible( false );
            setBellActive( false );
        }


    };

    useEffect(() => {

        setNotificationNumber(notificationData.length - notificationNumber)
        console.log('notification number: ', notificationNumber)


    }, [notificationData, notificationNumber])



    return (
        <div className="profile-frame">
            <div className='profile-frame__head'>
                <p className='profile-frame__head--title'>PERFIL</p>
                <div className='profile-frame__head--notification'>
                    <div className={`profile-frame__head--bell ${bellActive ? 'purple-light' : ''}`}>
                        <FontAwesomeIcon
                            icon={faBell}
                            id='notification-bell'
                            className='fa-2x'
                            onClick={showNotifications}
                        />
                    </div>
                    <ModalNotificationsUser
                        isModalVisible={isModalNotificationUserVisible}
                        setIsModalVisible={setIsModalNotificationUserVisible}
                        setBellActive={setBellActive}
                        setNotificationData={setNotificationData}
                    />
                </div>
            </div>
            <img src={profile_photo} alt="profile logo" className='profile-frame--photo' />
            <div className="profile-frame--data">
                <p><strong>Nombre: </strong>{userData?.name}</p>
                <p><strong>Apellido: </strong>{userData?.lastName}</p>
                {/* <p><strong>Usuario: </strong>{userData.userName}</p> */}

                <p><strong>Correo: </strong>{userData?.email}</p>
                <p><strong>Lote: </strong>{userData?.land}</p>
            </div>

        </div>
    );
};
