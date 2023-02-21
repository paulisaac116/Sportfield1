import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { bodyOverflow } from '../helpers/bodyOverflow';

import { GreenButton } from '../components/Buttons/GreenButton';
import { FieldsTable } from '../components/TurnsPage/FieldsTable';
import { FieldBar } from '../components/TurnsPage/FieldBar';
import { Calendar } from '../components/TurnsPage/Calendar';
import { ModalSaveTurn } from '../components/TurnsPage/ModalSaveTurn';
import { HeaderBack } from '../components/HeaderBack';
import { ErrorMessage } from '../components/ErrorMessage';

import '../styles/TurnsPage/TurnsPage.css';

export const TurnsPage = React.memo( () => {

    const location = useLocation();

    /** To verify if a certain field was selected */
    const [verifySelectedField, setVerifySelectedField] = useState( false );

    /** Data of the selected field  */
    const [fieldData, setFieldData] = useState( [] );

    /** The date picked in the calendar table */
    const [dateData, setDateData] = useState( [] );
    const cellRef = useRef();

    const [isModalVisible, setIsModalVisible] = useState( false );
    const [messageFieldError, setMessageFieldError] = useState( [] );
    const [messageDateError, setMessageDateError] = useState( [] );

    const saveTurn = () => {
        if ( verifySelectedField && dateData.length !== 0 ) {
            bodyOverflow( 'hidden' );
            setIsModalVisible( true );

        } else if ( !verifySelectedField ) {
            setMessageFieldError( [
                ...messageFieldError,
                <ErrorMessage
                    messageContent={'Seleccione una cancha'}
                />
            ] );
        }
        else if ( dateData.length === 0 ) {
            setMessageDateError( [
                ...messageDateError,
                <ErrorMessage
                    messageContent={'Seleccione una fecha'}
                />
            ] );
        }
    };

    useEffect( () => {

        setTimeout( () => {
            while ( messageFieldError.length !== 0 ) {
                messageFieldError.pop();
            }
        }, 4000 );

    }, [messageFieldError] );

    useEffect( () => {

        setTimeout( () => {
            while ( messageDateError.length !== 0 ) {
                messageDateError.pop();
            }
        }, 4000 );

    }, [messageDateError] );

    return (
        <div className='TurnsPage'>
            <HeaderBack />
            <div className="turns__content">
                <div className="turn__field">
                    <div className="turn__field__fieldCards">
                        <FieldsTable
                            confirmField={setVerifySelectedField}
                            setFieldData={setFieldData}
                            dateData={dateData}
                            setDateData={setDateData}
                            dateRef={cellRef}
                            field={verifySelectedField}
                        />
                        <FieldBar />
                    </div>
                </div>


                <div className="turn__date">
                    <div className="turn__field--instruction">
                        <div className='number__circle'>
                            3
                        </div>
                        <p>Selecciona la fecha y hora</p>
                    </div>
                    <Calendar
                        setDateData={setDateData}
                        confirmField={verifySelectedField}
                        fieldData={fieldData}
                    />
                    <GreenButton
                        button_name="Agendar turno"
                        button_func={saveTurn}
                        extraClass='main-button'
                    />
                </div>
            </div>
            <ModalSaveTurn
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                dateData={dateData}
                fieldData={fieldData}
                userId={location.state.id}
            // userId='1234567'
            />
            {
                messageFieldError.map( message => (
                    message
                ) )
            }
            {
                messageDateError.map( message => (
                    message
                ) )
            }
        </div>
    );
} );