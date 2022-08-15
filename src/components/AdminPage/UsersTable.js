import React, { useEffect } from 'react';
import { PurpleButton } from '../Buttons/PurpleButton';

import '../../styles/AdminPage/adminPage.css';
import { RedButton } from '../Buttons/RedButton';


export const UsersTable = React.memo(({tableData, setUserData, setIsModalVisible}) => {

    // const { data: tableData, loading } = useFetchFirestore( 'Users' );
    

    const handleDeleteUser = (item) => {
        setUserData(item)
        setIsModalVisible(true)
    }

    useEffect(() => {
    //   setLoading(loading)
    //   setUserData(tableData)
      
    }, [])
    
    // console.log('loading', loading)


    return (
        <table className='Users animate__animated animate__fadeIn'>
            <thead>
                <tr>
                    <th scope='col' className='thead__name'>Nombre</th>
                    <th scope='col' className='thead__lastName'>Apellido</th>
                    <th scope='col' className='thead__email'>Email</th>
                    <th scope='col' className='thead__land'>Lote</th>
                    <th scope='col' className='thead__buttons'>buttons</th>
                </tr>
            </thead>
            {tableData?.map( ( item, key ) => (
                <tbody key={key}>
                    <tr key={`${item.id}`} className='table-users__data'>
                        <td>{`${item.name}`}</td>
                        <td>{`${item.lastName}`}</td>
                        <td>{`${item.email}`}</td>
                        <td>{`${item.land}`}</td>
                    </tr>
                    <tr className='table-users__buttons' key={key}>
                        <RedButton 
                            button_name={'Eliminar'}
                            button_func={() => handleDeleteUser(item)}
                        />
                    </tr>
                </tbody>
            ) )}
        </table>
    );
});
