import { useEffect, useState } from 'react';
import { matrix } from '../../../helpers/splitData';
import '../../../styles/AdminPage/AdminPage.css';
import { months } from '../../../data/CalendarMonths';
import { sortByDate } from '../../../helpers/sortByDate';

export const NotificationsTable = ( { tableData, currentPage, setDataSize } ) => {

    const [notificationsArray, setNotificationsArray] = useState( [] );

    useEffect( () => {

        let array = [...tableData];
        array = sortByDate( array );

        setNotificationsArray( matrix( array ) );

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
                            <p className='row__date'>{`${notification.savedIn.date} de ${months[notification.savedIn.month]} de ${notification.savedIn.year} - ${notification.savedIn.hour}:${notification.savedIn.minutes <= 9 ? `0${notification.savedIn.minutes}` : notification.savedIn.minutes}`}</p>
                        </div>
                        <p className='row__desc'>{notification.description}</p>
                    </div>

                ) )
            }
        </div>
    );
};