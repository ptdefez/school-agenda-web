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
import ClassroomShow from './components/classroom/ClassroomShow';
import EditClassroom from './components/classroom/EditClassroom';
import AddStudent from './components/classroom/AddStudent';
import CreateClassroom from './components/classroom/CreateClassroom';
import StudentsProfile from './components/users/StudensProfile';
import CreateQualification from './components/qualifications/CreateQualification';


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
            <PrivateRoute exact path="/students/:id" role="TUTOR" component={StudentsProfile}/>
            <PrivateRoute exact path="/classrooms/:classroomId/qualifications/:studentId" role="TUTOR" component={CreateQualification}/>
            <PrivateRoute exact path="/edit" component={EditProfile}/>
            <PrivateRoute exact path="/classrooms" role="TUTOR" component={ClassroomList}/>
            <PrivateRoute exact path="/classrooms/:id/edit" role="TUTOR" component={EditClassroom}/>
            <PrivateRoute exact path="/classrooms/create" role="TUTOR" component={CreateClassroom}/>
            <PrivateRoute exact path="/classrooms/:id/addStudent" role="TUTOR" component={AddStudent}/>
            <PrivateRoute exact path="/classrooms/:id" role="TUTOR" component={ClassroomShow}/>
            
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
