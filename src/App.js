import {React} from 'react'


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import './styles/App.css'
import { TurnsPage } from './pages/TurnsPage';
import { ProfilePage } from './pages/ProfilePage';

const App = () => {
  
  return (
    <Router>
        <Switch>
          <Route path="/profile">
              <ProfilePage />
          </Route>
          <Route path="/turns">
              <TurnsPage />
          </Route>
        </Switch>
        </Router>
  )
}

export default App