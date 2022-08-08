import React, { useState, useEffect, useRef } from 'react';

import { days } from '../../data/CalendarDays';
import { hours } from '../../data/CalendarHours';
import { db } from '../../firebase';
import { getDate } from '../../helpers/getDate';
import { getWeek } from '../../helpers/getWeek';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';

export const CalendarTable = React.memo( ( { setWeekArray, setDateData, confirmField, fieldData} ) => {

    // const [table, setTable] = useState( [] );

    const weekArray = getWeek();
    const today = getDate();
    const weekDays = weekArray.map( item => item.day );
    let datesClicked = [];

    const { data: turnsData, loading } = useFetchFirestore('Turns');


    const inputRef = useRef();

    const tableDays = hours.map( ( hour, row ) => ( [
        days.map( ( day, column ) => ( {
            id: `${row}${column}`,
            year: weekArray[column].year,
            month: weekArray[column].month,
            date: weekArray[column].day,
            day: day.day,
            timeStart: hour.start,
            timeEnd: hour.end,
            available: weekArray[column].day < today.day || ( hour.end <= today.hour && weekArray[column].day === today.day ) ? false : true,
            busy: false
        } ) )
    ] ) );

    // const [newArray, setNewArray] = useState(tableDays)
    // console.log(tableDays)
    // console.log('weekArray: ', weekArray)

    const selectedCell = ( day ) => {
        // console.log('day', day)

        if ( confirmField ) {

            if ( datesClicked.some( item => item.id === day.id ) ) {
                document.getElementById( day.id ).className = '';
                datesClicked = datesClicked.filter( item => item.id !== day.id );
                setDateData( datesClicked );
            } else if ( datesClicked.length < 2 && document.getElementById( day.id ).className !== 'gray' ) {
                document.getElementById( day.id ).className = 'green';
                datesClicked.push( day );
                setDateData( datesClicked );
            }
            console.log( 'datesClicked', datesClicked );
            // console.log('dateData', dateData)

        } else {
            console.log( 'select a field first' );
        }

    };


    useEffect( () => {

        setWeekArray( weekDays );

    }, [] );

    useEffect(() => {

        const busyTurns = turnsData.filter(item => (item.field?.location === fieldData?.location && item.field?.fieldType === fieldData?.fieldType ));

        // && item.field.fieldType === fieldData?.fieldType
        const busyDates = busyTurns.map(item => item.date)
        // console.log('turns data', turnsData)
        console.log('busy dates', busyDates)


        console.log('fieldData', fieldData)

        // const tableDays = hours.map( ( hour, row ) => ( [
        //     days.map( ( day, column ) => ( {
        //         id: `${row}${column}`,
        //         year: weekArray[column].year,
        //         month: weekArray[column].month,
        //         date: weekArray[column].day,
        //         day: day.day,
        //         timeStart: hour.start,
        //         timeEnd: hour.end,
        //         available: weekArray[column].day < today.day || ( hour.end <= today.hour && weekArray[column].day === today.day ) ? false : true,
        //         busy: turnsData.map((item) => )
        //     } ) )
        // ] ) ); 
        
        




    }, [fieldData])

    // useEffect( () => {

    //     console.log(fieldActive)
    //     if(fieldActive === false ){
    //         console.log('enter')
    //         document.getElementById( '00').className = '';
    //         datesClicked.map( item => {
    //             console.log(item.id)
    //         } );
    
    //         console.log('useEffect')
    //     }


    // }, [fieldActive] );

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
                                        // className={`${day.date < today.day || (day.timeEnd <= today.hour && day.date === today.day) ? 'gray' : ''}`}
                                        className={!day.available ? 'gray' : ''}
                                        onClick={() => selectedCell( day )}
                                    // ref={dateRef}
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
