import React, { useState, useEffect, useRef } from 'react';

import { days } from '../../data/CalendarDays';
import { hours } from '../../data/CalendarHours';
import { db } from '../../firebase';
import { getDate } from '../../helpers/getDate';
import { getWeek } from '../../helpers/getWeek';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';

export const CalendarTable = React.memo( ( { setWeekArray, setDateData, confirmField, fieldData } ) => {

    const { data: turnsData, loading } = useFetchFirestore( 'Turns' );
    const weekArray = getWeek();
    const today = getDate();
    const weekDays = weekArray.map( item => item.day );

    const fullTable = hours.map( ( hour, row ) => ( [
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
    
    let datesClicked = [];
    const [tableDays, setTableDays] = useState( fullTable );




    const inputRef = useRef();


    // conaole
    // const [newArray, setNewArray] = useState(tableDays)
    // console.log( 'tableDays: ', tableDays );
    // console.log('weekArray: ', weekArray)

    const selectedCell = ( day ) => {
        // console.log('day', day)

        if ( confirmField ) {

            if ( datesClicked.some( item => item.id === day.id ) ) {
                document.getElementById( day.id ).className = '';
                datesClicked = datesClicked.filter( item => item.id !== day.id );
                setDateData( datesClicked );
            } else if ( datesClicked.length < 2 && (document.getElementById( day.id ).className !== 'gray' && document.getElementById(day.id).className !== 'red')) {
                document.getElementById( day.id ).className = 'green';
                datesClicked.push( day );
                setDateData( datesClicked );
            }
            console.log( 'datesClicked', datesClicked );
            // console.log('dateData', dateData)

        } else {
            setTableDays( fullTable );
            console.log( 'select a field first' );
        }

    };


    useEffect( () => {

        setWeekArray( weekDays );

    }, [] );

    useEffect( () => {

        const busyTurns = turnsData.filter( item => ( item.field?.fieldId === fieldData?.id) );
        // console.log('busyTurns: ', busyTurns)

        let busyDates = []

        // && item.field.fieldType === fieldData?.fieldType
        // const busyDates = busyTurns.map( item => {
        //     item.date.map(date => (date))
        // } );

        busyTurns.forEach(item => {
            item.date.map(date => busyDates.push(date))
        })

        // console.log('turns data', turnsData)
        // console.log( 'busy dates', busyDates );
        // console.log('today', today)

        // setDateData([
        //     ...fullTable,
        //     fullTable[0][0].busy = busyDates.some(date => (date.year === weekArray[column].year) && (date.month === weekArray[column].month) && (date.date === weekArray[column].day) && (date.timeStart === hour.start) && (date.timeEnd === hour.end))
        //     // [busy: busyDates.some(date => (date.year === weekArray[column].year) && (date.month === weekArray[column].month) && (date.date === weekArray[column].day) && (date.timeStart === hour.start) && (date.timeEnd === hour.end))]
        // ])

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
                busy: busyDates.some( date => ( date.year === weekArray[column].year ) && ( date.month === weekArray[column].month ) && ( date.date === weekArray[column].day ) && ( date.timeStart === hour.start ) && ( date.timeEnd === hour.end ) )
                // busy: true
            } ) )
        ] ) );

        // console.log('tableDays', tableDays)

        setTableDays( tableDays );

        // let newArray = [];

        // busyDates.forEach( date => {
        //     tableDays.forEach( row => {
        //         newArray.push(row.filter( cell => ( cell.year === date.year ) && ( cell.month === date.month ) && ( cell.date === date.date ) && ( cell.timeStart === date.timeStart ) && ( cell.timeEnd === date.timeEnd ) ))

        //     } );
        // } );
        // } );

        // busyDates.map( date => {
        //     tableDays.map( row => 
        //     } );

        // tableDays.forEach( element => {

        //     element.find;

        // } );

        // tableDays.map( row => row.find( date => ) );



        // console.log( 'fieldData', fieldData );


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






    }, [fieldData, confirmField] );

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
        </tbody>
    );
} );
