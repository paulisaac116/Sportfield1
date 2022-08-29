import React from 'react';
import { db } from '../../../firebase';

import { PurpleButton } from '../../Buttons/PurpleButton';
import { RedButton } from '../../Buttons/RedButton';
import { Message } from '../../Message';

export const ModalDeleteCourse = ( { course, isModalVisible, setIsModalVisible, collection, setArrayMessage } ) => {


    const hiddeModal = () => {
        setIsModalVisible( false );
    };

    const handleDeleteCourse = async ( id ) => {

        try {
            await db.collection( collection ).doc( id ).delete();
            setIsModalVisible( false );
            setArrayMessage( ( prevState ) => (
                [
                    ...prevState,
                    <Message
                        messageContent={'Curso eliminado'}
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
        <div className={`modal ${isModalVisible ? 'flex slide-in-fwd-center' : 'slide-out-bck-center hidden'}`}>
            <div className='modal__content'>
                <h1 className='modal__content--title'>Eliminar curso</h1>
                <p className='modal__deleteUser--text'>Está a punto de eliminar al siguiente curso:</p>
                {
                    <div className='modal__deleteUser--userData'>
                        <div className='userData--row'><p className='userData__title'>Curso:</p><p>{course.title}</p></div>
                    </div>
                }
                <p className='modal__deleteUser--text'>¿Desea continuar?</p>
                
                <div className='modal__buttons'>
                    <RedButton
                        button_name='Eliminar'
                        button_func={() => handleDeleteCourse( course.id )}
                    />
                    <PurpleButton
                        button_name='Cancelar'
                        button_func={hiddeModal}
                    />
                </div>
            </div>
        </div>
    );
};
