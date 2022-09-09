import React from 'react';
import { useFetchFirestore } from '../hooks/useFetchFirestore';
import { useNavigate } from 'react-router-dom';

import { HeaderLanding } from '../components/LandingPage/HeaderLanding';
import { GreenButton } from '../components/Buttons/GreenButton';

import '../styles/LandingPage/LandingPage.css';
import field from '../images/field.jfif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const LandingPage = () => {

    const { data: tableData, loading } = useFetchFirestore( 'Courses' );

    const navigate = useNavigate();

    const gotoLogin = () => {

        navigate( '/profile' );

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
                                {
                                    tableData?.map( ( course, key ) => (
                                        <div className='table-courses__body--row landing-page__content--courses' key={key}>
                                            <div className='body-row__data-buttons'>
                                                <div className='body-row__data'>
                                                    <p className='body-row__data--title'>{course.title}</p>
                                                    <p>{course.description}</p>
                                                </div>
                                                <div className='body-row__buttons'>
                                                    <GreenButton
                                                        button_name={'Inscribirse'}
                                                        button_func={() => gotoLogin()}
                                                    />
                                                </div>
                                            </div>
                                        </div>
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
