import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/misc/NavBar'
import Login from './components/auth/Login';
import {  Switch, Route, Redirect } from 'react-router-dom';
import Register from './components/auth/Register';
import Profile from './components/users/Profile';
import PrivateRoute from './guards/PrivateRoute';
import EditProfile from './components/users/EditProfile';
import ClassroomList from './components/classroom/ClassroomList';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <section>
          <Switch>
       
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/" component={Profile}/>
            <PrivateRoute exact path="/edit" component={EditProfile}/>
            <PrivateRoute exact path="/classrooms" role="TUTOR" component={ClassroomList}/>
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
