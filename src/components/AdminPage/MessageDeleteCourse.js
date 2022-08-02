import React, { useState } from 'react';

import '../../styles/AdminPage/adminPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export const MessageDeleteCourse = ({isMessageDeleteCourseVisible}) => {
    return (
        <div className={`message ${isMessageDeleteCourseVisible}`}>
            <FontAwesomeIcon icon={faCheckCircle} className='message__icon fa-2x' />
            <p className='message__text'>Curso eliminado</p>
        </div>
    );
};
