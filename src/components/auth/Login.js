import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import authService from '../../services/auth-services'
 
const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/i;
 
const validations = {
    email: (value) => {
        let message;
        if (!value) {
          message = 'El email es necesario';
        } else if (!emailPattern.test(value)) {
          message = 'Formato de email incorrecto'
        }
        return message;
      },
      password: (value) => {
        let message;
        if (!value) {
          message = 'Introduzca su contraseña'
        }
        return message;
      }
}
 
class Login extends Component {
 
    state = {
        user: {
            email: '',
            password: ''
        },
        errors: {},
        touth: {},
        isAuthenticate: false
    }
 
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            },
            errors: {
                ...this.state.errors,
                [name]: validations[name] && validations[name](value)
            }
        })
    }
 
    handleBlur = (e) => {
        const { name } = e.target;
        this.setState({
            touch: {
                ...this.state.touch,
                [name]: true
            }
        })
 
    }
 
    handleSubmit = (e) => {
        e.preventDefault();
 
        if (!this.hasErrors()) {
            authService.authenticate(this.state.user)
            .then(
                (user) => {
                    this.setState({ authenticate: true }, () => {
                        this.props.onUserChange(user)
                    })
                },
                (errors) => {
                    const { message, errors } = error.response.data;
                    this.setState({
                        errors: {
                            ...errors,
                            password: !errors && message
                        },
                        touch: {
                            ...errors,
                            password: !errors && message
 
                        }
                    })
                }
                   
                
            )
        }
 
    }

    hasErrors = () => Object.keys(this.state.user)
        .some(attr => validations[attr] && validations[attr](this.state.user[attr]))
   
 
    render() {
        const { isAuthenticate, touth, errors, user } = this.state;
        if (isAuthenticate) {
            return (<Redirect to="/" />);
        } else {
            return (
                <div className="row justify-content-center mt-5">
                    <div className="col-xs-12 col-3">
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                <div className="input-group-text"><i className="fa fa-envelope-o"></i></div>
                                </div>
                                <input type="text" className={`form-control ${touch.email && errors.email && 'is-invalid'}`}
                                    name="email" placeholder="Email"
                                    onChange={this.handleChange}
                                    value={user.email}
                                    onBlur={this.handleBlur} />
                                <div className="invalid-feedback">{errors.email}</div>
                            </div>
                        
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                <div className="input-group-text" style={{width: '42px'}}><i className="fa fa-lock"></i></div>
                                </div>
                                    <input type="password" className={`form-control ${touch.password && errors.password && 'is-invalid'}`} 
                                        name="password" placeholder="Password"
                                        onChange={this.handleChange} 
                                        value={user.password} 
                                        onBlur={this.handleBlur}/>
                                    <div className="invalid-feedback">{errors.password}</div>
                            </div>
                            <div className="from-actions">
                                <button type="submit" className="btn btn-primary btn-block" disabled={this.hasErrors()}>Login</button>
                            </div>
                        </form>
                        <hr />
                        <p className="text-center">Don't have an account? <Link to="/register">Sign up</Link></p>
                    </div>
                </div>
            );
        }
    }
}

