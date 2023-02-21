import React, { useEffect, useState } from 'react';

import { ModalNotificationsUser } from './ModalNotificationsUser';
import { GreenButton } from '../Buttons/GreenButton';

import '../../styles/ProfilePage/ProfilePage.css';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import profile_photo from '../../images/dragonball.png';
import { ModalSendComment } from './ModalSendComment';
import { bodyOverflow } from '../../helpers/bodyOverflow';
import { ModalUpdateInfo } from './ModalUpdateInfo';

export const ProfileFrame = ( { userData } ) => {

    const [isModalNotificationUserVisible, setIsModalNotificationUserVisible] = useState( false );

    const [bellActive, setBellActive] = useState( false );

    const [notificationData, setNotificationData] = useState( [] );

    const [notificationNumber, setNotificationNumber] = useState( notificationData.length );

    const [isModalAddCommentVisible, setIsModalAddCommentVisible] = useState( false );
    const [isModalUpdateInfoVisible, setIsModalUpdateInfoVisible] = useState( false );

    const [arrayMessageSendComment, setArrayMessageSendComment] = useState( [] );
    const [arrayMessageUpdateInfo, setArrayMessageUpdateInfo] = useState( [] );

    function showUpdateInfoModal() {
        setIsModalUpdateInfoVisible( true );
    }

    const showNotifications = () => {
        setBellActive( true );
        setIsModalNotificationUserVisible( true );

        if ( isModalNotificationUserVisible ) {
            setIsModalNotificationUserVisible( false );
            setBellActive( false );
        }

    };

    const showSendCommentModal = () => {
        bodyOverflow( 'hidden' );
        setIsModalAddCommentVisible( true );

    };

    useEffect( () => {

        setNotificationNumber( notificationData.length - notificationNumber );

    }, [notificationData, notificationNumber] );

    // useEffect( () => {

    //     setTimeout( () => {
    //         while ( arrayMessageSendComment.length !== 0 ) {
    //             arrayMessageSendComment.pop();
    //         }
    //     }, 4000 );

    // }, [arrayMessageSendComment] );

    return (
        <div className="profile-frame">
            <div className='profile-frame__head'>
                <p className='profile-frame__head--title'>MORADOR</p>
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
            <div className="profile-frame__data">
                <p><strong>Nombre: </strong>{userData?.name} {userData?.lastName}</p>
                <p><strong>Celular: </strong>{userData?.cellphone}</p>
                <p><strong>Correo: </strong>{userData?.email}</p>
                <p><strong>Lote: </strong>{userData?.land}</p>
            </div>
            <div className='profile-frame__buttons'>
                <GreenButton
                    button_name='Actualizar información'
                    button_func={showUpdateInfoModal}
                />
                <GreenButton
                    button_name='Enviar comentario'
                    button_func={showSendCommentModal}
                />
            </div>
            <ModalSendComment
                userData={userData}
                isModalVisible={isModalAddCommentVisible}
                setIsModalVisible={setIsModalAddCommentVisible}
                setArrayMessage={setArrayMessageSendComment}
            />
            <ModalUpdateInfo
                userData={userData}
                isModalVisible={isModalUpdateInfoVisible}
                setIsModalVisible={setIsModalUpdateInfoVisible}
                setArrayMessage={setArrayMessageUpdateInfo}
            />
            {
                arrayMessageSendComment.map( message => (
                    message
                ) )
            }
            {
                arrayMessageUpdateInfo.map( message => ( message ) )
            }
        </div>
    );
};
