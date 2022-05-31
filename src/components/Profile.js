import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/index';

import '../styles/Profile.css';
import profile_photo from '../images/dragonball.png';
//import { UserContext } from './UserContext'

export const Profile = ({userData}) => {    

    return (
        <div className="profile">
            <div className="profile__photo">
                <img src={profile_photo} alt="profile logo" />
            </div>
            <div className="profile__data">
                <p><strong>Nombre: </strong>{userData.name}</p>
                <p><strong>Apellido: </strong>{userData.lastName}</p>
                {/* <p><strong>Usuario: </strong>{userData.userName}</p> */}

                <p><strong>Correo: </strong>{userData.email}</p>
                <p><strong>Lote: </strong>{userData.land}</p>

            </div>
        </div>
    );
};
