import React from 'react';
import { months } from '../../data/CalendarMonths';
import { getDate } from '../../helpers/getDate';

import '../../styles/TurnsPage/TurnsPage.css';

export const CalendarBar = () => {

    const today = getDate();

    return (
        <div className='calendar-bar'>
            <div className='calendar-bar__info'>
                <div className='calendar-bar__info--row'>
                    <div className='info--row__square purple-mid'></div>
                    <p>Disponible</p>
                </div>
                <div className='calendar-bar__info--row'>
                    <div className='info--row__square red'></div>
                    <p>Agendado</p>
                </div>
                <div className='calendar-bar__info--row '>
                    <div className='info--row__square gray'></div>
                    <p>No disponible</p>
                </div>

            </div>
            <div className='calendar-bar__month-year'>
                <p>{months[today.month]}</p>
                <p>{today.year}</p>

            </div>
        </div >
    );
};
