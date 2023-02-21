import React, { useEffect, useState } from 'react';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';
import { bodyOverflow } from '../../helpers/bodyOverflow';

import { GreenButton } from '../Buttons/GreenButton';
import { RedButton } from '../Buttons/RedButton';
import { ModalUnsubscribeCourse } from './ModalUnsubscribeCourse';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryQuarter, faSpinner, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { months } from '../../data/CalendarMonths';

export const CoursesUser = ( { userData, setIsModalRegisterVisible, setArrayMessage } ) => {

    const { data: coursesData, loading } = useFetchFirestore( 'Courses' );
    const [userCourses, setUserCourses] = useState( [] );
    const [courseToUnsuscribe, setCourseToUnsuscribe] = useState( [] );
    const [isModalUnsubscribeVisible, setIsModalUnsubscribeVisible] = useState( false );

    const showModalUnsubscribe = ( course ) => {
        bodyOverflow( 'hidden' );
        setCourseToUnsuscribe( course );
        setIsModalUnsubscribeVisible( true );

    };

    const showModalRegister = () => {
        bodyOverflow( 'hidden' );
        setIsModalRegisterVisible( true );
    };

    useEffect( () => {

        let userCoursesArray = [];

        userData.courses?.forEach( userCourse => {

            if ( coursesData.find( course => userCourse.id === course.id && course.active === true ) !== undefined ) {
                userCoursesArray.push( coursesData.find( course => userCourse.id === course.id && course.active === true ) );
            }

        } );

        setUserCourses( userCoursesArray );

    }, [coursesData, userData] );


    return (
        <div className="bottom__frame courses__frame">
            <div className="courses__title">RESERVA DE CURSOS</div>
            <div className="bottom__frame--table courses__table">
                {
                    loading
                        ? <FontAwesomeIcon icon={faSpinner} className='animate-spin fa-2x text-white' />
                        : userCourses.length === 0
                            ? <div className="empty-turn-bar empty-turn-bar__courses">
                                <div className='empty-turn-bar--icon'><FontAwesomeIcon size="2x" icon={faBatteryQuarter} /></div>
                                <p>No tienes cursos registrados</p>
                                <p>¡Registrate!</p>
                            </div>
                            : userCourses.map( ( course ) => (
                                course?.active
                                    ? <div className='courses__table--row table__row' key={course.id}>
                                        <div className='courses__table--data'>
                                            <div className='course-title'>
                                                <h3 className='courses__table--title'>{course.title}</h3>
                                                <p className='courses__table--desc'>{course.description}</p>
                                            </div>
                                            <div className='course-info'>
                                                <h3>INFORMACIÓN</h3>
                                                <div className='dateStart'>
                                                    <p>Fecha inicio:</p>
                                                    <p>{course.dateStart?.day} de {months[course.dateStart?.month]} de {course.dateStart?.year}</p>
                                                </div>
                                                <div className='dateEnd'>
                                                    <p>Fecha finalización: </p>
                                                    <p>{course.dateEnd?.day} de {months[course.dateEnd?.month]} de {course.dateEnd?.year}</p>
                                                </div>
                                                <div className='schedule'>
                                                    <p>Horario:</p>
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
                                        <div className='courses__table--button'>
                                            <RedButton
                                                button_name={'Anular'}
                                                button_func={() => showModalUnsubscribe( course )}
                                            />
                                        </div>
                                    </div>
                                    : <></>
                            ) )
                }
            </div>
            <div className="field__button">
                <GreenButton
                    button_name="Agendar"
                    button_func={showModalRegister}
                />
            </div>
            <ModalUnsubscribeCourse
                isModalVisible={isModalUnsubscribeVisible}
                setIsModalVisible={setIsModalUnsubscribeVisible}
                course={courseToUnsuscribe}
                userData={userData}
                setArrayMessage={setArrayMessage}
            />
        </div>
    );
};
