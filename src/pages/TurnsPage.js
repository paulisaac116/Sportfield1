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

import '../styles/TurnsPage.css';

export const TurnsPage = React.memo( () => {

    const location = useLocation();

    const [verifySelectedField, setVerifySelectedField] = useState( false );
    const [fieldData, setFieldData] = useState( [] );
    const [dateData, setDateData] = useState( [] );
    const cellRef = useRef();

    const [isModalVisible, setIsModalVisible] = useState( false );
    const [messageFieldError, setMessageFieldError] = useState( [] );
    const [messageDateError, setMessageDateError] = useState( [] );

    const saveTurn = () => {
        console.log( 'date on click ', dateData );
        if ( verifySelectedField && dateData.length !== 0 ) {
            console.log( 'puede agendar su turno' );
            console.log( 'dateData lenght: ', dateData.length );
            bodyOverflow( 'hidden' );
            setIsModalVisible( true );

        } else if ( !verifySelectedField ) {
            setMessageFieldError( [
                ...messageFieldError,
                <ErrorMessage
                    messageContent={'Seleccione una cancha'}
                />
            ] );
            console.log( 'seleccione una cancha' );
        }
        else if ( dateData.length === 0 ) {
            setMessageDateError( [
                ...messageDateError,
                <ErrorMessage
                    messageContent={'Seleccione una fecha'}
                />
            ] );

            console.log( 'seleccione una fecha' );
        }
    };

    useEffect( () => {

        setTimeout( () => {
            while ( messageFieldError.length !== 0 ) {
                messageFieldError.pop();
            }
        }, 10000 );

    }, [messageFieldError] );

    useEffect( () => {

        setTimeout( () => {
            while ( messageDateError.length !== 0 ) {
                messageDateError.pop();
            }
        }, 10000 );

    }, [messageDateError] );

    return (
        <div className='TurnsPage'>
            <HeaderBack />
            <div className="turns__content">
                <div className="turn__field">
                    <div className="turn__field--instruction">
                        <div className='number__circle'>
                            <p className='number__one'>1</p>
                        </div>
                        <p>Selecciona el sector de ubicación, y el tipo de cancha</p>
                    </div>

                    <div className="turn__field__fieldCards">
                        <h2>CANCHAS</h2>
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
                            <p className='number__one'>2</p>
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
                    />
                </div>
            </div>
            <ModalSaveTurn
                isModalVisible={isModalVisible}
                fieldData={fieldData}
                dateData={dateData}
                setIsModalVisible={setIsModalVisible}
                userId={location.state.id}
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