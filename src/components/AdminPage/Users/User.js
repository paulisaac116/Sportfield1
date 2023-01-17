import React from 'react';
import { db } from '../../../firebase';
import { RedButton } from '../../Buttons/RedButton';

export const User = ( { user, setUserData, setIsModalVisible, filter } ) => {

    const handleDeactivateUser = ( item ) => {
        setUserData( item );
        setIsModalVisible( true );

    };

    const handleActivateUser = async ( item ) => {
        try {
            await db.collection( 'Users' ).doc( item.id ).update( {
                active: true
            } )
                .then( () => console.log( 'User activated' ) );
        } catch ( error ) {
            const errorCode = error.code;
            const errorMesage = error.message;
            console.log( 'errorCode: ', errorCode );
            console.log( 'errorMesagge: ', errorMesage );
        }

    };
    return (
        <>
            {/* {

                filter.toLowerCase() === user.name.toLowerCase().slice( 0, filter.length ) || filter.toLowerCase() === user.lastName.toLowerCase().slice( 0, filter.length )
                    ? <div className='table-users__body--row' key={user.id}>
                        <div className='body-row__data'>
                            <p>{user.name} {user.lastName}</p>
                            <p>{user.land}</p>
                            <p>{user.email}</p>
                            <p>{user.cellphone}</p>
                        </div>
                        <div className='body-row__buttons'>
                            {
                                user.active === true
                                    ? <RedButton
                                        button_name={'Desactivar'}
                                        button_func={() => handleDeactivateUser( user )}
                                    />
                                    : <RedButton
                                        button_name={'Activar'}
                                        button_func={() => handleActivateUser( user )}
                                    />
                            }

                        </div>
                    </div>
                    : <></>

            } */}

            <div className='table-users__body--row' key={user.id}>
                <div className='body-row__data'>
                    <p>{user.name} {user.lastName}</p>
                    <p>{user.land}</p>
                    <p>{user.email}</p>
                    <p>{user.cellphone}</p>
                </div>
                <div className='body-row__buttons'>
                    {
                        user.active === true
                            ? <RedButton
                                button_name={'Desactivar'}
                                button_func={() => handleDeactivateUser( user )}
                            />
                            : <RedButton
                                button_name={'Activar'}
                                button_func={() => handleActivateUser( user )}
                            />
                    }

                </div>
            </div>
        </>

    );
};
