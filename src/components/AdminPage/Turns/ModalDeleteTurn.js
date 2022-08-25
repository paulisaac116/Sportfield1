import React from 'react';
import { db } from '../../../firebase';

import { PurpleButton } from '../../Buttons/PurpleButton';
import { RedButton } from '../../Buttons/RedButton';

import { months } from '../../../data/CalendarMonths';
import { hours } from '../../../data/CalendarHours';

export const ModalDeleteTurn = ( { turn, isModalVisible, setIsModalVisible } ) => {


    // service cloud.fires 

    const hiddeModal = () => {
        setIsModalVisible( false );
    };

    const handleDeleteTurn = async ( id ) => {

        console.log('item from modal: ', id)

        // try {
        //     await db.collection( 'Turns' ).doc( id ).delete()
        //         .then( () => console.log( 'User deleted' ) )
        //         .catch( () => console.log( 'Error deleting the user' ) );
        //     // await firebase.auth().currentUser.uid.de
        // }
        // catch ( error ) {
        //     const errorCode = error.code;
        //     const errorMesage = error.message;
        //     console.log( 'errorCode: ', errorCode );
        //     console.log( 'errorMesagge: ', errorMesage );
        // }
        // setIsModalVisible( false );
        // setIsMessageDeleteUserVisible( 'flex slide-in-top' );
        // setTimeout( () => setIsMessageDeleteUserVisible( 'flex slide-out-top' ), 3000 );
        // setTimeout( () => setIsMessageDeleteUserVisible( 'hidden' ), 4000 );

    };


    return (
        <div className={`modal ${isModalVisible ? 'flex slide-in-fwd-center' : 'slide-out-bck-center hidden'}`}>
            <div className='modal__content'>
                <h1 className='modal__content--title'>Eliminar turno</h1>
                <p className='modal__deleteUser--text'>Está a punto de eliminar al siguiente turno:</p>
                <div className='modal__deleteUser--userData'>
                    <div className='userData--row'><p className='userData__title'>Nombre:    </p><p>{turn.name}</p></div>
                    <div className='userData--row'><p className='userData__title'>Apellido: </p><p>{turn.lastName}</p></div>
                    { Array.isArray(turn.date)
                        ? turn.date.length === 1 || turn.date[0]?.date !== turn.date[1]?.date
                            ? turn.date.map( ( date, key ) => (
                                <>
                                    <div className='userData--row' key={key}>
                                        <p className='userData__title'>{`Fecha ${turn.date.length === 2 ? key + 1 : ''}: `}</p>
                                        <p>{`${date.day} ${date.date} de ${months[date.month]}`}</p>
                                    </div>
                                    <div className='userData--row'>
                                        <p className='userData__title'>Hora: </p>
                                        <p>{`${hours.find( turn => turn.start === date.timeStart ).timeRange}`}</p>
                                    </div>

                                </>
                            ) )
                            : <>
                                <div className='userData--row'>
                                    <p className='userData__title'>Fecha</p>
                                    <p>{`${turn.date[0].day} ${turn.date[0].date} de ${months[turn.date[0].month]}`}</p>
                                </div>
                                {
                                    turn?.date.map( ( date, key ) => (
                                        <div className='userData--row'>
                                            <p className='userData__title'>{`Hora ${key + 1}: `}</p>
                                            <p>{`${hours.find( item => item.start === date.timeStart ).timeRange}`}</p>
                                        </div>
                                    ) )
                                }
                            </>
                        : <p>no is not :c</p>
                    }
                    <div className='userData--row'><p className='userData__title'>Cancha: </p><p>{turn.field?.fieldType}<br></br>{turn.field?.location}</p></div>


                </div>
                <p className='modal__deleteUser--text'>¿Desea continuar?</p>
                <div className='modal__buttons'>
                    <RedButton
                        button_name='Eliminar'
                        button_func={() => handleDeleteTurn( turn.id )}
                    />
                    <PurpleButton
                        button_name='Cancelar'
                        button_func={hiddeModal}
                    />

                </div>

            </div>
        </div >
    );
};
