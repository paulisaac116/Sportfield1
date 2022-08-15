import React, { useState } from 'react';
import firebase from 'firebase';

import { PurpleButton } from '../Buttons/PurpleButton';
import { GreenButton } from '../Buttons/GreenButton';

import '../../styles/ProfilePage/ProfilePage.css';
import { db } from '../../firebase';

export const ModalRegisterCourse = ( { isModalVisible, setIsModalVisible, courses, userData } ) => {

    const [courseIdSelected, setCourseIdSelected] = useState( '' );

    const scrollTop = () => {
        document.getElementById( 'table-scoll' ).scrollTop = 0;
    };


    const hiddeModal = () => {
        setCourseIdSelected( '' );
        setIsModalVisible( false );
        scrollTop();
    };
    const handleRegisterCourse = () => {
        if ( courseIdSelected === '' ) console.log( 'Select a course first :(' );
        else {

            console.log( 'userData, ', userData );

            const course = courses.find( item => item.id === courseIdSelected );
            delete course.registered;
            console.log( 'course selected', course );

            const courseUser = userData.courses.find( item => item.id === course.id );
            console.log( 'user courses: ', userData.courses );
            console.log( 'course user', courseUser );

            if ( courseUser === undefined ) {

                try {

                    db.collection( 'Users' ).doc( userData?.id ).update( {
                        courses: firebase.firestore.FieldValue.arrayUnion( {
                            id: course.id,
                            title: course.title,
                            description: course.description
                        } )
                    } );
                } catch ( error ) {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log( errorCode );
                    console.log( errorMessage );

                }

                setIsModalVisible( false );
                setCourseIdSelected( '' );
                scrollTop();
                console.log( 'registered :)' );

            }


            else {
                console.log( 'ya estas inscrito washo :v' );
                console.log( 'selecciona otro curso' );
            }

        }
    };

    const changeColor = ( id ) => {
        if ( courseIdSelected !== id ) setCourseIdSelected( id );
    };

    return (
        <div className={`modal ${isModalVisible ? 'flex slide-in-fwd-center' : 'slide-out-bck-center hidden'}`}>
            <div className='modal__content modal__registered-course'>
                <h1 className='modal__content--title'>Registrarse en curso</h1>
                <p className='modal__deleteUser--text'>Seleccione el curso en que deseas inscribirte</p>
                <div id='table-scoll' aria-labelledby='content' tabIndex='0' role='region' className='table__content overflow-y-auto'>
                    <table className='Courses animate__animated animate__fadeIn'>
                        <thead>
                        </thead>
                        {courses?.map( ( item, key ) => (
                            <tbody>
                                <tr
                                    key={`${key}`}
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
        </div >
    );
};
