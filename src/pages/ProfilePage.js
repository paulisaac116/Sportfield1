import {React, useState} from 'react'
import { CoursesUser } from '../components/CoursesUser';
import { FieldUser } from '../components/FieldUser';
import { GreenButton } from '../components/GreenButton';
import { HeaderComp } from '../components/HeaderComp';
import { Profile } from '../components/Profile';

import '../styles/ProfilePage.css'
import { Modal} from 'antd';


const ProfilePage = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <div>
           <HeaderComp />
           <div className="main">
             <div className="main__left">
               <h2>PERFIL</h2>
               <Profile />
               <GreenButton button_name="Agregar un comentario" button_func={showModal}/>
               <Modal className="turn-modal-profile" title="Tu opinión es importante" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                 <p>Envíanos tus comentarios, opiniones o reclamos sobre el estado de las canchas, 
                   la agenda de un turno o el funcionamiento de la aplicación</p>
                   <input required type="text" name="comment-title" id="comment-title" placeholder="Titulo del comentario"/>
                   <textarea name="comment-content" id="comment-content" placeholder="Descripción" autoComplete="off"/>
               </Modal>
             </div>
             <div className="main__right">
               <FieldUser />
               <CoursesUser />
             </div>
           </div>
         </div>
    )
}

export default ProfilePage