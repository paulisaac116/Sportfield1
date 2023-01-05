import React from 'react';
import PropTypes from 'prop-types';
import { db } from '../../../firebase';

import { PurpleButton } from '../../Buttons/PurpleButton';
import { RedButton } from '../../Buttons/RedButton';
import { Message } from '../../Message';

export const ModalDeleteCourse = ( { course, isModalVisible, setIsModalVisible, collection, setArrayMessage } ) => {

    const hiddeModal = () => {
        setIsModalVisible( false );
    };

    const handleEndCourse = async ( id ) => {

        try {
            await db.collection( collection ).doc( id ).update( {
                active: false
            } );
            setIsModalVisible( false );
            setArrayMessage( ( prevState ) => (
                [
                    ...prevState,
                    <Message
                        messageContent={'Curso finalizado'}
                    />
                ]
            ) );

        }
        catch ( error ) {
            const errorCode = error.code;
            const errorMesage = error.message;
            console.log( 'errorCode: ', errorCode );
            console.log( 'errorMesagge: ', errorMesage );
        }
    };


    return (
        <div className={`modal animate__animated ${isModalVisible ? 'flex animate__fadeIn' : 'hidden'}`}>
            <div className='modal__content'>
                <h1 className='modal__content--title'>Finalizar curso</h1>
                <p className='modal__deleteUser--text'>Está a punto de finalizar el siguiente curso:</p>
                {
                    <div className='modal__deleteUser--userData'>
                        <div className='userData--row'><p className='userData__title'>Curso:</p><p>{course.title}</p></div>
                    </div>
                }
                <p className='modal__deleteUser--text'>¿Desea continuar?</p>

                <div className='modal__buttons'>
                    <PurpleButton
                        button_name='Cancelar'
                        button_func={hiddeModal}
                    />
                    <RedButton
                        button_name='Finalizar'
                        button_func={() => handleEndCourse( course.id )}
                    />
                </div>
            </div>
        </div>
    );
};

ModalDeleteCourse.propTypes = {
    turn: PropTypes.array,
    isModalVisible: PropTypes.bool,
    setIsModalVisible: PropTypes.func,
    setArrayMessage: PropTypes.func
};
