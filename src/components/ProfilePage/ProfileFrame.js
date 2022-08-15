import React, { useState } from 'react';

import '../../styles/ProfilePage/ProfilePage.css';
import profile_photo from '../../images/dragonball.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { ModalNotificationsUser } from './ModalNotificationsUser';

//import { UserContext } from './UserContext'

export const ProfileFrame = ( { userData } ) => {

    const [isModalNotificationUserVisible, setIsModalNotificationUserVisible] = useState( false );

    const showNotifications = () => {
        // document.getElementById('notification-bell').style.color
        setIsModalNotificationUserVisible(true)

    };
    


    return (
        <div className="profile-frame">
            <div className='profile-frame__head'>
                <p className='profile-frame__head--title'>PERFIL</p>
                <div className='profile-frame__head--notification'>
                    <FontAwesomeIcon
                        icon={faBell}
                        id='notification-bell'
                        className='fa-2x profile-frame__head--bell'
                        onClick={showNotifications}
                    />
                    <ModalNotificationsUser
                        isModalVisible={isModalNotificationUserVisible}
                        setIsModalVisible={setIsModalNotificationUserVisible}
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
