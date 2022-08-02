import React from 'react'

import '../../styles/TurnsPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

export const MessageFieldError = () => {
  return (
    <div className={`error__message flex scale-in-center`}>
        <FontAwesomeIcon icon={faExclamationCircle} className='fa-2x'/>
        <p>Selecciona una cacha</p>
    </div>
  )
}
