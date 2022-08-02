import React from 'react';
// import { Modal, message } from 'antd';
import { auth, db } from '../../firebase';

export const ModalCard = ( { setIsModalVisible, isModalVisible } ) => {

    const handleCancel = () => {

        setIsModalVisible( false );
    };

    const handleOk = async ( name, lastName, email, password, land ) => {

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            // Signed in
            const user = userCredential.user;
            const userId = user.uid;

            await db.collection( 'Users' ).doc( userId ).set( {
                name,
                lastName,
                email,
                land
            } );
            // message.success( 'Usuario registrado exitosamente' );

        }
        catch ( error ) {
            const errorCode = error.code;
            const errorMesage = error.message;
            console.log( 'errorCode: ', errorCode );
            console.log( 'errorMesagge: ', errorMesage );
        }

        document.getElementById( "name" ).value = "";
        document.getElementById( "lastName" ).value = "";
        document.getElementById( "email" ).value = "";
        document.getElementById( "password" ).value = "";
        document.getElementById( "land" ).value = "";
        setIsModalVisible( false );
    };

    return (
        // <Modal
        //     onCancel={handleCancel}
        //     visible={isModalVisible}
        //     title='Agregar nuevo usuario'
        //     onOk={() => handleOk(
        //         document.getElementById( "name" ).value,
        //         document.getElementById( "lastName" ).value,
        //         document.getElementById( "email" ).value,
        //         document.getElementById( "password" ).value,
        //         document.getElementById( "land" ).value
        //     )}
        // >
        //     <form className="register__form form">
        //         <div className="register__form--row">
        //             <div className='register__form--column'>
        //                 <label htmlFor="name">Nombre</label>
        //                 <input
        //                     type="text"
        //                     className="name"
        //                     id="name"
        //                     name="name"
        //                     placeholder="Paul"
        //                 />
        //             </div>
        //             <div className="register__form--column">
        //                 <label htmlFor="lastName">Apellido</label>
        //                 <input
        //                     type="text"
        //                     className="lastName"
        //                     id="lastName"
        //                     name="lastName"
        //                     placeholder="Guala"
        //                 />
        //             </div>
        //         </div>

        //         <div className="register__form--row">
        //             <label htmlFor="land">Número de lote</label>
        //             <input
        //                 type="number"
        //                 className="land"
        //                 id="land"
        //                 name="land"
        //                 placeholder='100'
        //             />
        //         </div>

        //         <div className="register__form--row">
        //             <label htmlFor="email">Correo electrónico</label>
        //             <input
        //                 type="email"
        //                 className="email"
        //                 id="email"
        //                 name="email"
        //                 placeholder='paulguala@gmail.com'
        //             />
        //         </div>

        //         <div className="register__form--row">
        //             <label htmlFor="password">Contraseña</label>
        //             <input
        //                 type="password"
        //                 className="email"
        //                 id="password"
        //                 name="password"
        //             />
        //         </div>
        //     </form>
        // </Modal>
        <></>
    );
};
