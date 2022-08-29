import React, { useEffect, useState } from 'react';

import { menuAdminData } from '../../data/menuAdminData';
import { Table } from './Table';
import { GreenButton } from '../Buttons/GreenButton';
import { ModalAddUser } from './Users/ModalAddUser';
import { ModalNotification } from './Notifications/ModalNotification';
import { ModalAddCourse } from './Courses/ModalAddCourse';
import { ModalAddTurn } from './Turns/ModalAddTurn';

import '../../styles/AdminPage/adminPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Menu = React.memo( () => {

    const [menuData, setMenuData] = useState( menuAdminData );
    const [iconActive, setIconActive] = useState( 'Users' );
    const [iconType, setIconType] = useState( 'Usuarios' );

    const [isModalAddUserVisible, setIsModalAddUserVisible] = useState( false );
    const [isModalAddTurnVisible, setIsModalAddTurnVisible] = useState( false );
    const [isModalAddCourseVisible, setIsModalAddCourseVisible] = useState( false );
    const [isModalAddNotificationVisible, setIsModalAddNotificationVisible] = useState( false );


    const [arrayMessageAddUser, setArrayMessageAddUser] = useState( [] );
    const [arrayMessageDeleteUser, setArrayMessageDeleteUser] = useState( [] );

    const [arrayMessageAddTurn, setArrayMessageAddTurn] = useState( [] );
    const [arrayMessageDeleteTurn, setArrayMessageDeleteTurn] = useState( [] );

    const [arrayMessageAddCourse, setArrayMessageAddCourse] = useState( [] );
    const [arrayMessageEditCourse, setArrayMessageEditCourse] = useState( [] );
    const [arrayMessageDeleteCourse, setArrayMessageDeleteCourse] = useState( [] );

    const [arrayMessageAddNotification, setArrayMessageAddNotification] = useState( [] );


    const showModalAddUser = () => {
        setIsModalAddUserVisible( true );
    };
    const showModalAddTurn = () => {
        setIsModalAddTurnVisible( true );

    };
    const showModalAddCourse = () => {
        setIsModalAddCourseVisible( true );
    };

    const showModalAddNotification = () => {
        setIsModalAddNotificationVisible( true );
    };

    const changeIconState = ( iconId ) => {

        const newObject = {};

        Object.keys( menuData ).map( item => {
            if ( menuData[item].id === iconId ) {
                menuData[item].active = true;
                newObject[item] = menuData[item];
                setIconActive( menuData[item].name );
                setIconType( menuData[item].text );
            }
            else {
                menuData[item].active = false;
                newObject[item] = menuData[item];
            }
        } );
        setMenuData( newObject );
    };

    useEffect( () => {
        setIconActive( 'Users' );
        setIconType( 'Usuarios' );
        setMenuData( menuAdminData );
    }, [] );

    useEffect( () => {

        setTimeout( () => {
            while ( arrayMessageAddUser.length !== 0 ) {
                arrayMessageAddUser.pop();
            }
        }, 4000 );

    }, [arrayMessageAddUser] );

    useEffect( () => {

        setTimeout( () => {
            while ( arrayMessageDeleteUser.length !== 0 ) {
                arrayMessageDeleteUser.pop();
            }
        }, 4000 );

    }, [arrayMessageDeleteUser] );


    useEffect( () => {

        setTimeout( () => {
            while ( arrayMessageAddTurn.length !== 0 ) {
                arrayMessageAddTurn.pop();
            }
        }, 4000 );

    }, [arrayMessageAddTurn] );

    useEffect( () => {

        setTimeout( () => {
            while ( arrayMessageDeleteTurn.length !== 0 ) {
                arrayMessageDeleteTurn.pop();
            }
        }, 4000 );

    }, [arrayMessageDeleteTurn] );

    useEffect( () => {

        setTimeout( () => {
            while ( arrayMessageAddCourse.length !== 0 ) {
                arrayMessageAddCourse.pop();
            }
        }, 4000 );

    }, [arrayMessageAddCourse] );

    useEffect( () => {

        setTimeout( () => {
            while ( arrayMessageEditCourse.length !== 0 ) {
                arrayMessageEditCourse.pop();
            }
        }, 4000 );

    }, [arrayMessageEditCourse] );

    return (
        <div className='admin-page__content'>
            <div className='menu__icon menu__style sm:hidden'>
                {Object.keys( menuData ).map( ( item, key ) => (
                    <span key={key} className={`${menuData[item].active ? 'bg-black' : 'bg-purple-dark'} `} >
                        <FontAwesomeIcon icon={menuData[item].icon} className='fa-2x' onClick={() => changeIconState( menuData[item].id )} />
                    </span>
                ) )}
            </div>

            <div className='menu__list menu__style'>
                {Object.keys( menuData ).map( ( item, key ) => (
                    <div
                        key={key}
                        className={`menu__list--item ${menuData[item].active ? 'bg-black' : 'bg-purple-dark'}`}
                        onClick={() => changeIconState( menuData[item].id )}
                    >
                        <span>
                            <FontAwesomeIcon icon={menuData[item].icon} className='fa-2x' />
                        </span>
                        <p>{menuData[item].text}</p>
                    </div>
                ) )}
            </div>
            <div className='menu__table'>
                <p className='table__title'>{iconType}</p>
                <Table
                    iconActive={iconActive}
                    setArrayMessageDeleteUser={setArrayMessageDeleteUser}
                    setArrayMessageDeleteTurn={setArrayMessageDeleteTurn}
                    setArrayMessageEditCourse={setArrayMessageEditCourse}
                    setArrayMessageDeleteCourse={setArrayMessageDeleteCourse}
                />
                {
                    iconActive === 'Users'
                        ? <>
                            <GreenButton
                                button_name='Agregar usuario'
                                button_func={showModalAddUser}
                                extraClass='main-button'
                            />
                            <ModalAddUser
                                isModalAddUserVisible={isModalAddUserVisible}
                                setIsModalAddUserVisible={setIsModalAddUserVisible}
                                setArrayMessage={setArrayMessageAddUser}
                            />
                            {
                                arrayMessageAddUser.map( message => (
                                    message
                                ) )
                            }
                            {
                                arrayMessageDeleteUser.map( message => (
                                    message
                                ) )
                            }
                        </>

                        : iconActive === 'Turns'
                            ? <>
                                <GreenButton
                                    button_name='Agregar turno'
                                    button_func={showModalAddTurn}
                                    extraClass='main-button'
                                />
                                <ModalAddTurn
                                    isModalVisible={isModalAddTurnVisible}
                                    setIsModalVisible={setIsModalAddTurnVisible}
                                    setArrayMessage={setArrayMessageAddTurn}
                                />
                                {
                                    arrayMessageAddTurn.map( message => (
                                        message
                                    ) )
                                }
                                {
                                    arrayMessageDeleteTurn.map( message => (
                                        message
                                    ) )
                                }

                            </>

                            : iconActive === 'Courses'
                                ? <>
                                    <GreenButton
                                        button_name='Agregar curso'
                                        button_func={showModalAddCourse}
                                        extraClass='main-button'
                                    />
                                    <ModalAddCourse
                                        isModalVisible={isModalAddCourseVisible}
                                        setIsModalVisible={setIsModalAddCourseVisible}
                                        setArrayMessage={setArrayMessageAddCourse}
                                    />
                                    {
                                        arrayMessageAddCourse.map( message => (
                                            message
                                        ) )
                                    }
                                    {
                                        arrayMessageEditCourse.map( message => (
                                            message
                                        ) )
                                    }
                                    {
                                        arrayMessageDeleteCourse.map( message => (
                                            message
                                        ) )
                                    }
                                </>

                                : iconActive === 'Notifications'
                                    ? <>
                                        <GreenButton
                                            button_name='Agregar notificación'
                                            button_func={showModalAddNotification}
                                            extraClass='main-button'
                                        />
                                        <ModalNotification
                                            isModalVisible={isModalAddNotificationVisible}
                                            setIsModalVisible={setIsModalAddNotificationVisible}
                                            setArrayMessage={setArrayMessageAddNotification}
                                        />
                                        {
                                            arrayMessageAddNotification.map( message => (
                                                message
                                            ) )
                                        }
                                    </>
                                    : <></>
                }

            </div>
        </div>
    );
} );
