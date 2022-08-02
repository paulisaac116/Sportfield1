import React from 'react'

import '../../styles/CoursesUser.css'
import { GreenButton } from '../Buttons/GreenButton'


export const CoursesUser = () => {
    return (
        <div className="courses">
            <div className="courses__title">CURSOS</div>
            <div className="courses__table"></div>
            <div className="courses__button">
                <GreenButton button_name="Inscripción en curso"/>
            </div>
        </div>
    )
}
