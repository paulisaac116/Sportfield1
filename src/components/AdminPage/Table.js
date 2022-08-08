import React, { useEffect, useState } from 'react';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';

import '../../styles/AdminPage/adminPage.css';
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
    console.log( 'table again' );

    return (

        <div aria-labelledby='content' tabIndex='0' role='region' className='table__content overflow-y-auto'>
            {loading &&
                <div className='loading-info'>
                    <FontAwesomeIcon icon={faSpinner} className='animate-spin fa-1x text-white' />
                    <p className="animate__animated animate__flash text-white">Cargando información</p>
                </div>
            }
            {!loading && iconActive === 'Users'
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
                                <tr key={`${item.id}`} className='table-users__data'>
                                    <td>{`${item.name}`}</td>
                                    <td>{`${item.lastName}`}</td>
                                    <td>{`${item.email}`}</td>
                                    <td>{`${item.land}`}</td>
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

                : !loading && iconActive === 'Turns'
                    ? <>
                        <table className='Turns'>
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
                            <tbody>
                                {
                                    tableData?.map( ( item ) => (

                                        <tr key={`${item.id}`} className='bg-purple-mid text-white mb-4 '>
                                            <td>{`${item.name}`}</td>
                                            <td>{`${item.lastName}`}</td>
                                            {Array.isArray( item.date )
                                                ? item.date.map( date => (
                                                    <>
                                                        <td>{`${date.day} ${date.date} de ${months[date.month]}`}</td>
                                                        <td>{`${hours.find( item => item.start === date.timeStart ).timeRange}`}</td>
                                                    </>
                                                ) )
                                                : <p>ups</p>


                                                // item.date?.map(date => console.log('date', date))
                                                // console.log(typeof item.date)
                                            }
                                            <td>{`${item.field?.fieldType} - ${item.field?.location}`}</td>
                                            <td>{`${item.savedIn?.day} de ${months[item.savedIn?.month]} de ${item.savedIn?.year} || ${item.savedIn?.hour}:${item.savedIn?.minute}`}</td>

                                        </tr>

                                    ) )
                                }
                            </tbody>
                        </table>
                    </>


                    : !loading && iconActive === 'Courses'
                        ? <>
                            <table className='Courses'>
                                <thead></thead>
                                {
                                    tableData?.map( ( item ) => (
                                        <tbody className=''>
                                            <tr key={`${item.id}`} className='bg-purple-mid text-white mb-4'>
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
                            ? <table className='Comments'>
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
                                    <table className='Notifications'>
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
