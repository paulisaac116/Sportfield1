import React, { useEffect, useState } from 'react';
import { months } from '../../../data/CalendarMonths';
import { sortByDate } from '../../../helpers/sortByDate';
import { matrix } from '../../../helpers/splitData';
import '../../../styles/AdminPage/AdminPage.css';

export const CommentsTable = React.memo( ( { tableData, currentPage, setDataSize } ) => {

    const [commentsDataArray, setCommentsDataArray] = useState( [] );

    useEffect( () => {

        let orderedArray = [...tableData];
        orderedArray = sortByDate( orderedArray );

        setCommentsDataArray( matrix( orderedArray ) );
    }, [tableData] );

    useEffect( () => {

        setDataSize( commentsDataArray.length );
    }, [tableData, commentsDataArray] );



    return (
        <div className='Comments animate__animated animate__fadeIn'>
            {
                commentsDataArray[currentPage]?.map( ( comment ) => (

                    <div key={comment.id} className='table-comments__row'>
                        <div className='row__user-and-date'>
                            <p className='row__user'>{comment.userName} {comment.userLastName} - Lote {comment.userLand}</p>
                            <p className='row__date'>{comment.savedIn?.date} de {months[comment.savedIn?.month]} de {comment.savedIn?.year} - {comment.savedIn?.hour.toString().length === 1 ? '0' + comment.savedIn?.hour : comment.savedIn?.hour}:{comment.savedIn?.minutes.toString().length === 1 ? '0' + comment.savedIn?.minutes : comment.savedIn?.minutes}</p>
                        </div>
                        <div className='row__title-and-desc'>
                            <h3 className='row__title'>{comment.title}</h3>
                            <p className='row__desc'>{comment.description}</p>
                        </div>
                    </div>

                ) )
            }

        </div>
    );
} );
