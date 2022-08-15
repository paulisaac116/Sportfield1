import { React, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from 'react-router-dom';
import { UserContext } from './components/UserContext';
import { auth } from './firebase/index';
import { useFetchFirestore } from './hooks/useFetchFirestore';
import { AdminPage } from './pages/AdminPage';
import { FailedPage } from './pages/FailedPage';
import { LandingPage } from './pages/LandingPage';

import {LoginPage} from './pages/LoginPage';
import {ProfilePage} from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import { TurnsPage } from './pages/TurnsPage';
// import TurnsPage from './pages/TurnsPage';


import './styles/App.css';


const App = () => {

  const [userId, setUserId] = useState( "" );

  const { data: adminData, loading } = useFetchFirestore( 'Admin' );

  const [admin, setAdmin] = useState([])

  useEffect( () => {
    auth.onAuthStateChanged( ( user ) => {
      if ( user ) {
        const uid = user.uid;
        setUserId( uid );
        // console.log( 'userId: ', uid );

      } else {
        console.log( 'Not session' );
      }
    } );
  }, [] );

  useEffect(() => {

    setAdmin(adminData)

  }, [adminData])

  return (
    <UserContext.Provider value={userId}>
      <Router>
        <Routes>
          <Route 
            path='/'
            element={<LandingPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
          <Route
            path="/admin"
            element={<AdminPage adminData={admin}/>}
          />

          <Route
            path="/login"
            element={<LoginPage adminData={admin}/>}

          />
          <Route
            path="/profile"
            element={<ProfilePage adminData={admin}/>}
          />
          <Route
            path='/turns'
            element={<TurnsPage />}
          />
          <Route
            path='/404'
            element={<FailedPage />}
          />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;