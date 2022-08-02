import { React, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { UserContext } from './components/UserContext';
import { auth } from './firebase/index';
import { AdminPage } from './pages/AdminPage';
import { FailedPage } from './pages/FailedPage';

import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import {TurnsPage} from './pages/TurnsPage';
// import TurnsPage from './pages/TurnsPage';


import './styles/App.css';


const App = () => {

  let history = useHistory();

  const [userId, setUserId] = useState( "" );

  useEffect( () => {
    auth.onAuthStateChanged( ( user ) => {
      if ( user ) {
        const uid = user.uid;
        setUserId( uid );
        console.log( 'userId: ', uid );

      } else {
        console.log('Not session')
      }
    } );
  } );

  // if ( userId !== '' ) history.push( '/profile' );
  // else history.push( '/login' );

  return (
    <UserContext.Provider value={userId}>
      <Router>
        <Switch>
          {
            // userId !== ''
            // ? history.push('/profile')
            // : history.push('/login')
          }
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path='/turns'>
            <TurnsPage />
          </Route>
          <Route path='/404'>
            <FailedPage />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;