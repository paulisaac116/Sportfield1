import React from 'react';
import { HeaderComp } from '../components/HeaderComp';
import { Menu } from '../components/AdminPage/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import '../styles/AdminPage/adminPage.css'
import { Table } from '../components/AdminPage/Table';
// import { fas } from 'fontawesome-svg-core.macro'; // <-- import styles to be used

export const AdminPage = () => {

    return (
        <div className='admin-page bg-purple-mid'>
            <HeaderComp />
            <Menu />
        </div>
    );
};
