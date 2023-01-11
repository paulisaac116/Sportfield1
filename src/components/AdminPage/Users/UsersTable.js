import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import '../../../styles/AdminPage/AdminPage.css';
import { RedButton } from '../../Buttons/RedButton';
import { db } from '../../../firebase';
import { splitData } from '../../../helpers/splitData';

export const UsersTable = React.memo( ( { tableData, activeUsers, currentPage, setUserData, setIsModalVisible, setDataSize } ) => {

    const [activeUsersArray, setActiveUsersArray] = useState( [] );
    const [inactiveUsersArray, setInactiveUsersArray] = useState( [] );

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

    useEffect( () => {

        const { active, inactive } = splitData( tableData );
        setActiveUsersArray( active );
        setInactiveUsersArray( inactive );


    }, [tableData] );

    useEffect( () => {

        activeUsers === true
            ? setDataSize( activeUsersArray.length )
            : setDataSize( inactiveUsersArray.length );

    }, [tableData, activeUsers, activeUsersArray, inactiveUsersArray] );


    return ( <>
        <div className='Users animate__animated animate__fadeIn'>
            <div className='table-users__head'>
                <p>Morador</p>
                <p>Lote</p>
                <p>Email</p>
                <p>Celular</p>
                <p>Acción</p>
            </div>
            <div className='table-users__body'>
                {
                    activeUsers === true
                        ? activeUsersArray[currentPage]?.map( ( user ) => (
                            <div className='table-users__body--row' key={user.id}>
                                <div className='body-row__data'>
                                    <p>{user.name} {user.lastName}</p>
                                    <p>{user.land}</p>
                                    <p>{user.email}</p>
                                    <p>{user.cellphone}</p>
                                </div>
                                <div className='body-row__buttons'>
                                    <RedButton
                                        button_name={'Desactivar'}
                                        button_func={() => handleDeactivateUser( user )}
                                    />
                                </div>
                            </div>
                        ) )
                        : inactiveUsersArray[currentPage]?.map( ( user ) => (
                            <div className='table-users__body--row' key={user.id}>
                                <div className='body-row__data'>
                                    <p>{user.name} {user.lastName}</p>
                                    <p>{user.land}</p>
                                    <p>{user.email}</p>
                                    <p>{user.cellphone}</p>
                                </div>
                                <div className='body-row__buttons'>
                                    <RedButton
                                        button_name={'Activar'}
                                        button_func={() => handleActivateUser( user )}
                                    />
                                </div>
                            </div>
                        ) )
                }
            </div>

        </div>
    </>
    );
} );

UsersTable.propTypes = {
    tableData: PropTypes.array,
    setUserData: PropTypes.func,
    setIsModalVisible: PropTypes.func
};