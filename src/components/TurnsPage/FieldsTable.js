import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { BlackButton } from '../Buttons/BlackButton';
import { FieldCardsData } from '../../data/FieldCardsData';

import '../../styles/TurnsPage/TurnsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export const FieldsTable = React.memo( ( { confirmField, setFieldData, dateData, setDateData, dateRef, field } ) => {


    const [menuItem, setMenuItem] = useState( [] );
    const [fieldCardTable, setFieldCardTable] = useState( [] );

    const { sectorInferior: sectorInferiorArray, sectorMedio: sectorMedioArray } = FieldCardsData;

    const sectorMedio = () => {
        confirmField( false );
        setDateData( [] );
        setMenuItem( medioMenuItem );
        setFieldCardTable( medioFieldsTable );
    };

    const sectorInferior = () => {
        confirmField( false );
        setDateData( [] );
        setMenuItem( inferiorMenuItem );
        setFieldCardTable( inferiorFieldsTable );
    };


    const changeColor = ( array, arrayElement ) => {
        setFieldData( arrayElement );
        setDateData( [] );
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
        setMenuItem( medioMenuList );
    };

    const inferiorMenu = () => {
        setMenuItem( inferiorMenuList );
    };


    const medioMenuItem = () => {

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

    useEffect( () => {

        setMenuItem( medioMenuItem );
        setFieldCardTable( medioFieldsTable );

    }, [] );

    return (
        <>
            <div className="menu-and-table">
                <div className="menu">
                    <div className="turn__field--instruction">
                        <div className='number__circle'>
                            1
                        </div>
                        <p>Selecciona el sector de ubicaci??n</p>
                    </div>
                    <div className='menu-container'>
                        {menuItem}
                    </div>
                </div>
                <div className='table'>
                    <div className="turn__field--instruction">
                        <div className='number__circle'>
                            2
                        </div>
                        <p>Selecciona el tipo de cancha dando clic en la cancha de su preferencia</p>
                    </div>
                    {fieldCardTable}

                </div>
            </div>
        </>
    );
} );

FieldsTable.propTypes = {
    confirmField: PropTypes.func,
    setFieldData: PropTypes.func,
    dateData: PropTypes.array,
    setDateData: PropTypes.func

};