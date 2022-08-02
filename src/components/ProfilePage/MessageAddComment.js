import React from 'react';

import '../../styles/AdminPage/adminPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export const MessageAddComment = ({isMessageAddCommentVisible}) => {
    return (
        <div className={`message ${isMessageAddCommentVisible}`}>
            <FontAwesomeIcon icon={faCheckCircle} className='message__icon fa-2x' />
            <p className='message__text'>Comentario enviado</p>
        </div>
    );
};
