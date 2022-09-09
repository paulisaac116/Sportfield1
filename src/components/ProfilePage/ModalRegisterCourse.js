import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

import { PurpleButton } from '../Buttons/PurpleButton';
import { GreenButton } from '../Buttons/GreenButton';

import '../../styles/ProfilePage/ProfilePage.css';
import { db } from '../../firebase';
import { bodyOverflow } from '../../helpers/bodyOverflow';
import { ErrorMessage } from '../ErrorMessage';
import { Message } from '../Message';

export const ModalRegisterCourse = ( { isModalVisible, setIsModalVisible, courses, userData, setArrayMessage} ) => {

    const [courseIdSelected, setCourseIdSelected] = useState( '' );

    const [arrayMessageCourseError, setArrayMessageCourseError] = useState( [] );

    const scrollTop = () => {
        document.getElementById( 'table-scoll' ).scrollTop = 0;
    };


    const hiddeModal = () => {
        bodyOverflow( 'auto' );
        setCourseIdSelected( '' );
        setIsModalVisible( false );
        scrollTop();
    };
    const handleRegisterCourse = () => {
        if ( courseIdSelected === '' ) setArrayMessageCourseError(
            [
                ...arrayMessageCourseError,
                <ErrorMessage
                    messageContent={'Selecciona un curso'}
                />
            ]
        );
        else {


            const course = courses.find( item => item.id === courseIdSelected );
            delete course.registered;

            const courseUser = userData.courses.find( item => item.id === course.id );

            if ( courseUser === undefined ) {

                try {

                    db.collection( 'Users' ).doc( userData?.id ).update( {
                        courses: firebase.firestore.FieldValue.arrayUnion( {
                            id: course.id,
                            title: course.title,
                            description: course.description
                        } )
                    } );

                    db.collection( 'Courses' ).doc( courseIdSelected ).update( {
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
                    setArrayMessage([
                        <Message
                            messageContent={'Inscrito'}
                        />
                    ])
                    

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
                        messageContent={'Ya estás inscrito en el curso'}
                    />
                ] );

            }

        }
    };

    const changeColor = ( id ) => {
        if ( courseIdSelected !== id ) setCourseIdSelected( id );
    };


    useEffect( () => {

        setTimeout( () => {
            while ( arrayMessageCourseError.length !== 0 ) {
                arrayMessageCourseError.pop();
            }
        }, 4000 );

    }, [arrayMessageCourseError] );

    return (
        <div className={`modal animate__animated ${isModalVisible ? 'flex animate__fadeIn' : 'hidden'}`}>
            <div className='modal__content modal__registered-course'>
                <h1 className='modal__content--title'>Registrarse en curso</h1>
                <p className='modal__deleteUser--text'>Seleccione el curso en que deseas inscribirte</p>
                <div id='table-scoll' aria-labelledby='content' tabIndex='0' role='region' className='table__content overflow-y-auto'>
                    <table className='Courses animate__animated animate__fadeIn'>
                        <thead>
                        </thead>
                        {courses?.map( ( item, key ) => (
                            <tbody key={key}>
                                <tr
                                    className={`table-courses__data ${courseIdSelected === item.id ? 'purple-light border-solid border-2 border-white' : ''}`}
                                    onClick={() => changeColor( item.id )}
                                >
                                    <td className='td__title'>{`${item.title}`}</td>
                                    <td className='td__description'>{`${item.description}`}</td>
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
