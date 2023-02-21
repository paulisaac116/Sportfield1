import React from 'react';
import PropTypes from 'prop-types';
import { db } from '../../../firebase';

import { PurpleButton } from '../../Buttons/PurpleButton';
import { RedButton } from '../../Buttons/RedButton';
import { Message } from '../../Message';

export const ModalDeleteUser = ( { user, isModalVisible, setIsModalVisible, setArrayMessage } ) => {

    const hiddeModal = () => {
        setIsModalVisible( false );
    };

    const handleDeactivateUser = async ( id ) => {

        try {
            await db.collection( 'Users' ).doc( id ).update( {
                active: false
            } )
                .then(
                    setIsModalVisible( false )

                ).then(
                    setArrayMessage( ( prevState ) => (
                        [
                            ...prevState,
                            <Message
                                messageContent={'Morador desactivado'}
                            />
                        ]
                    ) ) )
                .catch( () => console.log( 'Error when deactivating user' ) );


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
                <h1 className='modal__content--title'>Desactivar morador</h1>
                <p className='modal__deleteUser--text'>Está a punto de desactivar al siguiente morador:</p>

                <div className='modal__deleteUser--userData'>
                    <div className='userData--row'><p className='userData__title'>Morador:</p><p>{user.name} {user.lastName}</p></div>
                    {/* <div className='userData--row'><p className='userData__title'>Apellido: </p><p>{user.lastName}</p></div> */}
                    <div className='userData--row'><p className='userData__title'>Email: </p><p>{user.email}</p></div>
                    <div className='userData--row'><p className='userData__title'>Lote: </p><p>{user.land}</p></div>
                </div>

                <p className='modal__deleteUser--text'>¿Desea continuar?</p>

                <div className='modal__buttons'>
                    <PurpleButton
                        button_name='Cancelar'
                        button_func={hiddeModal}
                    />
                    <RedButton
                        button_name='Desactivar'
                        button_func={() => handleDeactivateUser( user.id )}
                    />
                </div>

            </div>
        </div>
    );
};


ModalDeleteUser.propTypes = {
    user: PropTypes.object,
    isModalVisible: PropTypes.bool,
    setIsModalVisible: PropTypes.func,
    setIsMessageDeleteUserVisible: PropTypes.func
};
