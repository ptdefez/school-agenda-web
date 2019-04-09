import React, { Fragment, Component } from 'react'
import authService from '../../services/auth-service'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { withAuthConsumer } from '../../contexts/AuthStore'


class NavBar extends Component {

    handleLogout = () => {
        authService.logout()
            .then( () => {
                this.props.onUserChange({})
                this.props.history.push('/authenticate')
            })
    }

    render() {
        const { isAuthenticated, user, isTutor } = this.props
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link className="navbar-brand" to="/">School-Agenda</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
 
                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav mr-auto">
                        {isAuthenticated()  &&
                            <Fragment>
                                <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/">Profile</NavLink>
                                </li>
                            </Fragment>
                        }  
                        {isTutor() &&
                            <Fragment>
                                <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/classrooms">Classrooms</NavLink>
                                </li>
                            </Fragment>
                        }     
                    </ul>
 
                    <ul className="navbar-nav my-2 my-lg-0">
                        {!isAuthenticated() &&
                            <Fragment>
                                <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/register">Register</NavLink>
                                </li>
                            </Fragment>
                        }   
                        {isAuthenticated() &&
                            <Fragment>
                                <li className="nav-item">
                                <button className="nav-link" className="btn btn-primary nav-link" >{user.name}</button>
                                </li>
                                <li className="nav-item">
                                <button className="nav-link" ClassName="btn btn-primary nav-link" onClick={this.handleLogout}>Logout</button>
                                </li>
                            </Fragment> 
                        }   
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(withAuthConsumer(NavBar));