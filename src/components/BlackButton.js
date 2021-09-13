import {React, useState, useEffect } from 'react'

import '../styles/BlackButton.css'

export const BlackButton = ({button_name, button_func}) => {

    const [buttonName, setButtonName] = useState("")
    const [buttonFunc, setButtonFunc] = useState(null)


    useEffect(() => {
        setButtonName(button_name)
        setButtonFunc(button_func)
    }, [button_name])

    return (
        <button className="black-button" >{buttonName}</button>
    )
}
