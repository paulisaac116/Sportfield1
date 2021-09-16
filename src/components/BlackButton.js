import {React, useState, useEffect } from 'react'

import '../styles/BlackButton.css'

export const BlackButton = ({button_name, button_func, button_value}) => {

    //const [buttonName, setButtonName] = useState("")
    //const [buttonFunc, setButtonFunc] = useState(null)


    return (
        <button className="black-button" onClick={button_func} value={button_value}>{button_name}</button>
    )
}
