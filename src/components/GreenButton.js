import {React} from 'react'

import '../styles/GreenButton.css'

export const GreenButton = ({button_name, button_func}) => {

    return (
        <button className="button" onClick={button_func}>{button_name}</button>
    )
}
