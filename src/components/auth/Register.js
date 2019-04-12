import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import authService from '../../services/auth-service';

const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/i;

const validations = {
  name: (value) => {
    let message;
    if (!value) {
      message = 'El nombre es necesario';
    }
    return message;
  },
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
    } else if (!value.length >= 6) {
      message = 'La contraseña debe tener al menos 6 caracteres'
    }
    return message;
  },
  repeatPassword: (value, user) => {
    let message;
    if (!value) {
      message = 'Repita contraseña'
    } else if (value !== user.password) {
      message = 'Las contraseñas no coinciden'
    }
    return message;

  }

}




export default class Register extends Component {
  state = {
    user: {
      name: '',
      email: '',
      password: '',
      repeatPassword: ''

    },
    errors: {
      name: true,
      email: true,
      password: true,
      repeatPassword: true
    },
    touch: {},
    isRegistered: false
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
        [name]: validations[name] && validations[name](value, this.state.user)
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
    if (this.isValid()) {
      const finalUser = { ...this.state.user };
      delete finalUser.repeatPassword;
      authService.register(finalUser)
        .then(
          (user) => this.setState({ isRegistered: true }),
          (error) => {
            const { message, errors } = error.response.data;
            this.setState({
              errors: {
                ...errors,
                email: !errors && message
              },
              touch: {
                ...errors,
                email: !errors && message
              }
            })
          }
        )
      return (<Redirect to="/" />)
    }


  }

  isValid = () => {
    return !Object.keys(this.state.errors)
      .some(attr => validations[attr] && this.state.errors[attr])
  }

  render() {
    const { isRegistered, errors, user, touch } = this.state;
    if (isRegistered) {
      return (<Redirect to="/login" />)
    }
    return (
      <div className="row justify-content-center mt-5">
        <div className="col-xs-12 col-sm-4 mt-5 pt-5">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text" style={{ width: '42px' }}><i className="fa fa-user"></i></div>
              </div>
              <input type="text" className={`form-control ${touch.name && errors.name && 'is-invalid'}`}
                name="name" placeholder="Nombre"
                onChange={this.handleChange}
                value={user.name}
                onBlur={this.handleBlur} />
              <div className="invalid-feedback">{errors.name}</div>
            </div>

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
                <div className="input-group-text" style={{ width: '42px' }}><i className="fa fa-lock"></i></div>
              </div>
              <input type="password" className={`form-control ${touch.password && errors.password && 'is-invalid'}`}
                name="password" placeholder="Contraseña"
                onChange={this.handleChange}
                value={user.password}
                onBlur={this.handleBlur} />
              <div className="invalid-feedback">{errors.password}</div>
            </div>


            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text" style={{ width: '42px' }}><i className="fa fa-lock"></i></div>
              </div>
              <input type="password" className={`form-control ${touch.repeatPassword && errors.repeatPassword && 'is-invalid'}`}
                name="repeatPassword" placeholder="Repita contraseña"
                onChange={this.handleChange}
                value={user.repeatPassword}
                onBlur={this.handleBlur} />
              <div className="invalid-feedback">{errors.repeatPassword}</div>
            </div>

            <div className="from-actions">
              <button type="submit" className="btn btn-primary btn-block" disabled={!this.isValid()}>Register</button>
            </div>
          </form>
          <hr />
          <p className="text-center">Already registered? <Link to="/login">Login</Link></p>
        </div>
      </div>
    )

  }

}
