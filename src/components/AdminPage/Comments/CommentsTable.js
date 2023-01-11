import { useEffect, useState } from 'react';
import { matrix } from '../../../helpers/splitData';
import '../../../styles/AdminPage/AdminPage.css';

export const CommentsTable = ( { tableData, currentPage, setDataSize } ) => {

    const [commentsDataArray, setCommentsDataArray] = useState( [] );

    useEffect( () => {

        setCommentsDataArray( matrix( tableData ) );
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
                            <p className='row__user'>{comment.userName} {comment.userLastName} - {comment.userLand}</p>
                            <p className='row__date'>{comment.date}</p>
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
};
