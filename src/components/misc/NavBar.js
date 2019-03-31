import React, { Fragment, Component } from 'react'
import authService from '../../services/auth-service'
import { Link, NavLink } from 'react-router-dom'


class NavBar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" to="/">School-Agenda</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                    <a className="nav-link" activeClassName="active" to="/">Profile</a>
                    </li>
                </ul>

                <ul className="navbar-nav my-2 my-lg-0">
                   
                    <li className="nav-item">
                    <a className="nav-link" activeClassName="active" to="/login">Login</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" activeClassName="active" to="/register">Register</a>
                    </li>
                </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;