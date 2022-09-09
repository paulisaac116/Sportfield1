import React from 'react';
import PropTypes from 'prop-types';

import '../../../styles/AdminPage/AdminPage.css';
import { RedButton } from '../../Buttons/RedButton';

export const UsersTable = React.memo( ( { tableData, setUserData, setIsModalVisible } ) => {

    const handleDeleteUser = ( item ) => {
        setUserData( item );
        setIsModalVisible( true );
    };

    return ( <>
        <div className='Users animate__animated animate__fadeIn'>
            <div className='table-users__head'>
                <p>Nombre</p>
                <p>Apellido</p>
                <p>Email</p>
                <p>Lote</p>
            </div>
            <div className='table-users__body'>
                {
                    tableData?.map( ( item, key ) => (
                        <div className='table-users__body--row' key={key}>
                            <div className='body-row__data'>
                                <p>{`${item.name}`}</p>
                                <p>{`${item.lastName}`}</p>
                                <p>{`${item.email}`}</p>
                                <p>{`${item.land}`}</p>
                            </div>
                            <div className='body-row__buttons'>
                                <RedButton
                                    button_name={'Eliminar'}
                                    button_func={() => handleDeleteUser( item )}
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