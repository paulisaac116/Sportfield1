import { useEffect, useState } from 'react';
import { matrix } from '../../../helpers/splitData';
import '../../../styles/AdminPage/AdminPage.css';

export const NotificationsTable = ( { tableData, currentPage, setDataSize } ) => {

    const [notificationsArray, setNotificationsArray] = useState( [] );

    useEffect( () => {

        setNotificationsArray( matrix( tableData ) );
        // setDataSize( notificationsArray.length );


    }, [tableData] );

    useEffect( () => {

        setDataSize( notificationsArray.length );
    }, [tableData, notificationsArray] );

    return (

        <div className='Notifications animate__animated animate__fadeIn'>
            <div className='table-notifications__body'>
                {
                    notificationsArray[currentPage]?.map( ( item ) => (

                        <div key={item.id} className='table-notifications__body--row'>
                            <div className='body-row__data'>
                                <div className='body-row__data--title-date'>
                                    <div className='title-date__title'>{item.title}</div>
                                    <div className='title-date__date'>{item.date}</div>
                                </div>
                                <p className='body-row__data--desc'>{item.description}</p>
                            </div>
                        </div>

                    ) )
                }

            </div>
        </div>
    );
};