import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { GreenButton } from '../../Buttons/GreenButton';
import { RedButton } from '../../Buttons/RedButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export const CoursesTable = ( { tableData, setCourseData, setIsModalEditVisible, setIsModalDeleteVisible } ) => {

    const [tableCourse, setTableCourse] = useState( [] );

    useEffect( () => {

        let newArray = tableData?.map( ( course ) => (
            {
                ...course,
                registerActive: false
            }
        ) );

        setTableCourse( newArray );

    }, [tableData] );


    const showRegisteredUsers = ( id ) => {

        let newArray = tableCourse.map( ( course ) => {

            if ( course.id === id ) course.registerActive = !course.registerActive;
            return course;
        } );

        setTableCourse( newArray );
    };

    const handleEditCourse = ( course ) => {
        setCourseData( course );
        setIsModalEditVisible( true );

    };

    const handleDeleteCourse = ( course ) => {
        setCourseData( course );
        setIsModalDeleteVisible( true );

    };

    return (
        <div className='Courses animate__animated animate__fadeIn'>
            <div className='table-courses__body'>
                {
                    tableCourse?.map( ( course, key ) => (
                        <div className='table-courses__body--row' key={key}>
                            <div className='body-row__data-buttons'>
                                <div className='body-row__data'>
                                    <p className='body-row__data--title'>{course.title}</p>
                                    <p>{course.description}</p>
                                </div>
                                <div className='body-row__buttons'>
                                    <GreenButton
                                        button_name={'Editar'}
                                        button_func={() => handleEditCourse( course )}
                                    />
                                    <RedButton
                                        button_name={'Eliminar'}
                                        button_func={() => handleDeleteCourse( course )}
                                    />
                                </div>
                            </div>
                            <div className='body-row__registered'>
                                <div className={`body-row__registered--head ${course.registerActive ? 'radius-none' : ''}`} onClick={() => showRegisteredUsers( course.id )}>
                                    <h3>Registrados</h3>
                                    <div className='registered-head__usersNumber'>
                                        <p>{`${Array.isArray( course.registered ) ? course.registered.length : ''}`}</p>
                                        {
                                            course.registerActive
                                                ? <FontAwesomeIcon icon={faAngleUp} className='fa-1x' />
                                                : <FontAwesomeIcon icon={faAngleDown} className='fa-1x' />
                                        }

                                    </div>
                                </div>
                                <div className={`body-row__registered--body ${course.registerActive ? 'flex' : 'hidden'}`}>
                                    {
                                        Array.isArray( course.registered )
                                            ? course.registered.map( ( user, key ) => (
                                                <div className={`registered-body__user`}>
                                                    <FontAwesomeIcon icon={faAngleRight} className='fa-1x' />
                                                    <div className='body-user__data'>
                                                        <p>{user.name} {user.lastName}</p>
                                                        <p>{user.email}</p>
                                                    </div>
                                                </div>

                                            ) )
                                            : <div className='bg-purple-mid h-full'></div>
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
