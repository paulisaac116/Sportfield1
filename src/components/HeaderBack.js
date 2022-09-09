import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft } from '@fortawesome/free-regular-svg-icons';
import sportfield_logo from '../images/sportfield_log.png';

export const HeaderBack = () => {

    const navigate = useNavigate();

    return (
        <header className='header'>
            <img src={sportfield_logo} alt="sportfield logo" className='w-40 sm:w-48 lg:w-60' />
            <nav>
                <FontAwesomeIcon
                    icon={faSquareCaretLeft}
                    className='fa-2x back-logo'
                    onClick={() => navigate( -1 )}
                />
            </nav>
        </header>
    );
};
