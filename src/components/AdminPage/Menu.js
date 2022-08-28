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
import { Message } from '../Message';

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

    const [arrayMessageAddCourse, setArrayMessageAddCourse] = useState( [] );

    const [isMessageAddUserVisible, setIsMessageAddUserVisible] = useState( 'hidden' );
    const [isMessageEditUserVisible, setIsMessageEditUserVisible] = useState( 'hidden' );
    const [isMessageDeleteUserVisible, setIsMessageDeleteUserVisible] = useState( 'hidden' );
    const [isMessageSendEmail, setIsMessageSendEmail] = useState( 'hidden' );

    const [isMessageAddCourseVisible, setIsMessageAddCourseVisible] = useState( 'hidden' );
    const [isMessageDeleteCourseVisible, setIsMessageDeleteCourseVisible] = useState( 'hidden' );
    const [isMessageEditCourseVisible, setIsMessageEditCourseVisible] = useState( 'hidden' );



    const showModalAddUser = () => {
        setIsModalAddUserVisible( true );
    };
    const showModalAddTurn = () => {
        setIsModalAddTurnVisible( true );

    };
    const showModalAddCourse = () => {
        console.log( 'button click' );
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
                    setIsMessageEditUserVisible={setIsMessageEditUserVisible}
                    setIsMessageSendEmail={setIsMessageSendEmail}
                    setIsMessageDeleteCourseVisible={setIsMessageDeleteCourseVisible}
                    setIsMessageEditCourseVisible={setIsMessageEditCourseVisible}
                    setArrayMessageDeleteUser={setArrayMessageDeleteUser}
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
                                />

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
                                </>
                                : iconActive === 'Notifications'
                                    ? <>
                                        <GreenButton
                                            button_name='Agregar notificación'
                                            button_func={showModalAddNotification}
                                            extraClass='main-button'
                                        />
                                        <ModalNotification
                                            isModalAddNotificationVisible={isModalAddNotificationVisible}
                                            setIsModalAddNotificationVisible={setIsModalAddNotificationVisible}
                                        />
                                    </>
                                    : <></>
                }

            </div>
        </div>
    );
} );
