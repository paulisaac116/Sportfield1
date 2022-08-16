import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { BlackButton } from '../Buttons/BlackButton';
import { FieldCardsData } from '../../data/FieldCardsData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import { Calendar } from './Calendar';
import { CalendarBar } from './CalendarBar';
import { CalendarTable } from './CalendarTable';

// import '../../styles/FieldsTable.css';

import '../../styles/TurnsPage.css'

export const FieldsTable = React.memo( ( { confirmField, setFieldData, dateData, setDateData, dateRef, field } ) => {


    const [menuItem, setMenuItem] = useState( [] );
    const [fieldCardTable, setFieldCardTable] = useState( [] );
    // const [dateArray, setDateArray] = useState( [1, 2, 3, 4] );

    const { sectorInferior: sectorInferiorArray, sectorMedio: sectorMedioArray } = FieldCardsData;

    const sectorMedio = () => {
        confirmField( false );
        // console.log( field );
        setDateData( [] );
        setMenuItem( medioMenuItem );
        setFieldCardTable( medioFieldsTable );
    };

    const sectorInferior = () => {
        confirmField( false );
        console.log( field );
        setDateData( [] );
        setMenuItem( inferiorMenuItem );
        setFieldCardTable( inferiorFieldsTable );
    };


    const changeColor = ( array, arrayElement ) => {
        setFieldData( arrayElement );
        console.log('array element: ', arrayElement)
        const newArray = [];
        confirmField( true );

        const arrayFilter = () => {
            for ( let item in array ) {
                if ( array[item] !== arrayElement ) {
                    newArray.push( array[item] );
                }
            }
        };

        arrayFilter();
        setFieldCardTable(
            <div className={`table__fields table__${arrayElement.locationClassname}`}>
                <div className={`table__card ${arrayElement.className}`}>{arrayElement.code}</div>
                {newArray.map( ( item, key ) => (
                    <div
                        onClick={() => { changeColor( array, item ); }}
                        style={{ backgroundColor: '#636262' }}
                        key={key}
                        className={`table__card ${item.className}`}
                    >
                        {item.code}
                    </div>
                ) )}
            </div> );
    };

    const medioMenu = () => {
        // console.log( 'dateData (medioMenu): ', dateData );

        setMenuItem( medioMenuList );
    };

    const inferiorMenu = () => {
        // console.log( 'dateData (inferiorMenu): ', dateData );

        setMenuItem( inferiorMenuList );
    };


    const medioMenuItem = () => {

        // console.log( 'dateData: (medioMenuItem)', dateData );

        return <BlackButton
            button_name="SECTOR MEDIO"
            button_func={medioMenu}
            button_value="middle"
            button_logo={<FontAwesomeIcon size="lg" icon={faCaretDown} />}

        />;

    };

    const medioMenuList = () => (
        <div className="field-menu">
            <BlackButton
                button_name="SECTOR MEDIO"
                button_func={sectorMedio}
                button_value="middle"
                button_logo={<FontAwesomeIcon size="lg" icon={faCaretDown} />}
            />
            <BlackButton
                button_name="SECTOR INFERIOR"
                button_func={sectorInferior}
                button_value="inferior"
            />
        </div>
    );

    const medioFieldsTable = () => (
        <div className="table__fields table__middle">
            {Object.keys( sectorMedioArray ).map( ( item, key ) => (
                <div
                    onClick={() => { changeColor( sectorMedioArray, sectorMedioArray[item] ); }}
                    key={key}
                    className={`table__card ${sectorMedioArray[item].className}`}
                >
                    {sectorMedioArray[item].code}
                </div>
            ) )}
        </div> );


    const inferiorMenuItem = () => (
        <BlackButton
            button_name="SECTOR INFERIOR"
            button_func={inferiorMenu}
            button_value="inferior"
            button_logo={<FontAwesomeIcon size="lg" icon={faCaretDown} />}
        /> );


    const inferiorMenuList = () =>
    ( <div className="field-menu">
        <BlackButton
            button_name="SECTOR INFERIOR"
            button_func={sectorInferior}
            button_value="inferior"
            button_logo={<FontAwesomeIcon size="lg" icon={faCaretDown} />}
        />
        <BlackButton
            button_name="SECTOR MEDIO"
            button_func={sectorMedio}
            button_value="middle"
        />
    </div> );

    const inferiorFieldsTable = () => (
        <div className="table__fields table__inferior">
            {Object.keys( sectorInferiorArray ).map( ( item, key ) => (
                <div
                    onClick={() => { changeColor( sectorInferiorArray, sectorInferiorArray[item] ); }}
                    key={key}
                    className={`table__card ${sectorInferiorArray[item].className}`}
                >
                    {sectorInferiorArray[item].code}
                </div>
            ) )}
        </div> );

    // useEffect( () => {

    //     setDateArray( dateData );
    //     console.log( 'useEffect: ', dateData );
    //     console.log( 'array (useEffect: )', dateArray );
    // }, [dateData, dateArray] );


    useEffect( () => {

        setMenuItem( medioMenuItem );
        setFieldCardTable( medioFieldsTable );

    }, [] );




    return (
        <>
            <div className="menu-and-table">
                <div className="menu-container">
                    {menuItem}
                </div>
                {fieldCardTable}
            </div>

            {/* <div className='calendar'>
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
                    // dateRef={dateRef}
                    // dateData={dateData}

                    />
                </table>
            </div> */}

        </>
    );
} );




FieldsTable.propTypes = {
    confirmField: PropTypes.func,
    setFieldData: PropTypes.func,
    dateData: PropTypes.array,
    setDateData: PropTypes.func

};