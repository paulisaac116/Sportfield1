import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import firebase from 'firebase';
import { db, auth } from '../firebase';

import { CoursesUser } from '../components/ProfilePage/CoursesUser';
import { FieldUser } from '../components/ProfilePage/FieldUser';
import { HeaderComp } from '../components/HeaderComp';
import { ProfileFrame } from '../components/ProfilePage/ProfileFrame';
import { ModalComment } from '../components/ProfilePage/ModalComment';
import { GreenButton } from '../components/Buttons/GreenButton';
import { MessageAddComment } from '../components/ProfilePage/MessageAddComment';

import '../styles/ProfilePage/ProfilePage.css';
import { ModalRegisterCourse } from '../components/ProfilePage/ModalRegisterCourse';
import { useFetchFirestore } from '../hooks/useFetchFirestore';
import { ModalUnsubscribeCourse } from '../components/ProfilePage/ModalUnsubscribeCourse';
import { UserContext } from '../components/UserContext';
import { bodyOverflow } from '../helpers/bodyOverflow';

export const ProfilePage = React.memo( () => {

    const { data: coursesData, loading } = useFetchFirestore( 'Courses' );

    const [userSession, setUserSession] = useState( false );
    const [userData, setUserData] = useState( [] );

    const [isModalAddCommentVisible, setIsModalAddCommentVisible] = useState( false );
    const [isModalRegisterCourseVisible, setIsModalRegisterCourseVisible] = useState( false );

    const [isMessageAddCommentVisible, setIsMessageAddCommentVisible] = useState( 'hidden' );


    const userId = useContext( UserContext );
    const navigate = useNavigate();
    const location = useLocation();

    const showModal = () => {
        bodyOverflow( 'hidden' );
        setIsModalAddCommentVisible( true );
    };

    const handleOk = async ( commentTitle, commentContent ) => {

        try {
            await db.collection( "Comments" ).add( {
                title: commentTitle,
                content: commentContent,
                userName: userData.name,
                userLastName: userData.lastName,
                userLand: userData.land,
                // date: userInfo.date
            } );
            console.log( 'Comentario registrado con éxito' );

        } catch ( error ) {
            const errorCode = error.code;
            const errorMesage = error.message;
            console.log( 'errorCode: ', errorCode );
            console.log( 'errorMesagge: ', errorMesage );
        }
        // setUserData([]);
        document.getElementById( "comment-title" ).value = "";
        document.getElementById( "comment-content" ).value = "";

        // setIsModalVisible( false );
    };

    useEffect( () => {

        if ( location.state?.userData !== undefined ) {
            setUserSession( true );
        }

        else {
            navigate( '/login' );
        }

    }, [] );


    // useEffect( () => {
    //     auth.onAuthStateChanged( ( user ) => {
    //         const userId = user?.uid;
    //         db.collection( "Users" ).doc( userId )
    //             .onSnapshot( ( doc ) => {
    //                 setUserData( doc.data() );
    //             } );
    //     } );
    //     // return () => {
    //     //     const unsubscribe = db.collection( "Users" )
    //     //         .onSnapshot( () => {
    //     //         } );
    //     //     unsubscribe();
    //     // };
    // }, [userId] );

    // useEffect( () => {

    //     firebase.auth().onAuthStateChanged( ( user ) => {

    //         if ( user && userData?.email !== 'paulgualab@gmail.com' ) {
    //             setUserSession( true );
    //         } else navigate( '/login' );

    //     } );

    //     return () => {
    //         const unsubscribe = db.collection( "Users" )
    //             .onSnapshot( () => { } );
    //         unsubscribe();
    //     };
    // }, [userData] );


    return (
        userSession
            ? <div className='ProfilePage'>
                <HeaderComp />
                <div className="profile-content">
                    <div className='profile-content__top'>

                        <ProfileFrame
                            userData={userData}
                        />
                        <GreenButton
                            button_class='green-button'
                            button_name="Enviar comentario"
                            button_func={showModal}
                        />
                        <ModalComment
                            // userName={userData.name}
                            // userLastName={userData.lastName}
                            // userLand={userData.land}
                            userData={userData}
                            isModalVisible={isModalAddCommentVisible}
                            setIsModalVisible={setIsModalAddCommentVisible}
                            setIsMessageVisible={setIsMessageAddCommentVisible}
                        />
                        <MessageAddComment
                            isMessageAddCommentVisible={isMessageAddCommentVisible}

                        />
                    </div>
                    <div className='profile-content__bottom'>
                        <FieldUser
                            userData={userData}
                        />
                        <CoursesUser
                            userData={userData}
                            setIsModalRegisterVisible={setIsModalRegisterCourseVisible}
                        />
                        <ModalRegisterCourse
                            isModalVisible={isModalRegisterCourseVisible}
                            setIsModalVisible={setIsModalRegisterCourseVisible}
                            courses={coursesData}
                            userData={userData}
                        />
                    </div>

                </div>
            </div>
            : <div className='bg-purple-mid h-screen'></div>
    );
} );
