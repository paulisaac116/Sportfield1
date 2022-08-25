import React, { useEffect, useState } from 'react';

import '../styles/Message.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { GreenButton } from './Buttons/GreenButton';

export const Message = ( { messageContent } ) => {

    const [messageState, setMessageState] = useState( 'animate__fadeInDown' );

    useEffect( () => {

        // setMessageState( '' );
        setTimeout( () => {
            setMessageState( 'animate__fadeOutUp' );
        }, 3000 );
    }, [] );

    return (
        <div className={`message animate__animated ${messageState}`}>
            <FontAwesomeIcon icon={faCheckCircle} className='message__icon fa-2x' />
            <p className='message__text'>{messageContent}</p>
        </div>
    );
};
