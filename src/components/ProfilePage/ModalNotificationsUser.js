import React from 'react';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons';

export const ModalNotificationsUser = ( { isModalVisible, setIsModalVisible } ) => {

    const { data: notificationsData, loading } = useFetchFirestore( 'Notifications' );

    const hiddeModal = () => {
        setIsModalVisible(false)
    }

    return (
        <div className={`notifications-frame ${isModalVisible ? 'flex' : 'hidden'}`}>
            <div className='notifications-frame__head'>
                <h3>Notificaciones</h3>
                <FontAwesomeIcon 
                    icon={faRectangleXmark}
                    className='fa-1x notifications-frame__head--icon'
                    onClick={hiddeModal}
                />

            </div>
            {
                !loading && notificationsData.map( ( notification, key ) => (
                    <div className='notifications-frame__row'>
                        <div className='notifications-frame__row--info'>
                            <p className='notifications-frame__row--title'>{notification.title}</p>
                            <p className='notifications-frame__row--desc'>{notification.description}</p>
                        </div>
                        <div className='notifications-frame__row--date'>
                            <p>{notification.date}</p>
                        </div>
                    </div>
                ) )
            }


        </div>
    );
};
