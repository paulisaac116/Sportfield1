import React from 'react'
import '../../styles/Buttons.css'

export const PurpleButton = ({ button_name, button_func }) => {
  return (
    <button
            className='rounded-button purple-button '
            onClick={button_func}
        >
            {button_name}
        </button>
  )
}
