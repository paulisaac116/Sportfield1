import React from 'react';
import firebase from 'firebase';

import { RedButton } from '../Buttons/RedButton';
import { PurpleButton } from '../Buttons/PurpleButton';
import { db } from '../../firebase';
import { bodyOverflow } from '../../helpers/bodyOverflow';

export const ModalUnsubscribeCourse = ( { isModalVisible, setIsModalVisible, course, userData } ) => {

    const handleDeleteCourse = () => {

        try {

            db.collection( 'Users' ).doc( userData?.id ).update( {
                courses: firebase.firestore.FieldValue.arrayRemove( {
                    id: course?.id,
                    title: course?.title,
                    description: course?.description
                } )
            } );

            db.collection( 'Courses' ).doc( course?.id ).update( {
                registered: firebase.firestore.FieldValue.arrayRemove( {
                    id: userData.id,
                    name: userData.name,
                    lastName: userData.lastName,
                    email: userData.email,
                    land: userData.land

                } )
            } );

            setIsModalVisible( false );
            bodyOverflow( 'auto' );
            console.log( 'curso borrado' );


        } catch ( error ) {

            const errorCode = error.code;
            const errorMessage = error.message;
            console.log( errorCode );
            console.log( errorMessage );
        }


    };

    const hiddeModal = () => {
        bodyOverflow( 'auto' );
        setIsModalVisible( false );

    };


    return (
        <div className={`modal animate__animated ${isModalVisible ? 'flex animate__fadeIn' : 'hidden'}`}>
            <div className='modal__content'>
                <h1 className='modal__content--title'>Anular inscripción</h1>
                <p className='modal__deleteUser--text'>Está a punto cancelar su registro en el siguiente curso:</p>
                {
                    <div className='modal__deleteUser--userData'>
                        <div className='userData--row'><p className='userData__title'>Curso:</p><p>{course?.title}</p></div>
                    </div>
                }
                <p className='modal__deleteUser--text'>¿Desea continuar?</p>
                <div className='modal__buttons'>
                    <RedButton
                        button_name='Anular'
                        button_func={handleDeleteCourse}
                    />
                    <PurpleButton
                        button_name='Cancelar'
                        button_func={hiddeModal}
                    />

                </div>

            </div>
        </div>
    );
};
