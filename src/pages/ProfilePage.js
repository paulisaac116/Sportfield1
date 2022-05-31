import { React, useState, useContext, useEffect } from 'react';
import { CoursesUser } from '../components/CoursesUser';
import { FieldUser } from '../components/FieldUser';
import { GreenButton } from '../components/GreenButton';
import { HeaderComp } from '../components/HeaderComp';
import { Profile } from '../components/Profile';

import '../styles/ProfilePage.css';
import { Modal, message } from 'antd';
import { UserContext } from '../components/UserContext';
import { db, auth} from '../firebase';


const ProfilePage = () => {

    const [userData, setUserData] = useState( [] );
    const [isModalVisible, setIsModalVisible] = useState( false );
    const userId = useContext( UserContext );

    const showModal = () => {
        setIsModalVisible( true );
    };

    const handleCancel = () => {

        setIsModalVisible( false );
    };

    const handleOk = async ( commentTitle, commentContent ) => {

        try {
            // await db.collection("Users").doc(userId).get().then( (doc) => userInfo = doc.data());
            // console.log('userInfo: ', userInfo);

            await db.collection( "Comments" ).add( {
                title: commentTitle,
                content: commentContent,
                userName: userData.name,
                userLastName: userData.lastName,
                userLand: userData.land,
                // date: userInfo.date
            } );
            message.success( 'Comentario registrado con éxito' );

        } catch ( error ) {
            const errorCode = error.code;
            const errorMesage = error.message;
            console.log( 'errorCode: ', errorCode );
            console.log( 'errorMesagge: ', errorMesage );
        }
        // setUserData([]);
        document.getElementById( "comment-title" ).value = "";
        document.getElementById( "comment-content" ).value = "";

        setIsModalVisible( false );
    };

    useEffect( () => {
        auth.onAuthStateChanged( ( user ) => {
            const userId = user.uid;
            db.collection( "Users" ).doc( userId )
                .onSnapshot( ( doc ) => {
                    setUserData( doc.data() );
                } );
        } );
        return () => {
            const unsubscribe = db.collection( "Users" )
                .onSnapshot( () => {
                } );
            unsubscribe();
        };
    }, [userId] );


    // console.log( 'userid from Context: ', userId );


    return (
        <div>
            <HeaderComp />
            <div className="main">
                <div className="main__left">
                    <h2>PERFIL</h2>
                    <Profile
                        userData={userData}
                    />
                    <GreenButton button_name="Agregar un comentario" button_func={showModal} />
                    <Modal
                        className="turn-modal-profile"
                        title="Tu opinión es importante"
                        visible={isModalVisible}
                        onOk={() => handleOk(
                            document.getElementById( "comment-title" ).value,
                            document.getElementById( "comment-content" ).value
                        )}
                        onCancel={handleCancel}>
                        <p>Envíanos tus comentarios, opiniones o reclamos sobre el estado de las canchas,
                            la agenda de un turno o el funcionamiento de la aplicación</p>
                        <input
                            required
                            type="text"
                            name="comment-title"
                            id="comment-title"
                            placeholder="Titulo del comentario"
                        />
                        <textarea
                            name="comment-content"
                            id="comment-content"
                            placeholder="Descripción"
                            autoComplete="off"
                        />
                    </Modal>
                </div>
                <div className="main__right">
                    <FieldUser />
                    <CoursesUser />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;