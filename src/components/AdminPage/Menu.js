import React, { useEffect, useState } from 'react';

import { menuAdminData } from '../../data/menuAdminData';
import { Table } from './Table';
import { GreenButton } from '../Buttons/GreenButton';
import { ModalAddUser } from './ModalAddUser';
import { ModalNotification } from './ModalNotification';
import { MessageAddUser } from './MessageAddUser';
import { MessageDeleteUser } from './MessageDeleteUser';

import '../../styles/AdminPage/adminPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalAddCourse } from './ModalAddCourse';
import { MessageAddCourse } from './MessageAddCourse';
import { MessageDeleteCourse } from './MessageDeleteCourse';
import { MessageEditUser } from './MessageEditUser';
import { MessageSendEmail } from './MessageSendEmail';
import { ModalDeleteCourse } from './ModalDeleteCourse';
import { Message } from '../Message';
import { ModalAddTurn } from './ModalAddTurn';

export const Menu = React.memo( () => {

    const [menuData, setMenuData] = useState( menuAdminData );
    const [iconActive, setIconActive] = useState( 'Users' );
    const [iconType, setIconType] = useState( 'Usuarios' );


    const [isModalAddUserVisible, setIsModalAddUserVisible] = useState( false );
    const [isModalAddTurnVisible, setIsModalAddTurnVisible] = useState( false );
    const [isModalAddCourseVisible, setIsModalAddCourseVisible] = useState( false );
    const [isModalAddNotificationVisible, setIsModalAddNotificationVisible] = useState( false );

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
                    setIsMessageDeleteUserVisible={setIsMessageDeleteUserVisible}
                    setIsMessageEditUserVisible={setIsMessageEditUserVisible}
                    setIsMessageSendEmail={setIsMessageSendEmail}
                    setIsMessageDeleteCourseVisible={setIsMessageDeleteCourseVisible}
                    setIsMessageEditCourseVisible={setIsMessageEditCourseVisible}
                />
                {
                    iconActive === 'Users'
                        ? <>
                            <GreenButton
                                button_name='Agregar usuario'
                                button_func={showModalAddUser}
                            />
                            <ModalAddUser
                                isModalAddUserVisible={isModalAddUserVisible}
                                setIsModalAddUserVisible={setIsModalAddUserVisible}
                                setIsMessageVisible={setIsMessageAddUserVisible}
                            />
                            <MessageAddUser
                                isMessageAddUserVisible={isMessageAddUserVisible}
                            />
                            <MessageDeleteUser
                                isMessageDeleteUserVisible={isMessageDeleteUserVisible}
                            />
                            <MessageEditUser
                                isMessageEditUserVisible={isMessageEditUserVisible}
                            />
                            <MessageSendEmail
                                isMessageSendEmail={isMessageSendEmail}
                            />


                        </>
                        : iconActive === 'Turns'
                            ? <>
                                <GreenButton
                                    button_name='Agregar turno'
                                    button_func={showModalAddTurn}
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
                                    />
                                    <ModalAddCourse
                                        isModalVisible={isModalAddCourseVisible}
                                        setIsModalVisible={setIsModalAddCourseVisible}
                                        setIsMessageVisible={setIsMessageAddCourseVisible}
                                    />
                                    <Message
                                        isMessageVisible={isMessageAddCourseVisible}
                                        messageContent={'Curso registrado'}
                                    />
                                    <Message
                                        isMessageVisible={isMessageDeleteCourseVisible}
                                        messageContent={'Curso eliminado'}
                                    />
                                    <Message
                                        isMessageVisible={isMessageEditCourseVisible}
                                        messageContent={'Curso editado'}
                                    />

                                </>
                                : iconActive === 'Notifications'
                                    ? <>
                                        <GreenButton
                                            button_name='Agregar notificación'
                                            button_func={showModalAddNotification}
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
