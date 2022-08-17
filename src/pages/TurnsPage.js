import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { HeaderComp } from '../components/HeaderComp';
import { PurpleTitle } from '../components/PurpleTitle';
import { InstructionCard } from '../components/InstructionCard';
import { GreenButton } from '../components/Buttons/GreenButton';
import { FieldsTable } from '../components/TurnsPage/FieldsTable';
import { FieldBar } from '../components/TurnsPage/FieldBar';
import { HourBar } from '../components/TurnsPage/HourBar';
import { Calendar } from '../components/TurnsPage/Calendar';
import { MessageFieldError } from '../components/TurnsPage/MessageFieldError';
import { ModalSaveTurn } from '../components/TurnsPage/ModalSaveTurn';
import { HeaderBack } from '../components/HeaderBack';

import '../styles/TurnsPage.css';

export const TurnsPage = React.memo( () => {

    const location = useLocation();
    
    const [verifySelectedField, setVerifySelectedField] = useState( false );

    const [fieldType, setFieldType] = useState( "" );
    const [fieldLocation, setFieldLocation] = useState( "" );
    const [fieldCode, setFieldCode] = useState( "" );
    const [fieldBackground, setFieldBackground] = useState( "" );

    const [fieldData, setFieldData] = useState( [] );
    const [dateData, setDateData] = useState( [] );
    const cellRef = useRef();

    const [isModalVisible, setIsModalVisible] = useState( false );
    const [isMessageFieldErrorVisible, setIsMessageFieldErrorVisible] = useState( 'hidden' );

    const [errorsArray, setErrorsArray] = useState( [] );

    const messageFieldError = <MessageFieldError />;
    let errors = [messageFieldError, messageFieldError];

    // console.log(messageFieldError)

    const saveTurn = () => {
        console.log( 'date on click ', dateData );
        if ( verifySelectedField && dateData.length !== 0 ) {
            console.log( 'puede agendar su turno' );
            console.log( 'dateData lenght: ', dateData.length );
            setIsModalVisible( true );

        } else if ( !verifySelectedField ) {
            console.log( 'seleccione una cancha' );
        }
        else if ( dateData.length === 0 ) {

            console.log( 'seleccione una fecha' );
        }
        // } else {
        //     errors.push( messageFieldError );
        //     // setErrorsArray(errors)
        //     console.log( 'errors', errors );
        //     console.log( 'array', errorsArray );
        // }
        // setTimeout( () => {
        //     while ( errors.length ) {
        //         errors.pop();
        //     }
        //     console.log( 'final errors', errors );
        // }, 2000 );
    };

    // console.log( 'errors: ', errors );

    useEffect( () => {

        setErrorsArray( errors );
        window.scrollTo( 0, 0 );

    }, [] );

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
                    // dateRef={cellRef}
                    // dateData={dateData}
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
        </div>
    );
} );

// export default TurnsPage;