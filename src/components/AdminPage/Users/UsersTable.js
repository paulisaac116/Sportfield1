import React, { useEffect, useState } from 'react';
import { splitData } from '../../../helpers/splitData';

import PropTypes from 'prop-types';
import { User } from './User';

import '../../../styles/AdminPage/AdminPage.css';

export const UsersTable = React.memo( ( { tableData, activeUsers, currentPage, setUserData, setIsModalVisible, setDataSize, filter } ) => {

    const [activeUsersArray, setActiveUsersArray] = useState( [] );
    const [inactiveUsersArray, setInactiveUsersArray] = useState( [] );
    const [usersArray, setUsersArray] = useState( [] );

    // const handleDeactivateUser = ( item ) => {
    //     setUserData( item );
    //     setIsModalVisible( true );
    // };

    // const handleActivateUser = async ( item ) => {
    //     try {
    //         await db.collection( 'Users' ).doc( item.id ).update( {
    //             active: true
    //         } )
    //             .then( () => console.log( 'User activated' ) );
    //     } catch ( error ) {
    //         const errorCode = error.code;
    //         const errorMesage = error.message;
    //         console.log( 'errorCode: ', errorCode );
    //         console.log( 'errorMesagge: ', errorMesage );
    //     }

    // };

    useEffect( () => {

        console.log( 'table data: ', tableData );

        const { active, inactive } = splitData( tableData );
        setActiveUsersArray( active );
        setInactiveUsersArray( inactive );


    }, [tableData] );

    useEffect( () => {

        activeUsers === true
            ? setUsersArray( activeUsersArray )
            : setUsersArray( inactiveUsersArray );

        setDataSize( usersArray.length );

    }, [activeUsers, activeUsersArray, inactiveUsersArray, usersArray] );



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
                {/* {
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
                } */}
                {

                    filter.length === 0
                        ? usersArray[currentPage]?.map( user => (
                            <User
                                key={user.id}
                                user={user}
                                setIsModalVisible={setIsModalVisible}
                                setUserData={setUserData}
                                filter={filter}
                            />
                        ) )
                        : tableData?.map( user => (
                            filter.toLowerCase() === user.name.toLowerCase().slice( 0, filter.length ) || filter.toLowerCase() === user.lastName.toLowerCase().slice( 0, filter.length )
                                ? <User
                                    key={user.id}
                                    user={user}
                                    setIsModalVisible={setIsModalVisible}
                                    setUserData={setUserData}

                                />
                                : <></>

                        ) )

                }
                {usersArray[0]?.length === 0 && <p className='no-users'>Sin usuarios</p>}
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