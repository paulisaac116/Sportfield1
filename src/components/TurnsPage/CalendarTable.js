import React, { useState, useEffect } from 'react';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';
import { getDate } from '../../helpers/getDate';
import { getWeek } from '../../helpers/getWeek';

import { ErrorMessage } from '../ErrorMessage';

import { days } from '../../data/CalendarDays';
import { hours } from '../../data/CalendarHours';

export const CalendarTable = React.memo( ( { setWeekArray, setDateData, confirmField, fieldData } ) => {

    const { data: turnsData, loading } = useFetchFirestore( 'Turns' );
    const [arrayMessageDateError, setArrayMessageDateError] = useState( [] );

    const weekArray = getWeek();
    const today = getDate();
    const weekDays = weekArray.map( item => item.day );

    /**
     * An array of arrays
     * contains the rows of each our of the week
     */

    const fullTable = hours.map( ( hour, row ) => ( [
        days.map( ( day, column ) => ( {
            id: `${row}${column}`,
            year: weekArray[column].year,
            month: weekArray[column].month,
            date: weekArray[column].day,
            day: day.day,
            timeStart: hour.start,
            timeEnd: hour.end,
            available: ( weekArray[column].day < today.day && weekArray[column].month === today.month ) || ( hour.end <= today.hour && weekArray[column].day === today.day ) ? false : true,
            busy: false
        } ) )
    ] ) );

    let datesClicked = [];
    const [tableDays, setTableDays] = useState( fullTable );


    const selectedCell = ( day ) => {

        if ( confirmField ) {

            if ( datesClicked.some( item => item.id === day.id ) ) {
                document.getElementById( day.id ).className = '';
                datesClicked = datesClicked.filter( item => item.id !== day.id );
                setDateData( datesClicked );
            } else if ( datesClicked.length < 2 && ( document.getElementById( day.id ).className !== 'gray' && document.getElementById( day.id ).className !== 'red' ) ) {
                document.getElementById( day.id ).className = 'green';
                datesClicked.push( day );
                setDateData( datesClicked );
            }

        } else {
            setTableDays( fullTable );
            setArrayMessageDateError( [
                ...arrayMessageDateError,
                <ErrorMessage
                    messageContent={'Seleccione una cancha'}
                />
            ] );
        }

    };

    useEffect( () => {

        setTimeout( () => {
            while ( arrayMessageDateError.length !== 0 ) {
                arrayMessageDateError.pop();
            }
        }, 4000 );
    }, [arrayMessageDateError] );


    useEffect( () => {

        setWeekArray( weekDays );

    }, [] );

    useEffect( () => {

        const busyTurns = turnsData.filter( item => ( item.field?.fieldId === fieldData?.id ) );

        let busyDates = [];

        busyTurns.forEach( item => {
            item.date.map( date => busyDates.push( date ) );
        } );

        const tableDays = hours.map( ( hour, row ) => ( [
            days.map( ( day, column ) => ( {
                id: `${row}${column}`,
                year: weekArray[column].year,
                month: weekArray[column].month,
                date: weekArray[column].day,
                day: day.day,
                timeStart: hour.start,
                timeEnd: hour.end,
                available: ( weekArray[column].day < today.day && weekArray[column].month === today.month ) || ( hour.end <= today.hour && weekArray[column].day === today.day ) ? false : true,
                busy: busyDates.some( date => ( date.year === weekArray[column].year ) && ( date.month === weekArray[column].month ) && ( date.date === weekArray[column].day ) && ( date.timeStart === hour.start ) && ( date.timeEnd === hour.end ) )
            } ) )
        ] ) );

        setTableDays( tableDays );

    }, [fieldData, confirmField] );

    useEffect( () => {

        tableDays.forEach( row => {
            row.forEach( column => {
                column.forEach( day => {

                    if ( document.getElementById( day.id ).className === 'green' ) document.getElementById( day.id ).className = '';
                } );
            } );
        } );


    }, [confirmField, tableDays] );

    return (
        <>
            {/* <tbody>
                {
                    tableDays.map( ( row, rowKey ) => (
                        <tr key={rowKey}>
                            {
                                row.map( ( column ) => (
                                    column.map( ( day, columnKey ) => (
                                        <td
                                            key={day.id}
                                            id={day.id}
                                            className={`${!day.available ? 'gray' : confirmField && day.busy ? 'red' : ''}`}
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
                {
                    arrayMessageDateError.map( message => (
                        message
                    ) )
                }
            </tbody> */}
            <div className='calendar__body'>
                {
                    tableDays.map( ( row, rowKey ) => (
                        <div className='calendar__body--row' key={rowKey}>
                            {

                                row.map( ( column, columnKey ) => (
                                    column.map( ( day, dayKey ) => (
                                        <div
                                            key={day.id}
                                            id={day.id}
                                            className={`${!day.available ? 'gray' : confirmField && day.busy ? 'red' : ''}`}
                                            onClick={() => selectedCell( day )}
                                        >
                                            {day.id}
                                        </div>

                                    ) )
                                ) )
                            }

                        </div>
                    ) )
                }
                {
                    arrayMessageDateError.map( message => (
                        message
                    ) )
                }

            </div>
        </>
    );
} );
