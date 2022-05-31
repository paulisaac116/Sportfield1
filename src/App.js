import { React, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext } from './components/UserContext';
import { auth } from './firebase/index';

import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import TurnsPage from './pages/TurnsPage';


import './styles/App.css';


const App = () => {

  const [userId, setUserId] = useState( "" );

  useEffect( () => {
    auth.onAuthStateChanged( ( user ) => {
      if ( user ) {
        const uid = user.uid;
        setUserId( uid );
        console.log('userId: ', uid );

      } else {
        console.log( "No hay sesion activa", user );
      }
    } );
  } );

  return (
    <UserContext.Provider value={userId}>
      <Router>
        <Switch>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/turns">
            <TurnsPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;