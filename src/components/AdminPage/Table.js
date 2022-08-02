import { icon } from '@fortawesome/fontawesome-svg-core';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';

import '../../styles/AdminPage/adminPage.css';
import { GreenButton } from '../Buttons/GreenButton';
import { PurpleButton } from '../Buttons/PurpleButton';
import { ModalDeleteCourse } from './ModalDeleteCourse';
import { ModalDeleteUser } from './ModalDeleteUser';
import { ModalEditCourse } from './ModalEditCourse';
import { ModalEditUser } from './ModalEditUser';

export const Table = React.memo( ( { iconActive, setIsMessageDeleteUserVisible, setIsMessageEditUserVisible, setIsMessageSendEmail, setIsMessageDeleteCourseVisible, setIsMessageEditCourseVisible } ) => {

    const { data: tableData, loading } = useFetchFirestore( iconActive );


    const [isModalEditVisible, setIsModalEditVisible] = useState( false );
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState( false );
    const [userData, setUserData] = useState( {} );

    const [isModalEditCourseVisible, setIsModalEditCourseVisible] = useState( false );
    const [isModalDeleteCourseVisible, setIsModalDeleteCourseVisible] = useState( false );
    const [courseData, setCourseData] = useState( {} );

    const handleEditUser = ( item ) => {
        setUserData( item );
        setIsModalEditVisible( true );

    };

    const handleDeleteUser = ( item ) => {
        setUserData( item );
        setIsModalDeleteVisible( true );

    };

    const handleEditCourse = ( item ) => {
        setCourseData( item );
        setIsModalEditCourseVisible( true );
    };

    const handleDeleteCourse = ( item ) => {
        setCourseData( item );
        setIsModalDeleteCourseVisible( true );
    };


    return (

        <div aria-labelledby='content' tabIndex='0' role='region' className='table__content overflow-y-auto'>
            {loading && <p className="animate__animated animate__flash text-white">Loading...</p>}
            {!loading && <>

                {iconActive === 'Users'
                    ? <>
                        <table className='Users'>
                            <thead>
                                <tr>
                                    <th scope='col' className='thead__name'>Nombre</th>
                                    <th scope='col' className='thead__lastName'>Apellido</th>
                                    <th scope='col' className='thead__email'>Email</th>
                                    <th scope='col' className='thead__land'>Lote</th>
                                    <th scope='col' className='thead__buttons'>buttons</th>
                                </tr>
                            </thead>
                            {tableData?.map( ( item, key ) => (
                                <tbody key={key}>
                                    <tr key={item.id} className='table-users__data'>
                                        <td>{item.name}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.land}</td>
                                    </tr>
                                    <tr className='table-users__buttons' key={key}>
                                        {/* <GreenButton
                                            button_name='Editar'
                                            button_func={() => handleEditUser( item )}
                                        /> */}
                                        <PurpleButton
                                            button_name='Eliminar'
                                            button_func={() => handleDeleteUser( item )}
                                        />
                                    </tr>
                                </tbody>
                            ) )}
                        </table>
                        <ModalEditUser
                            isModalVisible={isModalEditVisible}
                            setIsModalVisible={setIsModalEditVisible}
                            data={userData}
                            collection={iconActive}
                            setIsMessageEditUserVisible={setIsMessageEditUserVisible}
                            setIsMessageSendEmail={setIsMessageSendEmail}


                        />
                        <ModalDeleteUser
                            isModalVisible={isModalDeleteVisible}
                            setIsModalVisible={setIsModalDeleteVisible}
                            setIsMessageDeleteUserVisible={setIsMessageDeleteUserVisible}
                            user={userData}
                            collection={iconActive}
                        />
                    </>

                    : iconActive === 'Turns'
                        ? <>
                            <table className='Turns'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Nombre</th>
                                        <th scope='col'>Apellido</th>
                                        <th scope='col'>Fecha</th>
                                        <th scope='col'>Hora</th>
                                        <th scope='col'>Cancha</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        tableData?.map( ( item ) => (

                                            <tr key={item.id} className='bg-purple-mid text-white mb-4 '>
                                                <td>{item.name}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.data}</td>
                                                <td>{item.hour}</td>
                                                <td>{item.field}</td>
                                            </tr>

                                        ) )
                                    }
                                </tbody>
                            </table>
                        </>


                        : iconActive === 'Courses'
                            ? <>
                                <table className='Courses'>
                                    <thead></thead>
                                    {
                                        tableData?.map( ( item ) => (
                                            <tbody className=''>
                                                <tr key={item.id} className='bg-purple-mid text-white mb-4'>
                                                    <td className='td__title'>{item.title}</td>
                                                    <td className='td__description'>{item.description}</td>
                                                    {/* <td>{item.schedule}</td> */}
                                                </tr>
                                                <tr className='table-users__buttons courses-table__buttons'>
                                                    <GreenButton
                                                        button_name='Editar'
                                                        button_func={() => handleEditCourse( item )}
                                                    />
                                                    <PurpleButton
                                                        button_name='Eliminar'
                                                        button_func={() => handleDeleteCourse( item )}
                                                    />
                                                </tr>

                                            </tbody>
                                        ) )
                                    }
                                </table>
                                <ModalDeleteCourse
                                    course={courseData}
                                    isModalVisible={isModalDeleteCourseVisible}
                                    setIsModalVisible={setIsModalDeleteCourseVisible}
                                    collection={iconActive}
                                    setIsMessageVisible={setIsMessageDeleteCourseVisible}
                                />
                                <ModalEditCourse
                                    course={courseData}
                                    isModalVisible={isModalEditCourseVisible}
                                    setIsModalVisible={setIsModalEditCourseVisible}
                                    setIsMessageVisible={setIsMessageEditCourseVisible}
                                />
                            </>

                            : iconActive === 'Comments'
                                ? <table className='Comments'>
                                    <thead></thead>
                                    <tbody>
                                        {
                                            tableData?.map( ( item ) => (
                                                <tr key={item.id} className='table__comments--row'>
                                                    <td>
                                                        <div className='table__comments--user-date'>
                                                            <div className='table__comments--user'>{`${item.userName} ${item.userLastName} (Lote ${item.userLand})`}</div>
                                                            <div className='table__comments--date'>{`${item.date}`}</div>

                                                        </div>
                                                    </td>
                                                    <td className='table__comments--title'>{item.title}</td>
                                                    <td className='table__comments--desc'>{item.description}</td>
                                                </tr>
                                            ) )
                                        }
                                    </tbody>

                                </table>



                                : iconActive === 'Notifications'
                                    ? <>
                                        <table className='Notifications'>
                                            <thead></thead>
                                            <tbody>
                                                {
                                                    tableData?.map( ( item ) => (

                                                        <tr key={item.id} className='table__notifications--row'>
                                                            <td>
                                                                <div className='table__notifications--title-date'>
                                                                    <div className='table__notifications--title'>{item.title}</div>
                                                                    <div className='table__notifications--date'>{item.date}</div>
                                                                </div>
                                                            </td>
                                                            <td className='table__notifications--desc'>{item.description}</td>
                                                        </tr>
                                                    ) )
                                                }
                                            </tbody>
                                        </table>

                                    </>
                                    : console.log( 'Database not founded' )
                }
            </>}


        </div>
    );
} );