import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import authService from '../../services/auth-service';


export default class Register extends Component {
    state = {
        user: {
            name: '',
            email: '',
            password: ''
        },
        errors: {
            name: '',
            email: '',
            password: ''
        },
        touch: {},
        isRegistered: false
    }

    handleChange = (e) => {

    }

    handleBlur = (e) => {

    }

    handleSubmit = (e) => {

    }

    isValid = () => {
      
    }

    render() {
      const { isRegistered, errors,user,touch } = this.state;
        return (
          <div className="row justify-content-center mt-5">
            <div className="col-xs-12 col-sm-4">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{ width: '42px' }}><i className="fa fa-user"></i></div>
                      </div>
                      <input type="text" className={`form-control ${touch.name && errors.name && 'is-invalid'}`} 
                        name="name" placeholder="Name" 
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
                        name="password" placeholder="Password" 
                        onChange={this.handleChange} 
                        value={user.password} 
                        onBlur={this.handleBlur} />
                      <div className="invalid-feedback">{errors.password}</div>
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
