import React, { useEffect, useState } from 'react';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';

import { Table } from './Table';
import { GreenButton } from '../Buttons/GreenButton';
import { ModalAddUser } from './Users/ModalAddUser';
import { ModalAddNotification } from './Notifications/ModalAddNotification';
import { ModalAddCourse } from './Courses/ModalAddCourse';
import { ModalAddTurn } from './Turns/ModalAddTurn';
import { BlackButton } from '../Buttons/BlackButton';

import { menuAdminData } from '../../data/menuAdminData';

import '../../styles/AdminPage/AdminPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

export const Menu = React.memo( () => {

    const [menuData, setMenuData] = useState( menuAdminData );
    const { data: adminData, loading } = useFetchFirestore( 'Admin' );

    let activeIcon = menuData.find( item => item.active ).name;
    let typeIcon = menuData.find( item => item.active ).text;
    let descriptionIcon = menuData.find( item => item.active ).description;

    const [iconActive, setIconActive] = useState( activeIcon );
    const [iconType, setIconType] = useState( typeIcon );
    const [description, setDescription] = useState( descriptionIcon );

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

        let menu = [...menuData];
        let icon = '';
        let type = '';
        let description = '';

        menu.forEach( item => {
            if ( item.id === iconId ) {
                item.active = true;
                icon = item.name;
                type = item.text;
                description = item.description;
            }
            else item.active = false;
        } );

        setIconActive( icon );
        setIconType( type );
        setDescription( description );
        setMenuData( menu );
    };

    // useEffect( () => {

    //     setTimeout( () => {
    //         while ( arrayMessageAddUser.length !== 0 ) {
    //             arrayMessageAddUser.pop();
    //         }
    //     }, 4000 );

    // }, [arrayMessageAddUser] );

    // useEffect( () => {

    //     // setTimeout( () => {
    //     //     while ( arrayMessageDeleteUser.length !== 0 ) {
    //     //         arrayMessageDeleteUser.pop();
    //     //     }
    //     // }, 4000 );
    //     // setTimeout( () => {
    //     //     arrayMessageDeleteUser.pop();
    //     // }, 4000 );
    //     // console.log( 'deactivate user array: ', arrayMessageDeleteUser );
    //     setTimeout( () => {

    //         // let message = [...arrayMessageDeleteTurn];
    //         arrayMessageDeleteUser.pop();

    //         // setArrayMessageDeleteUser( message );
    //         console.log( 'deactivate user array: ', arrayMessageDeleteUser );
    //     }, 4000 );



    // }, [arrayMessageDeleteUser] );


    // useEffect( () => {

    //     setTimeout( () => {
    //         while ( arrayMessageAddTurn.length !== 0 ) {
    //             arrayMessageAddTurn.pop();
    //         }
    //     }, 4000 );

    // }, [arrayMessageAddTurn] );

    // useEffect( () => {

    //     setTimeout( () => {
    //         while ( arrayMessageDeleteTurn.length !== 0 ) {
    //             arrayMessageDeleteTurn.pop();
    //         }
    //     }, 4000 );

    // }, [arrayMessageDeleteTurn] );

    // useEffect( () => {

    //     setTimeout( () => {
    //         while ( arrayMessageAddCourse.length !== 0 ) {
    //             arrayMessageAddCourse.pop();
    //         }
    //     }, 4000 );

    // }, [arrayMessageAddCourse] );

    // useEffect( () => {

    //     setTimeout( () => {
    //         while ( arrayMessageEditCourse.length !== 0 ) {
    //             arrayMessageEditCourse.pop();
    //         }
    //     }, 4000 );

    // }, [arrayMessageEditCourse] );

    // useEffect( () => {

    //     setTimeout( () => {
    //         while ( arrayMessageDeleteCourse.length !== 0 ) {
    //             arrayMessageDeleteCourse.pop();
    //         }
    //     }, 4000 );

    // }, [arrayMessageDeleteCourse] );

    // useEffect( () => {

    //     setTimeout( () => {
    //         while ( arrayMessageAddNotification.length !== 0 ) {
    //             arrayMessageAddNotification.pop();
    //         }
    //     }, 4000 );

    // }, [arrayMessageAddNotification] );

    return (
        <div className='admin-page__content'>
            <div className='menu-admin'>
                <div className='menu-admin__data'>
                    <FontAwesomeIcon icon={faSmile} size='2x' />
                    <div className='admin__data--info'>
                        <p className='admin'>Administrador</p>
                        <p className='email'>{adminData[0]?.email}</p>
                    </div>
                </div>
                <div className='menu__icon menu__style sm:hidden'>
                    {
                        menuData.map( ( item ) => (
                            <span key={item.id} className={`${item.active ? 'bg-black outline-1 outline-white outline' : 'bg-purple-dark'} `} onClick={() => changeIconState( item.id )} >
                                <FontAwesomeIcon icon={item.icon} className='fa-2x' />
                            </span>
                        ) )
                    }
                </div>

                <div className='menu__list menu__style'>
                    {
                        menuData.map( ( item ) => (
                            <div
                                key={item.id}
                                className={`menu__list--item ${item.active ? 'bg-black outline-1 outline-white outline' : 'bg-purple-dark'}`}
                                onClick={() => changeIconState( item.id )}
                            >
                                <span>
                                    <FontAwesomeIcon icon={item.icon} className='fa-2x' />
                                </span>
                                <p>{item.text}</p>
                            </div>
                        ) )
                    }
                </div>

            </div>
            <div className='menu__table'>
                <div className='table__title'>
                    <p className='table__title--title'>{iconType}</p>
                    <p className='table__title--desc'>{description}</p>
                </div>
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
                                button_name='Registrar morador'
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
                                    button_name='Agendar turno'
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
                                            button_name='Enviar notificaci??n'
                                            button_func={showModalAddNotification}
                                            extraClass='main-button'
                                        />
                                        <ModalAddNotification
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
