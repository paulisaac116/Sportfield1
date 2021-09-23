import React from 'react'

import '../styles/BlackButton.css'

export const BlackButton = ({button_name, button_func, button_id, button_logo, button_value}) => {

    return (
            <button className="black-button" onClick={button_func} value={button_value} id={button_id}>{button_name}{button_logo}</button>
    )
}
