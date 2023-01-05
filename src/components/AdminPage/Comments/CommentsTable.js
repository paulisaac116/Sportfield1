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
            <div className='table-comments__body'>
                {
                    commentsDataArray[currentPage]?.map( ( item ) => (

                        <div key={item.id} className='table-comments__body--row'>
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
