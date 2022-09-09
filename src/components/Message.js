import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import '../styles/Message.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export const Message = ( { messageContent } ) => {

    const [messageState, setMessageState] = useState( 'animate__fadeInDown' );

    useEffect( () => {

        setTimeout( () => {
            setMessageState( 'animate__fadeOutUp' );
        }, 2500 );

    }, [] );

    return (
        <div className={`message animate__animated ${messageState}`}>
            <FontAwesomeIcon icon={faCheckCircle} className='message__icon fa-2x' />
            <p className='message__text'>{messageContent}</p>
        </div>
    );
};

Message.propTypes = {
    messageContent: PropTypes.string
};
