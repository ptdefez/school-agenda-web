import React, { Component } from 'react'
import authService from '../../services/auth-service'
import usersService from '../../services/user-service'
import { Link } from 'react-router-dom';
import classroomService from '../../services/classroom-services'
import { withAuthConsumer } from '../../contexts/AuthStore';
import AddStudent from './AddStudent';

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

class CreateClassroom extends Component {

    state = {
        classroom: {
            name: '',
            students: [],
            tutor:''
        },
        isRegistered: false,
        errors: {},
        touch: {},
        tutors: [],
        students: []
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

    addStudent = (id) => {
        const { match: { params } } = this.props;
        Promise.all([
            classroomService.get(params.id),
            classroomService.addStudent(id)  
        ])
        
            .then(
                (student) => {
                    console.log(student)
                }
            )
    }

    handleSubmit = (e) => {
        
        console.log(this.state.classroom)
        e.preventDefault();
        if(this.isValid()) {
            this.setState({ classroom: { ...this.state.classroom} });
            classroomService.create(this.state.classroom)
                .then(
                    (classroom) => {
                        console.log(classroom)
                        this.setState({ isRegistered: true });
                        console.log(classroom)
                    }, 
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
        return !Object.keys(this.state.classroom)
        .some(attr => this.state.errors[attr])
    }

    componentDidMount() {
        const { match: { params } } = this.props;        
        usersService.userList({ role: 'TUTOR'}) 
           
            .then(
                (tutors) => this.setState({                    
                    tutors: tutors                   
                }),
                (error) => console.error(error)
            )
        return usersService.userList({role: 'STUDENT'})
            .then(
                (elements) => {
                    const classroomStudents = this.state.classroom.students
                    const students = elements.filter(element => element != classroomStudents.includes(element) )
                    this.setState({
                    students: students
                    })
                },
                (error) => console.error(error)
            )


    }


    render() {
        const { classroom, errors, touch, tutors, students } = this.state;

        const tutorsOpts = tutors.map(tutor => {
            console.log(tutor.id )
            return (
                <option key={tutor.id} value={tutor.id}>{tutor.name}</option>
            )
        });
     
        return (
            <div className = "row justify-content-center mt-5 ">
            <div className="box mx-auto col-sm-4 mt-5">

                <div className="">
                    <h3>Clase</h3>
                    <form id="profile-form" className="mt-4" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Nombre</label>
                            <input type="text" name="name" className="form-control"
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                value={classroom.name}  />
                        </div>

                        <div className="form-group">
                            <label>Tutor</label>
                            <select className={`form-control ${touch.tutor && errors.tutor ? 'is-invalid' : ''}`}
                                name="tutor"
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                value={classroom.tutor.id}>
                                <option selected>Selecciona...</option>
                                {tutorsOpts}
                            </select>
                            <div className="invalid-feedback">{errors.classroom}</div>
                        </div>

                        <div className="col-6 pt-4">
                        <button className="btn btn-primary" form="profile-form" type="submit" disabled={!this.isValid()}>Crear Clase</button>
                        </div>

                    </form>
                </div>
                <a className="float-right"><i className='fa fa-reply fa-2x mt-3 text-danger' onClick={() => this.props.history.go(-1)}></i></a> 
                
            </div>
        </div>
        )
    }

}

export default withAuthConsumer(CreateClassroom)