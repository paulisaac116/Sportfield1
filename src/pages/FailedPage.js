import React from 'react';

import '../styles/Login-RegisterPagesStyles/Login-RegisterPages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

export const FailedPage = () => {
  return (
    <div className='FailedPage'>
      <div className='failed__content'>
        <h1>404</h1>
        <h2>Algo salió mal</h2>
        <p>Recarga la página o regresa a la página anterior</p>
        <FontAwesomeIcon className='animate-spin' icon={faSkullCrossbones} />
      </div>

    </div>
  );
};
