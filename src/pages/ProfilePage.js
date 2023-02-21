import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchFirestore } from '../hooks/useFetchFirestore';

import { CoursesUser } from '../components/ProfilePage/CoursesUser';
import { TurnsUser } from '../components/ProfilePage/TurnsUser';
import { HeaderComp } from '../components/HeaderComp';
import { ProfileFrame } from '../components/ProfilePage/ProfileFrame';
import { ModalRegisterCourse } from '../components/ProfilePage/ModalRegisterCourse';

import '../styles/ProfilePage/ProfilePage.css';

export const ProfilePage = React.memo( () => {

    const { data: userFetchData, loading: loadingUserDataFetch } = useFetchFirestore( 'Users' );
    const { data: coursesData, loading } = useFetchFirestore( 'Courses' );

    const [userSession, setUserSession] = useState( false );
    const [userData, setUserData] = useState( [] );

    const [isModalRegisterCourseVisible, setIsModalRegisterCourseVisible] = useState( false );

    const [arrayMessageAddTurn, setArrayMessageAddTurn] = useState( [] );
    const [arrayMessageRegisterCourse, setArrayMessageRegisterCourse] = useState( [] );
    const [arrayMessageUnsubscribeCourse, setArrayMessageUnsubscribeCourse] = useState( [] );

    const navigate = useNavigate();
    const location = useLocation();

    useEffect( () => {

        if ( location.state?.userId !== undefined ) {
            setUserSession( true );
        }

        else {
            navigate( '/login' );
        }

    }, [] );


    useEffect( () => {

        setUserData( userFetchData?.find( user => user.id === location.state?.userId ) );

    }, [userFetchData] );

    // useEffect( () => {

    //     setTimeout( () => {
    //         while ( arrayMessageAddTurn.length !== 0 ) {
    //             arrayMessageAddTurn.pop();
    //         }
    //     }, 4000 );

    // }, [arrayMessageAddTurn] );

    // useEffect( () => {

    //     setTimeout( () => {
    //         while ( arrayMessageRegisterCourse.length !== 0 ) {
    //             arrayMessageRegisterCourse.pop();
    //         }
    //     }, 4000 );

    // }, [arrayMessageRegisterCourse] );


    return (
        userSession
            ? <div className='ProfilePage'>
                <HeaderComp />
                <div className="profile-content">
                    <div className='profile-content__top'>

                        <ProfileFrame
                            userData={userData}
                        />
                    </div>
                    <div className='profile-content__bottom'>
                        <TurnsUser
                            userData={userData}
                            setArrayMessage={setArrayMessageAddTurn}
                        />
                        <CoursesUser
                            userData={userData}
                            setIsModalRegisterVisible={setIsModalRegisterCourseVisible}
                            setArrayMessage={setArrayMessageUnsubscribeCourse}
                        />
                        <ModalRegisterCourse
                            isModalVisible={isModalRegisterCourseVisible}
                            setIsModalVisible={setIsModalRegisterCourseVisible}
                            courses={coursesData}
                            userData={userData}
                            setArrayMessage={setArrayMessageRegisterCourse}

                        />
                    </div>

                </div>
                {
                    arrayMessageAddTurn.map( message => ( message ) )
                }
                {
                    arrayMessageRegisterCourse.map( message => ( message ) )
                }
                {
                    arrayMessageUnsubscribeCourse.map( message => ( message ) )
                }
            </div>
            : <div className='bg-purple-mid h-screen'></div>
    );
} );
