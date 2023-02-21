import React, { useState } from 'react';
import { getDate } from '../../helpers/getDate';


import { CalendarTable } from './CalendarTable';
import { CalendarBar } from './CalendarBar';

import '../../styles/TurnsPage/TurnsPage.css';
import { days } from '../../data/CalendarDays';

export const Calendar = React.memo( ( { setDateData, confirmField, fieldData } ) => {

    const [weekArray, setWeekArray] = useState( [] );
    const today = getDate();

    return (
        <div className='calendar'>
            <CalendarBar />
            <div className='calendar__head'>
                {
                    days.map( ( item, key ) => (
                        <div
                            key={key}
                            className={`calendar__head--item ${today.day === weekArray[key] ? 'purple-light' : ''}`}
                        >
                            {item.symbol}<br></br>{weekArray[key]}
                        </div>
                    ) )
                }
            </div>
            <CalendarTable
                setWeekArray={setWeekArray}
                setDateData={setDateData}
                confirmField={confirmField}
                fieldData={fieldData}
            />
        </div>

    );
} );
