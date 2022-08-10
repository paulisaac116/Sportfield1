import React from 'react';
import { db } from '../../firebase';

import { PurpleButton } from '../Buttons/PurpleButton';
import { RedButton } from '../Buttons/RedButton';

export const ModalDeleteUser = ( { user, isModalVisible, setIsModalVisible, collection, setIsMessageDeleteUserVisible } ) => {


    // service cloud.fires 

    const hiddeModal = () => {
        setIsModalVisible( false );
    };

    const handleDeleteUser = async ( id ) => {

        // const user = firebase.auth().currentUser.uid

        try {
            await db.collection( collection ).doc( id ).delete()
                .then( () => console.log( 'User deleted' ) )
                .catch( () => console.log( 'Error deleting the user' ) );
            // await firebase.auth().currentUser.uid.de
        }
        catch ( error ) {
            const errorCode = error.code;
            const errorMesage = error.message;
            console.log( 'errorCode: ', errorCode );
            console.log( 'errorMesagge: ', errorMesage );
        }
        setIsModalVisible( false );
        setIsMessageDeleteUserVisible( 'flex slide-in-top' );
        setTimeout( () => setIsMessageDeleteUserVisible( 'flex slide-out-top' ), 3000 );
        setTimeout( () => setIsMessageDeleteUserVisible( 'hidden' ), 4000 );

    };


    return (
        <div className={`modal ${isModalVisible ? 'flex slide-in-fwd-center' : 'slide-out-bck-center hidden'}`}>
            <div className='modal__content'>
                <h1 className='modal__content--title'>Eliminar usuario</h1>
                <p className='modal__deleteUser--text'>Está a punto de eliminar al siguiente usuario:</p>
                <div className='modal__deleteUser--userData'>
                    <div className='userData--row'><p className='userData__title'>Nombre:    </p><p>{user.name}</p></div>
                    <div className='userData--row'><p className='userData__title'>Apellido: </p><p>{user.lastName}</p></div>
                    <div className='userData--row'><p className='userData__title'>Email: </p><p>{user.email}</p></div>
                    <div className='userData--row'><p className='userData__title'>Lote: </p><p>{user.land}</p></div>
                </div>
                <p className='modal__deleteUser--text'>¿Desea continuar?</p>
                <div className='modal__buttons'>
                    <RedButton
                        button_name='Eliminar'
                        button_func={() => handleDeleteUser( user.id )}
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
