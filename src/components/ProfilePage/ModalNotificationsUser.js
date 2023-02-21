import React, { useEffect, useState } from 'react';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
import { months } from '../../data/CalendarMonths';
import { db } from '../../firebase';
import { sortByDate } from '../../helpers/sortByDate';

export const ModalNotificationsUser = ( { isModalVisible, setIsModalVisible, setNumber, number, setNotificationNumber } ) => {

    const { data, loading } = useFetchFirestore( 'Notifications' );
    const [notificationsData, setNotificationsData] = useState( [] );

    const hiddeModal = () => {
        setIsModalVisible( false );
        setNotificationNumber( false );
        setNumber( 1 );
    };

    useEffect( () => {

        db.collection( 'Notifications' ).onSnapshot( ( querySnaphot ) => {
            querySnaphot.docChanges().forEach( ( change ) => {
                if ( change.type === "added" ) {
                    setNumber( number + 1 );
                    !isModalVisible && setNotificationNumber( true );
                }

            } );
        } );
    }, [data] );

    useEffect( () => {

        let array = [...data];
        array = sortByDate( array );

        setNotificationsData( array );

    }, [data] );

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
                !loading && notificationsData?.map( ( notification ) => (
                    <div className='notifications-frame__row' key={notification.id}>
                        <div className='notifications-frame__row--info'>
                            <p className='notifications-frame__row--title'>{notification.title}</p>
                            <p className='notifications-frame__row--desc'>{notification.description}</p>
                        </div>
                        <div className='notifications-frame__row--date'>
                            <p>{notification.savedIn.date} de {months[notification.savedIn.month]} de {notification.savedIn.year} - {notification.savedIn.hour}:{notification.savedIn.minutes <= 9 ? `0${notification.savedIn.minutes}` : notification.savedIn.minutes}</p>
                        </div>
                    </div>
                ) )
            }


        </div>
    );
};
