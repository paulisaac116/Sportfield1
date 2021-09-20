import React from 'react'

import '../styles/BlackButton.css'

export const BlackButton = ({button_name, button_func, button_value}) => {

    return (
        <button className="black-button" onClick={button_func} value={button_value}>{button_name}</button>
    )
}
