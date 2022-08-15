import React from 'react';
import { useFetchFirestore } from '../hooks/useFetchFirestore';
import { useNavigate } from 'react-router-dom';

import { HeaderLanding } from '../components/LandingPage/HeaderLanding';
import { GreenButton } from '../components/Buttons/GreenButton';

import '../styles/LandingPage/landingPage.css';
import field from '../images/field.jfif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const LandingPage = () => {

    const { data: tableData, loading } = useFetchFirestore( 'Courses' );

    const navigate = useNavigate();

    const gotoLogin = () => {

        navigate( '/login' );

    };


    return (
        <div className='landing-page'>
            <HeaderLanding />
            <div className='landing-page__content'>
                <div className='landing-page__presentation'>
                    <h1>Urbanización "Los Retoños"</h1>
                    <div className='landing-page__img'>
                        <img src={field} alt='field' />
                    </div>
                </div>
                <div className='landing-page__courses'>
                    <h2>Cursos ofertados</h2>
                    <div aria-labelledby='content' tabIndex='0' role='region' className='table__content overflow-y-auto'>
                        {loading &&
                            <div className='loading-info animate__animated animate__fadeOut'>
                                <FontAwesomeIcon icon={faSpinner} className='animate-spin fa-1x text-white' />
                                <p className=" text-white">Cargando información</p>
                            </div>
                        }
                        {
                            !loading && <table className='Courses animate__animated animate__fadeIn'>
                                <thead></thead>
                                {
                                    tableData?.map( ( item ) => (
                                        <tbody>
                                            <tr key={`${item.id}`} className='bg-purple-mid text-white mb-4 table-courses__data'>
                                                <td className='td__title'>{`${item.title}`}</td>
                                                <td className='td__description'>{`${item.description}`}</td>
                                                {/* <td>{item.schedule}</td> */}
                                            </tr>
                                            <tr className='table-users__buttons courses-table__buttons'>
                                                <td>
                                                    <GreenButton
                                                        button_name='Inscribirse'
                                                        button_func={gotoLogin}
                                                    />
                                                </td>
                                            </tr>

                                        </tbody>
                                    ) )
                                }
                            </table>
                        }

                    </div>

                </div>

            </div>

        </div>
    );
};
