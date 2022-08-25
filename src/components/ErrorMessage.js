import React, { useEffect, useState } from 'react';

import '../styles/Message.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export const ErrorMessage = ( { messageContent } ) => {

    const [messageState, setMessageState] = useState( 'hidden' );

    useEffect( () => {

        setMessageState( 'animate__fadeInDown' );
        setTimeout( () => {
            setMessageState( 'animate__fadeOut' );
        }, 2500);
    }, [] );

    return (
        <div className={`error-message animate__animated ${messageState}`}>
            <FontAwesomeIcon icon={faExclamationCircle} className='fa-2x' />
            <p>{messageContent}</p>
        </div>
    );
};
