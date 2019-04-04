import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/misc/NavBar'
import Login from './components/auth/Login';
import {  Switch, Route, Redirect } from 'react-router-dom';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <section>
          <Switch>
       
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/" component={Profile}/>
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
