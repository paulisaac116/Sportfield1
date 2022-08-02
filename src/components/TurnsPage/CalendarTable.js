import React, { useState, useEffect } from 'react';

import { days } from '../../data/CalendarDays';
import { hours } from '../../data/CalendarHours';
import { getDate } from '../../helpers/getDate';
import { getWeek } from '../../helpers/getWeek';

export const CalendarTable = React.memo( ( { setWeekArray, confirmDate, setDateData, confirmField } ) => {

    // const [table, setTable] = useState( [] );

    const weekArray = getWeek();
    const today = getDate();
    const weekDays = weekArray.map( item => item.day );
    let datesClicked = [];

    const tableDays = hours.map( ( hour, row ) => ( [
        days.map( ( day, column ) => ( {
            id: `${row}${column}`,
            year: weekArray[column].year,
            month: weekArray[column].month,
            date: weekArray[column].day,
            day: day.day,
            timeStart: hour.start,
            timeEnd: hour.end,
            active: false
        } ) )
    ] ) );

    const selectedCell = ( day ) => {

        if ( confirmField ) {

            if ( datesClicked.some( item => item.id === day.id ) ) {
                document.getElementById( day.id ).className = '';
                datesClicked = datesClicked.filter( item => item.id !== day.id );
                setDateData( datesClicked );
            } else if ( datesClicked.length < 2 && document.getElementById( day.id ).className !== 'gray' ) {
                document.getElementById( day.id ).className = 'green';
                datesClicked.push( day );
                setDateData( datesClicked );
                confirmDate( true );
            }
            // console.log('dateData', da)

            

        } else {
            console.log( 'select a field first' );
        }

    };


    useEffect( () => {

        setWeekArray( weekDays );

    }, [] );

    console.log( 'again' );

    return (
        <tbody>
            {
                tableDays.map( ( row, rowKey ) => (
                    <tr key={rowKey}>
                        {
                            row.map( ( column ) => (
                                column.map( ( day, columnKey ) => (
                                    <td
                                        key={day.id}
                                        id={day.id}
                                        className={`${day.date < today.day || (day.timeEnd <= today.hour && day.date === today.day) ? 'gray' : ''}`}
                                        onClick={() => selectedCell( day )}
                                    >
                                        {day.id}
                                    </td>
                                ) )
                            ) )
                        }
                    </tr>

                ) )
            }
        </tbody>
    );
} );
