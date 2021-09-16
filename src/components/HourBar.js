import React, { useState } from 'react'
import { BlackButton } from './BlackButton'

export const HourBar = () => {

    const [time, setTime] = useState(null)
    const [hour, setHour] = useState(null)
    

    const timeAM = () => {
        setTime(<BlackButton button_name="AM" button_func={}/>)
    }
    const timePM = () => {
        setTime(<BlackButton button_name="PM" button_func={}/>)
    }

    const timeMenuAM = () => {
        setTime(
            <div>
                <BlackButton button_name="AM" button_func={}/>
                <BlackButton button_name="PM" button_func={}/>
            </div>
        )
    }

    const timeMenuPM = () => {
        setTime(
            <div>
                <BlackButton button_name="PM" button_func={}/>
                <BlackButton button_name="AM" button_func={}/>
            </div>
        )
    }



    return (
        <div>
            <p>HORA</p>
            {time}
            {hour}
        </div>
    )
}
