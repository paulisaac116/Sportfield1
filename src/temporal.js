import React, { useState } from 'react';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';
import PropTypes from 'prop-types';

import { ModalDeleteCourse } from './Courses/ModalDeleteCourse';
import { ModalDeleteUser } from './Users/ModalDeleteUser';
import { ModalEditCourse } from './Courses/ModalEditCourse';
import { ModalDeleteTurn } from './Turns/ModalDeleteTurn';
import { UsersTable } from './Users/UsersTable';
import { TurnsTable } from './Turns/TurnsTable';
import { CoursesTable } from './Courses/CoursesTable';

import 'animate.css';
import '../../styles/AdminPage/AdminPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const Table = React.memo( ( { iconActive, setArrayMessageDeleteUser, setArrayMessageDeleteTurn, setArrayMessageEditCourse, setArrayMessageDeleteCourse } ) => {

    const { data: tableData, loading } = useFetchFirestore( iconActive );

    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState( false );
    const [userData, setUserData] = useState( {} );

    const [isModalDeleteTurnVisible, setIsModalDeleteTurnVisible] = useState( false );
    const [turnData, setTurnData] = useState( {} );

    const [isModalEditCourseVisible, setIsModalEditCourseVisible] = useState( false );
    const [isModalDeleteCourseVisible, setIsModalDeleteCourseVisible] = useState( false );
    const [courseData, setCourseData] = useState( {} );

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
                    <ModalDeleteUser
                        user={userData}
                        isModalVisible={isModalDeleteVisible}
                        setIsModalVisible={setIsModalDeleteVisible}
                        setArrayMessage={setArrayMessageDeleteUser}
                    />
                </>

                : !loading && iconActive === 'Turns'
                    ? <>
                        <TurnsTable
                            tursData={tableData}
                            setTurnData={setTurnData}
                            setIsModalVisible={setIsModalDeleteTurnVisible}
                        />
                        <ModalDeleteTurn
                            turn={turnData}
                            isModalVisible={isModalDeleteTurnVisible}
                            setIsModalVisible={setIsModalDeleteTurnVisible}
                            setArrayMessage={setArrayMessageDeleteTurn}

                        />
                    </>


                    : !loading && iconActive === 'Courses'
                        ? <>
                            <CoursesTable
                                tableData={tableData}
                                setCourseData={setCourseData}
                                setIsModalEditVisible={setIsModalEditCourseVisible}
                                setIsModalDeleteVisible={setIsModalDeleteCourseVisible}
                            />
                            <ModalDeleteCourse
                                course={courseData}
                                isModalVisible={isModalDeleteCourseVisible}
                                setIsModalVisible={setIsModalDeleteCourseVisible}
                                collection={iconActive}
                                setArrayMessage={setArrayMessageDeleteCourse}
                            />
                            <ModalEditCourse
                                course={courseData}
                                isModalVisible={isModalEditCourseVisible}
                                setIsModalVisible={setIsModalEditCourseVisible}
                                setArrayMessage={setArrayMessageEditCourse}
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
                                : <></>
            }

        </div>
    );
} );


Table.propTypes = {
    iconActive: PropTypes.string,
    setArrayMessageDeleteUser: PropTypes.func,
    setArrayMessageDeleteTurn: PropTypes.func,
    setArrayMessageEditCourse: PropTypes.func,
    setArrayMessageDeleteCourse: PropTypes.func,
};