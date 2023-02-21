import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GreenButton } from '../../Buttons/GreenButton';
import { RedButton } from '../../Buttons/RedButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faAngleRight, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { splitData } from '../../../helpers/splitData';
import { months } from '../../../data/CalendarMonths';

export const CoursesTable = ( { tableData, activeCourses, currentPage, setCourseData, setIsModalEditVisible, setIsModalDeleteVisible, setDataSize } ) => {

    const [activeCoursesArray, setActiveCoursesArray] = useState( [] );
    const [finishedCoursesArray, setFinishedCoursesArray] = useState( [] );

    const showRegisteredUsers = ( id ) => {

        let newArray = activeCourses ? [...activeCoursesArray] : [...finishedCoursesArray];

        newArray.forEach( row => {
            row.forEach( course => {
                if ( course.registered.length && course.id === id ) course.showRegisteredUsersList = !course.showRegisteredUsersList;
            } );
        }
        );

        activeCourses ? setActiveCoursesArray( newArray ) : setFinishedCoursesArray( newArray );
    };

    const handleEditCourse = ( course ) => {
        setCourseData( course );
        setIsModalEditVisible( true );

    };

    const handleDeleteCourse = ( course ) => {
        setCourseData( course );
        setIsModalDeleteVisible( true );

    };

    useEffect( () => {

        activeCourses === true
            ? setDataSize( activeCoursesArray.length )
            : setDataSize( finishedCoursesArray.length );

    }, [tableData, activeCourses, activeCoursesArray, finishedCoursesArray] );

    useEffect( () => {

        let { active, inactive } = splitData( tableData );

        active.forEach( row => {
            row.forEach( course => {
                course.showRegisteredUsersList = false;
            } );
        } );

        inactive.forEach( row => {
            row.forEach( course => {
                course.showRegisteredUsersList = false;
            } );
        } );

        setActiveCoursesArray( active );
        setFinishedCoursesArray( inactive );

    }, [tableData] );

    return (
        <div className='Courses animate__animated animate__fadeIn'>
            <div className='table-courses__body'>
                {
                    activeCourses === true
                        ? activeCoursesArray[currentPage]?.map( ( course ) => (
                            <div className='table-courses__body--row' key={course.id}>
                                <div className='body-row__data-buttons'>
                                    <div className='body-row__data'>
                                        <p className='body-row__data--title'>{course.title}</p>
                                        <p>{course.description}</p>
                                        <div className='dateStart'>
                                            <p>Fecha inicio: </p>
                                            <p>{course.dateStart?.day} de {months[course.dateStart?.month]} de {course.dateStart?.year}</p>
                                        </div>
                                        <div className='dateEnd'>
                                            <p>Fecha finalización: </p>
                                            <p>{course.dateEnd?.day} de {months[course.dateEnd?.month]} de {course.dateEnd?.year}</p>
                                        </div>
                                        <div className='schedule'>
                                            <p>Horario: </p>
                                            <p>
                                                {`${course.timeStart?.hour.toString().length === 1 ? '0' + course.timeStart?.hour : course.timeStart?.hour}`}
                                                :
                                                {`${course.timeStart?.minute.toString().length === 1 ? '0' + course.timeStart?.minute : course.timeStart?.minute}`}
                                                <></> - <></>
                                                {`${course.timeEnd?.hour.toString().length === 1 ? '0' + course.timeEnd?.hour : course.timeEnd?.hour}`}
                                                :
                                                {`${course.timeEnd?.minute.toString().length === 1 ? '0' + course.timeEnd?.minute : course.timeEnd?.minute}`}
                                            </p>
                                        </div>
                                        <div className='cost'>
                                            <p>Costo: </p>
                                            <p> <FontAwesomeIcon icon={faDollarSign} size='xs' />{course.price ?? 0}</p>
                                        </div>
                                    </div>
                                    <div className='body-row__buttons'>
                                        <GreenButton
                                            button_name={'Editar'}
                                            button_func={() => handleEditCourse( course )}
                                        />
                                        <RedButton
                                            button_name={'Finalizar'}
                                            button_func={() => handleDeleteCourse( course )}
                                        />
                                    </div>
                                </div>
                                <div className='body-row__registered'>
                                    <div className={`body-row__registered--head ${course.showRegisteredUsersList ? 'radius-none bg-black' : ''}`} onClick={() => showRegisteredUsers( course.id )}>
                                        <h3>Registrados</h3>
                                        <div className='registered-head__usersNumber'>
                                            <p>{`${Array.isArray( course.registered ) ? course.registered.length : ''}`}</p>
                                            {
                                                course.showRegisteredUsersList
                                                    ? <FontAwesomeIcon icon={faAngleUp} className='fa-1x' />
                                                    : <FontAwesomeIcon icon={faAngleDown} className='fa-1x' />
                                            }

                                        </div>
                                    </div>
                                    <div className={`body-row__registered--body ${course.showRegisteredUsersList ? 'flex' : 'hidden'}`}>
                                        {
                                            Array.isArray( course.registered )
                                                ? course.registered.map( ( user ) => (
                                                    <div className={`registered-body__user`} key={user.id}>
                                                        <FontAwesomeIcon icon={faAngleRight} className='fa-1x' />
                                                        <div className='body-user__data'>
                                                            <p>{user.name} {user.lastName}</p>
                                                            <p>{user.email}</p>
                                                        </div>
                                                    </div>

                                                ) )
                                                : <p>No hay datos</p>
                                        }
                                    </div>
                                </div>

                            </div>
                        ) )
                        : finishedCoursesArray[currentPage]?.map( ( course ) => (
                            <div className='table-courses__body--row' key={course.id}>
                                <div className='body-row__data-buttons'>
                                    <div className='body-row__data'>
                                        <p className='body-row__data--title'>{course.title}</p>
                                        <p>{course.description}</p>
                                        <div className='dateStart'>
                                            <p>Fecha inicio: </p>
                                            <p>{course.dateStart?.day} de {months[course.dateStart?.month]} de {course.dateStart?.year}</p>
                                        </div>
                                        <div className='dateEnd'>
                                            <p>Fecha finalización: </p>
                                            <p>{course.dateEnd?.day} de {months[course.dateEnd?.month]} de {course.dateEnd?.year}</p>
                                        </div>
                                        <div className='schedule'>
                                            <p>Horario: </p>
                                            <p>
                                                {`${course.timeStart?.hour.toString().length === 1 ? '0' + course.timeStart?.hour : course.timeStart?.hour}`}
                                                :
                                                {`${course.timeStart?.minute.toString().length === 1 ? '0' + course.timeStart?.minute : course.timeStart?.minute}`}
                                                <></> - <></>
                                                {`${course.timeEnd?.hour.toString().length === 1 ? '0' + course.timeEnd?.hour : course.timeEnd?.hour}`}
                                                :
                                                {`${course.timeEnd?.minute.toString().length === 1 ? '0' + course.timeEnd?.minute : course.timeEnd?.minute}`}
                                            </p>

                                        </div>
                                        <div className='cost'>
                                            <p>Costo: </p>
                                            <p> <FontAwesomeIcon icon={faDollarSign} size='xs' />{course.price ?? 0}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='body-row__registered'>
                                    <div className={`body-row__registered--head ${course.showRegisteredUsersList ? 'radius-none bg-black' : ''}`} onClick={() => showRegisteredUsers( course.id )}>
                                        <h3>Registrados</h3>
                                        <div className='registered-head__usersNumber'>
                                            <p>{`${Array.isArray( course.registered ) ? course.registered.length : ''}`}</p>
                                            {
                                                course.showRegisteredUsersList
                                                    ? <FontAwesomeIcon icon={faAngleUp} className='fa-1x' />
                                                    : <FontAwesomeIcon icon={faAngleDown} className='fa-1x' />
                                            }

                                        </div>
                                    </div>
                                    <div className={`body-row__registered--body ${course.showRegisteredUsersList ? 'flex' : 'hidden'}`}>
                                        {
                                            Array.isArray( course.registered )
                                                ? course.registered.map( ( user ) => (
                                                    <div className={`registered-body__user`} key={user.id}>
                                                        <FontAwesomeIcon icon={faAngleRight} className='fa-1x' />
                                                        <div className='body-user__data'>
                                                            <p className='body-user__data--name'>{user.name} {user.lastName}</p>
                                                            <p className='body-user__data--email'>{user.email}</p>
                                                            <p className='body-user__data--phone'>{user.cellphone}</p>
                                                        </div>
                                                    </div>

                                                ) )
                                                : <p>No hay datos</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        ) )
                }
            </div>
        </div>
    );
};

CoursesTable.propTypes = {
    tableData: PropTypes.array,
    setCourseData: PropTypes.func,
    setIsModalEditVisible: PropTypes.func,
    setIsModalDeleteVisible: PropTypes.func

};
