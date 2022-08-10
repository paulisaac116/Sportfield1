import React from 'react';

import '../styles/Message.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export const Message = ({isMessageVisible, messageContent}) => {
    return (
        <div className={`message ${isMessageVisible}`}>
            <FontAwesomeIcon icon={faCheckCircle} className='message__icon fa-2x' />
            <p className='message__text'>{messageContent}</p>
        </div>
    );
};
