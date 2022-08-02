import React from 'react';

import { hours } from '../../data/CalendarHours';
import { months } from '../../data/CalendarMonths';
import { GreenButton } from '../Buttons/GreenButton';
import { PurpleButton } from '../Buttons/PurpleButton';

export const ModalSaveTurn = React.memo(( { isModalVisible, setIsModalVisible, dateData, fieldData } ) => {


    const hiddeModal = () => {
        setIsModalVisible( false );

    };

    // const 
    // console.log( dateData );


    const handleSaveTurn = async () => {

        try {

        } catch ( error ) {
            const message = error.message;
            console.log( message );

        }
    };


    // console.log('dateDate from modal', dateData)

    // console.log('dateData lenght from modal: ', dateData.length)


    return (
        <div className={`modal ${isModalVisible ? 'flex slide-in-fwd-center' : 'slide-out-bck-center hidden'}`}>
            <div className='modal__content'>
                <h1 className='modal__content--title'>Agendar turno</h1>
                <div className='modal-turn__content'>
                    <div className='modal-turn__field'>


                    </div>
                    <div className='modal-turn__data'>
                        <div className='modal-turn__data--row'>
                            <p>Cancha</p>
                            <p>{fieldData.fieldType}</p>

                        </div>
                        <div className='modal-turn__data--row'>
                            <p>Ubicación</p>
                            <p>{fieldData.location}</p>

                        </div>
                        {
                            dateData.length === 1 || dateData[0]?.date !== dateData[1]?.date
                                ? ( dateData.map( ( day, key ) => (
                                    <>
                                        <div className='modal-turn__data--row date-row' key={key}>
                                            <p>{`Fecha ${dateData.length === 2 ? key + 1 : ''}`}</p>
                                            <p>{`${day.day} ${day.date} de ${months[day.month]}`}</p>

                                        </div>
                                        <div className='modal-turn__data--row' key={key + 1}>
                                            <p>Hora</p>
                                            <p>{`${hours.find(item => item.start === day.timeStart).timeRange}`}</p>

                                        </div>
                                    </>
                                ) )
                                )
                                : ''

                        }

                    </div>
                </div>
                <div className='modal__buttons'>
                    <GreenButton
                        button_name='Guardar'
                        button_func={handleSaveTurn}
                    />
                    <PurpleButton
                        button_name='Cancelar'
                        button_func={hiddeModal}
                    />
                </div>
            </div>
        </div>
    );
});
