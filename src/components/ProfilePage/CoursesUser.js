import React, { useState } from 'react';
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
    const [courseData, setCourseData] = useState( [] );
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
        setCourseData( course );
        setIsModalUnsubscribeVisible( true );

    };

    const showModalRegister = () => {
        bodyOverflow( 'hidden' );
        setIsModalRegisterVisible( true );
    };

    return (
        <div className="field__frame">
            <div className="courses__title">RESERVA DE CURSOS</div>
            <div className="field__table courses__table">
                {
                    loading
                        ? <FontAwesomeIcon icon={faSpinner} className='animate-spin fa-2x text-white' />
                        : userData?.courses.length === 0
                            ? ( emptyCourses() )
                            : userData?.courses.map( ( course, key ) => (
                                <div className='field__table--row' key={key}>
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
                course={courseData}
                userData={userData}
            />
        </div>
    );
};
