import React, { useEffect, useState } from 'react';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';
import { bodyOverflow } from '../../helpers/bodyOverflow';

import { GreenButton } from '../Buttons/GreenButton';
import { RedButton } from '../Buttons/RedButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryQuarter } from '@fortawesome/free-solid-svg-icons';
import { ModalUnsubscribeCourse } from './ModalUnsubscribeCourse';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const CoursesUser = ( { userData, setIsModalRegisterVisible } ) => {

    const { data: coursesData, loading } = useFetchFirestore( 'Courses' );
    const [userCourses, setUserCourses] = useState( [] );
    const [courseToUnsuscribe, setCourseToUnsuscribe] = useState( [] );
    const [isModalUnsubscribeVisible, setIsModalUnsubscribeVisible] = useState( false );

    const emptyCourses = () => (
        <div className="empty-turn-bar">
            <div className='empty-turn-bar--icon'><FontAwesomeIcon size="2x" icon={faBatteryQuarter} /></div>
            <p>No tienes cursos registrados</p>
            <p>¡Registrate!</p>
        </div>
    );

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

        let userCourses = [];

        userData?.courses.forEach( courseUser => {

            userCourses.push( coursesData.find( course => courseUser.id === course.id ) );
        } );

        setUserCourses( userCourses );

    }, [coursesData, userData?.courses] );

    return (
        <div className="field__frame">
            <div className="courses__title">RESERVA DE CURSOS</div>
            <div className="field__table courses__table">
                {
                    loading
                        ? <FontAwesomeIcon icon={faSpinner} className='animate-spin fa-2x text-white' />
                        : userCourses.length === 0
                            ? ( emptyCourses() )
                            : userCourses.map( ( course ) => (
                                course?.active
                                    ? <div className='field__table--row' key={course.id}>
                                        <div className='courses__table--data'>
                                            <h3 className='courses__table--title'>{course.title}</h3>
                                            <p className='courses__table--desc'>{course.description}</p>
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
            />
        </div>
    );
};
