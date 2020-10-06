import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Register from './Components/Register/Register';
import RegisterList from './Components/RegisterList/RegisterList';
import Admin from './Components/Admin/Admin';
import Donations from './Components/Donations/Donations';
import Events from './Components/Events/Events';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    success: false,
    isSignedIn: false
  })

  return (
    <UserContext.Provider className="container" value={{user, setUser}}>
      <Router>
        <Switch>
          <Route path='/home'>
            <Home/>
          </Route>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
          <PrivateRoute path="/volunteer/:volunteerKey">
            <Register/>
          </PrivateRoute>
          <PrivateRoute path="/registerList">
            <RegisterList/>
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin/>
          </PrivateRoute>
          <Route path='/donation'>
            <Donations/>
          </Route>
          <Route path='/events'>
            <Events/>
          </Route>
          <Route path='*'>
            <PageNotFound/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
