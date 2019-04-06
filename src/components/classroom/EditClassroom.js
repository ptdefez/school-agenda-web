import React, { Component } from 'react'
import tutors from '../../data/tutors.json'
import authService from '../../services/auth-service'
import usersService from '../../services/user-service'
import classroomService from '../../services/classroom-services'
import { withAuthConsumer } from '../../contexts/AuthStore';

const validations = {
    name: (value) => {
        let message;
        if (!value) {
            message = 'El nombre de la clase es necesario';
        }
        return message;
    },
    tutor: (value) => {
        let message;
        if (!value) {
            message = 'El tutor es necesario';
        }
        return message;
    }

}

class EditClassroom extends Component {
    state = {
        classroom: {
            name: '',
            tutor: tutors[0],
            students: []
        },
        errors: {},
        touch: {}
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            classroom: {
                ...this.state.classroom,
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
        if(this.isValid()) {
            classroomService.update(this.state.classroom.id, this.state.classroom)
            .then(
                (classroom) => this.setState({ user: {...this.state.classroom, ...classroom}}),
                (error) => {
                    const { message, errors } = error.response.data;
                    this.setState({
                        ...this.state.errors,
                        ...errors,
                        name: !errors && message
                    })
                }
            )
        }
    }

    isValid = () => {
        return !Object.keys(this.state.user)
        .some(attr => this.state.errors[attr])
    }

    componentDidMount() {

    }

    render() {
        const { classroom, errors, touch } = this.state;

        const tutorsOpts = tutors.map(c => <option key={c} value={c}>{c}</option>)
    

        return(
            <div className = "box mx-auto" >
                <div className="container">

                    <div className="col-6">
                        <h3>Clase</h3>
                        <form id="profile-form" className="mt-4" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" name="name" className="form-control"
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    value={classroom.name} disabled />
                            </div>

                            <div className="form-group">
                                <label>Tutor</label>
                                <select className={`form-control ${touch.tutor && errors.tutor ? 'is-invalid' : ''}`}
                                    name="tutor"
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    value={classroom.tutor}>
                                    {tutorsOpts}
                                </select>
                                <div className="invalid-feedback">{errors.classroom}</div>
                            </div>

                        </form>
                    </div>
                    <div className="col-6 pt-4">

                        <button className="btn btn-white" form="profile-form" type="submit" disabled={!this.isValid()}>Editar clase</button>

                    </div>
                </div>
            </div>

        )

    }

}
export default withAuthConsumer(EditClassroom)