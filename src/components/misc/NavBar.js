import React, { Fragment, Component } from 'react'
import authService from '../../services/auth-service'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { withAuthConsumer } from '../../contexts/AuthStore'


class NavBar extends Component {

    handleLogout = () => {
        authService.logout()
            .then( () => {
                this.props.onUserChange({})
                this.props.history.push('/login')
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
                                <div className="nav-item text-center align-middle mr-3">
                                <img className="img-fluid rounded-circle" width="50" height="50" src={user.avatarURL || "http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png"}/>
                                <span className="nav-link active" >{user.name}</span>
                                </div>
                                <li className="nav-item">
                                <Link className="nav-link"  onClick={this.handleLogout}><i className='fa fa-power-off fa-3x'></i></Link>
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