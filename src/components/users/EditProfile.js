import React, { Component } from 'react'
import authService from '../../services/auth-service'
import usersService from '../../services/user-service'
import classroomService from '../../services/classroom-services'
import { withAuthConsumer } from '../../contexts/AuthStore';

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
    classRoom: (value) => {
        let message;
        if (!value) {
            message = 'La clase es necesaria'
        }
        return message;
    }

}

class EditProfile extends Component {
    state = {
        user: {
            name: '',
            email: '',
            classroom: '',
            avatarDefault: "http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png"

        },
        classrooms: [],
        errors: {},
        touch: {}
    }

    handleChange = (e) => {
        const { name, value, files } = e.target;
        this.setState({
            user: {
                ...this.state.user,
                [name]: files && files[0] ? files[0] : value
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
        const { user } = this.state;
        const stateUser = { ...user };
        delete stateUser.avatarURL;
        e.preventDefault();
        if (this.isValid()) {
            usersService.updateProfile(user.id, stateUser)
                .then(
                    (newUser) => {
                        this.setState({ user: { ...stateUser, ...newUser } }, () => {
                            this.props.onUserChange(newUser);
                        });
                    },
                    (error) => {
                        const { message, errors } = error.response.data;
                        this.setState({
                            ...this.state.errors,
                            ...errors,
                            email: !errors && message
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
        usersService.getProfile(this.props.user.id)
            .then(
                (user) => {
                    if (user.classroom) {
                        user.classroom = user.classroom.id
                    }
                    this.setState({ user })
                },
                (error) => console.error(error)
            )
        classroomService.list()
            .then(
                (classrooms) => this.setState({ classrooms }),
                (error) => console.error(error)
            )
    }


    render() {
        const { errors, user, touch, classrooms } = this.state;
        console.log(user)

        return (
            <div className="row justify-content-center mt-5">
                <div className="box mx-auto">
                    <div className="container">

                        <div className="col-6">
                            <h3>Perfil</h3>
                            <form id="profile-form" className="mt-4" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input type="text" name="name" className="form-control" value={user.name} disabled />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" className="form-control" value={user.email} />
                                </div>

                                <div className="form-group">
                                    <label>Clase</label>
                                    <select className={`form-control ${touch.classroom && errors.classroom ? 'is-invalid' : ''}`}
                                        name="classroom"
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        value={user.classroom}>

                                        {classrooms.map(classroom => (
                                            <option
                                                value={classroom.id}
                                                selected={user.classroom && user.classroom.id === classroom.id}
                                            >
                                                {console.log(user.classroom && user.classroom.id === classroom.id)}
                                                {classroom.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="invalid-feedback">{errors.classroom}</div>
                                </div>

                            </form>
                        </div>
                        <div className="col-6 pt-4">
                            <label htmlFor="avatarURL" className="avatar"><img src={user.avatarURL ? user.avatarURL : user.avatarDefault} className="rounded mb-3" alt="Generic placeholder image" /></label>
                            <input type="file" id="avatar" name="avatar" onChange={this.handleChange} />
                            <button className="btn btn-primary" form="profile-form" type="submit" disabled={!this.isValid()}>Editar Perfil</button>

                        </div>
                    </div>
                </div>
            </div>                                
        )

    }

}

export default withAuthConsumer(EditProfile)