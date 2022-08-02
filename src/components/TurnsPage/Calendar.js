import React, { useState, useEffect } from 'react';

import '../../styles/TurnsPage.css';
import { days } from '../../data/CalendarDays';
import { hours } from '../../data/CalendarHours';
import { getWeek } from '../../helpers/getWeek';
import { months } from '../../data/CalendarMonths';
import { CalendarTable } from './CalendarTable';
import { getDate } from '../../helpers/getDate';
import { CalendarBar } from './CalendarBar';

export const Calendar = React.memo( ({setVerifySelectedDate, setDateData, confirmField}) => {

    const [hoursCounter, setHoursCounter] = useState( 0 );
    const [turnsCounter, setTurnsCounter] = useState( 0 );
    const [weekArray, setWeekArray] = useState( [] );
    const today = getDate();

    console.log();


    const changeColor = ( id ) => {

        document.getElementById( id ).className = 'green';

    };


    return (
        <div className='calendar'>
            <CalendarBar />
            <table className='table__calendar'>
                <thead>
                    <tr>
                        {
                            days.map( ( item, key ) => (
                                <th
                                    key={key}
                                    scope='col'
                                    className={`${today.day === weekArray[key] ? 'purple-light' : 'hola'}`}
                                >
                                    {item.symbol}<br></br>{weekArray[key]}
                                </th>

                            ) )
                        }
                    </tr>
                </thead>
                <CalendarTable
                    setWeekArray={setWeekArray}
                    confirmDate={setVerifySelectedDate}
                    setDateData={setDateData}
                    confirmField={confirmField}

                />
            </table>
        </div>
    );
} );
