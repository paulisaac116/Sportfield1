import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchFirestore } from '../../../hooks/useFetchFirestore';
import PropTypes from 'prop-types';

import { PurpleButton } from '../../Buttons/PurpleButton';
import { GreenButton } from '../../Buttons/GreenButton';

import '../../../styles/AdminPage/AdminPage.css';
import { ErrorMessage } from '../../ErrorMessage';

export const ModalAddTurn = ( { isModalVisible, setIsModalVisible, setArrayMessage } ) => {

    const { data: tableData, loading } = useFetchFirestore( 'Users' );
    const [activeUsers, setActiveUsers] = useState( [] );
    const [userSelectedId, setUserSelectedId] = useState( '' );

    const [arrayUserSelectedError, setArrayUserSelectedError] = useState( [] );

    const navigate = useNavigate();

    const hiddeModal = () => {
        setUserSelectedId( '' );
        setIsModalVisible( false );
    };

    const gotoTurnsPage = () => {
        if ( userSelectedId === '' ) setArrayUserSelectedError( [
            ...arrayUserSelectedError,
            <ErrorMessage
                messageContent={'Seleccione un usuario'}
            />
        ] );
        else {
            navigate( '/turns', { state: { id: userSelectedId } } );
        };

    };

    const changeColor = ( id ) => {

        if ( userSelectedId !== id ) setUserSelectedId( id );

    };

    useEffect( () => {

        setTimeout( () => {
            while ( arrayUserSelectedError.length !== 0 ) {
                arrayUserSelectedError.pop();
            }
        }, 4000 );

    }, [arrayUserSelectedError] );

    useEffect( () => {

        let active = [];
        active = tableData.filter( user => user.active === true );
        setActiveUsers( active );

    }, [tableData] );


    return (
        <div className={`modal animate__animated ${isModalVisible ? 'flex animate__fadeIn' : 'hidden'}`}>
            <div className='modal__content modal__add-turn'>
                <h1 className='modal__content--title'>Agendar turno</h1>
                <p className='modal__deleteUser--text'>Seleccione un morador para el agendamiento de turno</p>
                <div aria-labelledby='content' tabIndex='0' role='region' className='table__content overflow-y-auto'>
                    <table>
                        <thead>
                            <tr>
                                <th scope='col' className='thead__name'>Morador</th>
                                <th scope='col' className='thead__land'>Lote</th>
                            </tr>
                        </thead>
                        {activeUsers?.map( ( user ) => (
                            <tbody
                                key={user.id}
                                className='modal__add-turn--body'
                            >
                                <tr
                                    className={`${userSelectedId === user.id ? 'purple-light outline outline-2 outline-white' : ''}`}
                                    id={user.id}
                                    onClick={() => changeColor( user.id )}
                                >
                                    <td><p className='user_addTurn_name'>{`${user.name}`}</p> <p>{`${user.lastName}`}</p></td>
                                    <td>{`${user.land}`}</td>
                                </tr>
                            </tbody>
                        ) )}
                    </table>
                </div>
                <div className='modal__buttons'>
                    <GreenButton
                        button_name='Continuar'
                        button_func={gotoTurnsPage}
                    />
                    <PurpleButton
                        button_name='Cancelar'
                        button_func={hiddeModal}
                    />
                </div>
                {
                    arrayUserSelectedError.map( message => (
                        message
                    ) )
                }

            </div>
        </div >
    );
};


ModalAddTurn.propTypes = {
    isModalVisible: PropTypes.bool,
    setIsModalVisible: PropTypes.func,
    setArrayMessage: PropTypes.func,
};