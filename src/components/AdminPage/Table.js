import React, { useEffect, useState } from 'react';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';

import '../../styles/AdminPage/adminPage.css';
import 'animate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { GreenButton } from '../Buttons/GreenButton';
import { PurpleButton } from '../Buttons/PurpleButton';
import { ModalDeleteCourse } from './ModalDeleteCourse';
import { ModalDeleteUser } from './ModalDeleteUser';
import { ModalEditCourse } from './ModalEditCourse';
import { ModalEditUser } from './ModalEditUser';

import { months } from '../../data/CalendarMonths';
import { hours } from '../../data/CalendarHours';
import { ModalDeleteTurn } from './ModalDeleteTurn';
import { UsersTable } from './UsersTable';
import { ModalAddTurn } from './ModalAddTurn';

export const Table = React.memo( ( { iconActive, setIsMessageDeleteUserVisible, setIsMessageEditUserVisible, setIsMessageSendEmail, setIsMessageDeleteCourseVisible, setIsMessageEditCourseVisible } ) => {

    const { data: tableData, loading } = useFetchFirestore( iconActive );

    const [isModalEditVisible, setIsModalEditVisible] = useState( false );
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState( false );
    const [userData, setUserData] = useState( {} );

    const [isModalAddTurnVisible, setIsModalAddTurnVisible] = useState(false);
    const [isModalDeleteTurnVisible, setIsModalDeleteTurnVisible] = useState( false );
    const [turnData, setTurnData] = useState( {} );

    const [isModalEditCourseVisible, setIsModalEditCourseVisible] = useState( false );
    const [isModalDeleteCourseVisible, setIsModalDeleteCourseVisible] = useState( false );
    const [courseData, setCourseData] = useState( {} );

    // const [loading, setLoading] = useState( true );


    // const handleEditUser = ( item ) => {
    //     setUserData( item );
    //     setIsModalEditVisible( true );

    // };

    const handleDeleteUser = ( item ) => {
        setUserData( item );
        setIsModalDeleteVisible( true );

    };

    const handleDeleteTurn = ( item ) => {
        setTurnData( item );
        setIsModalDeleteTurnVisible( true );

    };

    const handleEditCourse = ( item ) => {
        setCourseData( item );
        setIsModalEditCourseVisible( true );
    };

    const handleDeleteCourse = ( item ) => {
        setCourseData( item );
        setIsModalDeleteCourseVisible( true );
    };
    console.log( 'table again' );

    return (

        <div aria-labelledby='content' tabIndex='0' role='region' className='table__content overflow-y-auto'>
            {loading &&
                <div className='loading-info animate__animated animate__fadeOut'>
                    <FontAwesomeIcon icon={faSpinner} className='animate-spin fa-1x text-white' />
                    <p className=" text-white">Cargando información</p>
                </div>
            }
            {!loading && iconActive === 'Users'
                ? <>
                    <UsersTable
                        tableData={tableData}
                        setUserData={setUserData}
                        setIsModalVisible={setIsModalDeleteVisible}
                    />
                    {/* <ModalEditUser
                        isModalVisible={isModalEditVisible}
                        setIsModalVisible={setIsModalEditVisible}
                        data={userData}
                        collection={iconActive}
                        setIsMessageEditUserVisible={setIsMessageEditUserVisible}
                        setIsMessageSendEmail={setIsMessageSendEmail}
                    /> */}
                    <ModalDeleteUser
                        isModalVisible={isModalDeleteVisible}
                        setIsModalVisible={setIsModalDeleteVisible}
                        setIsMessageDeleteUserVisible={setIsMessageDeleteUserVisible}
                        user={userData}
                    />
                </>

                : !loading && iconActive === 'Turns'
                    ? <>
                        <table className='Turns animate__animated animate__fadeIn'>
                            <thead>
                                <tr>
                                    <th scope='col'>Nombre</th>
                                    <th scope='col'>Apellido</th>
                                    {/* <th scope='col'>Fecha</th>
                            <th scope='col'>Hora</th>
                            <th scope='col'>Cancha</th>
                            <th scope='col'>Agendado</th> */}
                                </tr>

                            </thead>
                            {
                                tableData?.map( ( item, key ) => (
                                    <tbody key={key}>

                                        <tr key={`${item.id}`} className='bg-purple-mid text-white'>
                                            <td className='table-turns__td--name'>{`${item.name}`}</td>
                                            <td className='table-turns__td--lastName'>{`${item.lastName}`}</td>
                                            {Array.isArray( item.date )
                                                ? item.date.length === 1 || item.date[0]?.date !== item.date[1]?.date
                                                    ? item.date.map( ( date, key ) => (
                                                        <>
                                                            <td
                                                                className={`table-turns__td--date${item.date.length === 2 ? key + 1 : ''}`}
                                                                key={key}
                                                            >
                                                                {`${date.day} ${date.date} de ${months[date.month]}`}</td>
                                                            <td className='table-turns__td--hour' key={key + 100}>{`${hours.find( item => item.start === date.timeStart ).timeRange}`}</td>

                                                        </>
                                                    ) )
                                                    : <>
                                                        <td className='table-turns__td--date'>{`${item.date[0].day} ${item.date[0].date} de ${months[item.date[0].month]}`}</td>
                                                        {
                                                            item.date.map( ( date, key ) => (
                                                                <td key={key + 1000} className={`table-turns__td--hour${key + 1}`}>{`${hours.find( item => item.start === date.timeStart ).timeRange}`}</td>
                                                            ) )
                                                        }
                                                    </>

                                                : <td><p>ups</p></td>
                                            }
                                            <td className='table-turns__td--field'>{`${item.field?.fieldType} - ${item.field?.location}`}</td>
                                            <td className='table-turns__td--saved'>{`${item.savedIn?.day} de ${months[item.savedIn?.month]} de ${item.savedIn?.year} - ${item.savedIn?.hour}:${item.savedIn?.minute}`}</td>

                                        </tr>
                                        <tr
                                            key={key}
                                            className='table-turns__buttons'
                                        >
                                            <td>
                                                <PurpleButton
                                                    button_name='Eliminar'
                                                    button_func={() => handleDeleteTurn( item )}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>

                                ) )
                            }
                        </table>
                        <ModalAddTurn 
                            isModalVisible={isModalAddTurnVisible}
                            setIsModalVisible={setIsModalAddTurnVisible}
                        />
                        <ModalDeleteTurn
                            turn={turnData}
                            isModalVisible={isModalDeleteTurnVisible}
                            setIsModalVisible={setIsModalDeleteTurnVisible}

                        />
                    </>


                    : !loading && iconActive === 'Courses'
                        ? <>
                            <table className='Courses animate__animated animate__fadeIn'>
                                <thead></thead>
                                {
                                    tableData?.map( ( item ) => (
                                        <tbody>
                                            <tr key={`${item.id}`} className='bg-purple-mid text-white mb-4 table-courses__data'>
                                                <td className='td__title'>{`${item.title}`}</td>
                                                <td className='td__description'>{`${item.description}`}</td>
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

                        : !loading && iconActive === 'Comments'
                            ? <table className='Comments animate__animated animate__fadeIn'>
                                <thead></thead>
                                <tbody>
                                    {
                                        tableData?.map( ( item ) => (
                                            <tr key={`${item.id}`} className='table__comments--row'>
                                                <td>
                                                    <div className='table__comments--user-date'>
                                                        <div className='table__comments--user'>{`${item.userName} ${item.userLastName} (Lote ${item.userLand})`}</div>
                                                        <div className='table__comments--date'>{`${item.date}`}</div>

                                                    </div>
                                                </td>
                                                <td className='table__comments--title'>{`${item.title}`}</td>
                                                <td className='table__comments--desc'>{`${item.description}`}</td>
                                            </tr>
                                        ) )
                                    }
                                </tbody>

                            </table>



                            : !loading && iconActive === 'Notifications'
                                ? <>
                                    <table className='Notifications animate__animated animate__fadeIn'>
                                        <thead></thead>
                                        <tbody>
                                            {
                                                tableData?.map( ( item ) => (

                                                    <tr key={`${item.id}`} className='table__notifications--row'>
                                                        <td>
                                                            <div className='table__notifications--title-date'>
                                                                <div className='table__notifications--title'>{`${item.title}`}</div>
                                                                <div className='table__notifications--date'>{`${item.date}`}</div>
                                                            </div>
                                                        </td>
                                                        <td className='table__notifications--desc'>{`${item.description}`}</td>
                                                    </tr>

                                                ) )
                                            }
                                        </tbody>
                                    </table>

                                </>
                                : console.log( 'Database not founded' )
            }

        </div>
    );
} );
