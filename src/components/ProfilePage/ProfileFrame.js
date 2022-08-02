import React from 'react';

import '../../styles/ProfilePage/ProfilePage.css';
import profile_photo from '../../images/dragonball.png';
//import { UserContext } from './UserContext'

export const ProfileFrame = ( { userData } ) => {

    return (
        <div className="profile__frame">
            <p className='profile__frame--title'>PERFIL</p>
            <img src={profile_photo} alt="profile logo" className='profile__frame--photo' />
            <div className="profile__frame--data">
                <p><strong>Nombre: </strong>{userData.name}</p>
                <p><strong>Apellido: </strong>{userData.lastName}</p>
                {/* <p><strong>Usuario: </strong>{userData.userName}</p> */}

                <p><strong>Correo: </strong>{userData.email}</p>
                <p><strong>Lote: </strong>{userData.land}</p>
            </div>

        </div>
    );
};
