import React, { useEffect, useState } from 'react';
import { HeaderComp } from '../components/HeaderComp';
import { PurpleTitle } from '../components/PurpleTitle';
import { InstructionCard } from '../components/InstructionCard';
import { GreenButton } from '../components/Buttons/GreenButton';
import { FieldsTable } from '../components/TurnsPage/FieldsTable';
import { FieldBar } from '../components/TurnsPage/FieldBar';
import { HourBar } from '../components/TurnsPage/HourBar';

import '../styles/TurnsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Calendar } from '../components/TurnsPage/Calendar';
import { MessageFieldError } from '../components/TurnsPage/MessageFieldError';
import { ModalSaveTurn } from '../components/TurnsPage/ModalSaveTurn';

export const TurnsPage = React.memo(() => {

    const [verifySelectedField, setVerifySelectedField] = useState( false );
    const [verifySelectedDate, setVerifySelectedDate] = useState( false );

    const [fieldType, setFieldType] = useState( "" );
    const [fieldLocation, setFieldLocation] = useState( "" );
    const [fieldCode, setFieldCode] = useState( "" );
    const [fieldBackground, setFieldBackground] = useState( "" );

    const [fieldData, setFieldData] = useState([])
    const [dateData, setDateData] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState( false );
    const [isMessageFieldErrorVisible, setIsMessageFieldErrorVisible] = useState( 'hidden' );


    const [errorsArray, setErrorsArray] = useState( [] );

    const onSelect = ( date ) => {
        console.log( date );
    };

    const messageFieldError = <MessageFieldError />;
    let errors = [messageFieldError, messageFieldError];

    // console.log(messageFieldError)

    const saveTurn = () => {
        console.log('date on click ', dateData)
        if ( verifySelectedField && dateData.length !== 0) {
            console.log('puede agendar su turno')
            console.log('dateData lenght: ', dateData.length)
            setIsModalVisible(true);
            
        } else if(!verifySelectedField) {
            console.log('seleccione una cancha')
        }
         else if(dateData.length === 0){

            console.log('seleccione una fecha')
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

    const showModal = () => {
        setIsModalVisible( true );
    };

    const handleOk = () => {
        setIsModalVisible( false );
    };

    const handleCancel = () => {
        setIsModalVisible( false );
    };


    useEffect( () => {

        setErrorsArray( errors );

    }, [] );

    return (
        <div className='TurnsPage'>
            <HeaderComp />
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
                        setVerifySelectedDate={setVerifySelectedDate}
                        setDateData={setDateData}
                        confirmField={verifySelectedField}
                    />
                </div>
                <GreenButton
                    button_name="Agendar turno"
                    button_func={saveTurn}
                />
            </div>
            <ModalSaveTurn 
                isModalVisible={isModalVisible}
                fieldData={fieldData}
                dateData={dateData}
                setIsModalVisible={setIsModalVisible}
            />
        </div>
    );
});

// export default TurnsPage;