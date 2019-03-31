import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/misc/NavBar'
import { BrowserRoutes, Switch, Route, Redirect } from 'react-router-dom';
import Register from './components/auth/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <section>
        <BrowserRouter> 
       
          <Route exact path="/register" component={Register}/>
       
        </BrowserRouter>
        </section>
      </div>
    );
  }
}

export default App;
