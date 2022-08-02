import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { CoursesUser } from '../components/ProfilePage/CoursesUser';
import { FieldUser } from '../components/ProfilePage/FieldUser';
import { HeaderComp } from '../components/HeaderComp';
import { ProfileFrame } from '../components/ProfilePage/ProfileFrame';

import '../styles/ProfilePage/ProfilePage.css';
import { UserContext } from '../components/UserContext';
import { db, auth } from '../firebase';
import { ModalComment } from '../components/ProfilePage/ModalComment';
import { GreenButton } from '../components/Buttons/GreenButton';
import { MessageAddComment } from '../components/ProfilePage/MessageAddComment';

const ProfilePage = React.memo( () => {

    let history = useHistory();


    const [userData, setUserData] = useState( [] );
    const [isModalVisible, setIsModalVisible] = useState( false );
    const [isMessageAddCommentVisible, setIsMessageAddCommentVisible] = useState( 'hidden' );
    const userId = useContext( UserContext );

    const showModal = () => {
        setIsModalVisible( true );
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
        auth.onAuthStateChanged( ( user ) => {
            const userId = user?.uid;
            db.collection( "Users" ).doc( userId )
                .onSnapshot( ( doc ) => {
                    setUserData( doc.data() );
                } );
        } );
        // return () => {
        //     const unsubscribe = db.collection( "Users" )
        //         .onSnapshot( () => {
        //         } );
        //     unsubscribe();
        // };
    }, [userId] );

    return (
        <div className='ProfilePage'>
            <HeaderComp />
            <div className="profile__content">
                <ProfileFrame
                    userData={userData}
                />
                <GreenButton
                    button_class='green-button'
                    button_name="Enviar comentario"
                    button_func={showModal}
                />
                <ModalComment
                    userName={userData.name}
                    userLastName={userData.lastName}
                    userLand={userData.land}
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    setIsMessageVisible={setIsMessageAddCommentVisible}
                />
                <MessageAddComment
                    isMessageAddCommentVisible={isMessageAddCommentVisible}

                />
                <FieldUser />
                <CoursesUser />
            </div>
        </div>
    );
} );

export default ProfilePage;