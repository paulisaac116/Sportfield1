import React, { useEffect, useState } from 'react';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';
import PropTypes from 'prop-types';

import { ModalDeleteCourse } from './Courses/ModalDeleteCourse';
import { ModalDeleteUser } from './Users/ModalDeleteUser';
import { ModalEditCourse } from './Courses/ModalEditCourse';
import { ModalDeleteTurn } from './Turns/ModalDeleteTurn';
import { UsersTable } from './Users/UsersTable';
import { TurnsTable } from './Turns/TurnsTable';
import { CoursesTable } from './Courses/CoursesTable';
import { NotificationsTable } from './Notifications/NotificationsTable';

import 'animate.css';
import '../../styles/AdminPage/AdminPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Stack } from '@mui/system';
import { Pagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CommentsTable } from './Comments/CommentsTable';

export const Table = React.memo( ( { iconActive, activeUsers, activeTurns, activeCourses, currentPage, setArrayMessageDeleteUser, setArrayMessageDeleteTurn, setArrayMessageEditCourse, setArrayMessageDeleteCourse, setCurrentPage } ) => {

    const { data: tableData, loading } = useFetchFirestore( iconActive );

    const [usersArray, setUsersArray] = useState( [] );
    const [turnsArray, setTurnsArray] = useState( [] );
    const [coursesArray, setCoursesArray] = useState( [] );
    const [notificationsArray, setNotificationsArray] = useState( [] );
    const [commentsArray, setCommentsArray] = useState( [] );

    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState( false );
    const [userData, setUserData] = useState( {} );

    const [isModalDeleteTurnVisible, setIsModalDeleteTurnVisible] = useState( false );
    const [turnData, setTurnData] = useState( {} );

    const [isModalEditCourseVisible, setIsModalEditCourseVisible] = useState( false );
    const [isModalDeleteCourseVisible, setIsModalDeleteCourseVisible] = useState( false );
    const [courseData, setCourseData] = useState( {} );

    const [dataSize, setDataSize] = useState( 0 );

    // Custom Color Palette
    const theme = createTheme( {
        palette: {
            custom: {
                main: '#784DBB',
                contrastText: '#ffffff'
            }
        }
    } );

    useEffect( () => {
        console.log( 'data size: ', dataSize );
    }, [dataSize] );

    useEffect( () => {

        iconActive === 'Users'
            ? setUsersArray( tableData )
            : iconActive === 'Turns'
                ? setTurnsArray( tableData )
                : iconActive === 'Courses'
                    ? setCoursesArray( tableData )
                    : iconActive === 'Notifications'
                        ? setNotificationsArray( tableData )
                        : setCommentsArray( tableData );


        setCurrentPage( 0 );

    }, [iconActive, tableData] );

    return (
        <>
            <div className='table__content'>
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
                            activeUsers={activeUsers}
                            currentPage={currentPage}
                            setUserData={setUserData}
                            setIsModalVisible={setIsModalDeleteVisible}
                            setDataSize={setDataSize}
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
                                turnsData={turnsArray}
                                activeTurns={activeTurns}
                                currentPage={currentPage}
                                setTurnData={setTurnData}
                                setIsModalVisible={setIsModalDeleteTurnVisible}
                                setDataSize={setDataSize}
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
                                    activeCourses={activeCourses}
                                    currentPage={currentPage}
                                    setCourseData={setCourseData}
                                    setIsModalEditVisible={setIsModalEditCourseVisible}
                                    setIsModalDeleteVisible={setIsModalDeleteCourseVisible}
                                    setDataSize={setDataSize}
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
                                ? <>
                                    <CommentsTable
                                        tableData={tableData}
                                        currentPage={currentPage}
                                        setDataSize={setDataSize}
                                    />

                                </>

                                : !loading && iconActive === 'Notifications'
                                    ? <>
                                        <NotificationsTable
                                            tableData={tableData}
                                            currentPage={currentPage}
                                            setDataSize={setDataSize}
                                        />

                                    </>
                                    : <></>
                }
            </div>
            <ThemeProvider theme={theme}>
                <Stack className='pagination'>
                    <Pagination
                        count={dataSize}
                        shape='rounded'
                        color='custom'
                        disabled={dataSize === 1 ? true : false}
                        onChange={( e, page ) => setCurrentPage( page - 1 )}
                        page={currentPage + 1}
                    />
                </Stack>
            </ThemeProvider>
        </>
    );
} );


Table.propTypes = {
    iconActive: PropTypes.string,
    setArrayMessageDeleteUser: PropTypes.func,
    setArrayMessageDeleteTurn: PropTypes.func,
    setArrayMessageEditCourse: PropTypes.func,
    setArrayMessageDeleteCourse: PropTypes.func,
};