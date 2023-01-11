import { useEffect, useState } from 'react';
import { matrix } from '../../../helpers/splitData';
import '../../../styles/AdminPage/AdminPage.css';

export const NotificationsTable = ( { tableData, currentPage, setDataSize } ) => {

    const [notificationsArray, setNotificationsArray] = useState( [] );

    useEffect( () => {

        setNotificationsArray( matrix( tableData ) );

    }, [tableData] );

    useEffect( () => {

        setDataSize( notificationsArray.length );
    }, [tableData, notificationsArray] );

    return (

        <div className='Notifications animate__animated animate__fadeIn'>
            {
                notificationsArray[currentPage]?.map( ( notification ) => (

                    <div key={notification.id} className='table-notifications__row'>
                        <div className='row__title-and-date'>
                            <p className='row__title'>{notification.title}</p>
                            <p className='row__date'>{notification.date}</p>
                        </div>
                        <p className='row__desc'>{notification.description}</p>
                    </div>

                ) )
            }
        </div>
    );
};