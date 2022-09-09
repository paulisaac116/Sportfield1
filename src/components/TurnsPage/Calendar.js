import React, { useState } from 'react';
import { getDate } from '../../helpers/getDate';


import { CalendarTable } from './CalendarTable';
import { CalendarBar } from './CalendarBar';

import '../../styles/TurnsPage/TurnsPage.css';
import { days } from '../../data/CalendarDays';

export const Calendar = React.memo( ({setDateData, confirmField, fieldData}) => {

    const [weekArray, setWeekArray] = useState( [] );
    const today = getDate();

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
                    setDateData={setDateData}
                    confirmField={confirmField}
                    fieldData={fieldData}
                    // dateRef={dateRef}
                    // dateData={dateData}

                />
            </table>
        </div>
    );
} );
