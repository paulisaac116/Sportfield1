import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from 'react-router-dom';
import { UserContext } from './components/UserContext';
import { auth } from './firebase/index';

import { AdminPage } from './pages/AdminPage';
import { FailedPage } from './pages/FailedPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import { TurnsPage } from './pages/TurnsPage';

import './styles/App.css';

const App = () => {

  const [userId, setUserId] = useState( "" );

  useEffect( () => {
    auth.onAuthStateChanged( ( user ) => {
      if ( user ) {
        const uid = user.uid;
        setUserId( uid );

      } else {
        console.log( 'Not session' );
      }
    } );
  }, [] );


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
            element={<AdminPage />}
          />
          <Route
            path="/login"
            element={<LoginPage />}

          />
          <Route
            path="/profile"
            element={<ProfilePage />}
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