import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

import { PurpleButton } from '../Buttons/PurpleButton';
import { GreenButton } from '../Buttons/GreenButton';

import '../../styles/ProfilePage/ProfilePage.css';
import { db } from '../../firebase';
import { bodyOverflow } from '../../helpers/bodyOverflow';
import { ErrorMessage } from '../ErrorMessage';
import { Message } from '../Message';

export const ModalRegisterCourse = ( { isModalVisible, setIsModalVisible, courses, userData, setArrayMessage } ) => {

    const [courseIdSelected, setCourseIdSelected] = useState( '' );

    const [arrayMessageCourseError, setArrayMessageCourseError] = useState( [] );

    const [activeCourses, setActiveCourses] = useState( [] );

    const scrollTop = () => {
        document.getElementById( 'table-scoll' ).scrollTop = 0;
    };


    const hiddeModal = () => {
        bodyOverflow( 'auto' );
        setCourseIdSelected( '' );
        setIsModalVisible( false );
        scrollTop();
    };
    const handleRegisterCourse = async () => {

        if ( courseIdSelected === '' ) setArrayMessageCourseError(
            [
                ...arrayMessageCourseError,
                <ErrorMessage
                    messageContent={'Seleccione un curso'}
                />
            ]
        );
        else {

            const course = courses?.find( item => item.id === courseIdSelected );
            delete course.registered;

            const courseUser = userData.courses?.find( item => item.id === course.id );

            if ( courseUser === undefined ) {

                try {

                    await db.collection( 'Users' ).doc( userData?.id ).update( {
                        courses: firebase.firestore.FieldValue.arrayUnion( {
                            id: course.id,
                        } )
                    } );

                    await db.collection( 'Courses' ).doc( courseIdSelected ).update( {
                        registered: firebase.firestore.FieldValue.arrayUnion( {
                            id: userData.id,
                            name: userData.name,
                            lastName: userData.lastName,
                            email: userData.email,
                            land: userData.land
                        } )
                    } );

                    bodyOverflow( 'auto' );
                    setIsModalVisible( false );
                    setCourseIdSelected( '' );
                    scrollTop();
                    setArrayMessage( prevState => ( [
                        ...prevState,
                        <Message
                            messageContent={'Inscrito'}
                        />
                    ] ) );


                } catch ( error ) {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log( errorCode );
                    console.log( errorMessage );

                }

            }

            else {

                setArrayMessageCourseError( [
                    ...arrayMessageCourseError,
                    <ErrorMessage
                        messageContent={'Ya est??s inscrito en el curso'}
                    />
                ] );

            }

        }
    };

    const changeColor = ( id ) => {
        if ( courseIdSelected !== id ) setCourseIdSelected( id );
    };

    useEffect( () => {

        const active = courses?.filter( course => course.active === true );
        setActiveCourses( active );

    }, [courses] );

    // useEffect( () => {

    //     setTimeout( () => {
    //         while ( arrayMessageCourseError.length !== 0 ) {
    //             arrayMessageCourseError.pop();
    //         }
    //     }, 4000 );

    // }, [arrayMessageCourseError] );

    return (
        <div className={`modal animate__animated ${isModalVisible ? 'flex animate__fadeIn' : 'hidden'}`}>
            <div className='modal__content modal__registered-course'>
                <h1 className='modal__content--title'>Registrarse en curso</h1>
                <p className='modal__deleteUser--text'>Seleccione el curso en que deseas inscribirte</p>
                <div id='table-scoll' aria-labelledby='content' tabIndex='0' role='region' className='table__content overflow-y-auto'>
                    <table className='Courses animate__animated animate__fadeIn'>
                        <thead>
                        </thead>
                        {activeCourses?.map( ( course ) => (
                            <tbody key={course.id}>
                                <tr
                                    className={`table-courses__data ${courseIdSelected === course.id ? 'purple-light  outline outline-2 outline-white' : ''}`}
                                    onClick={() => changeColor( course.id )}
                                >
                                    <td className='td__title'>{`${course.title}`}</td>
                                    <td className='td__description'>{`${course.description}`}</td>
                                </tr>
                            </tbody>
                        ) )}
                    </table>
                </div>
                <div className='modal__buttons'>
                    <GreenButton
                        button_name='Registrarse'
                        button_func={handleRegisterCourse}
                    />
                    <PurpleButton
                        button_name='Cancelar'
                        button_func={hiddeModal}
                    />

                </div>

            </div>
            {
                arrayMessageCourseError.map( message => (
                    message
                ) )
            }
        </div >
    );
};
