import React, { Component } from 'react'
import authService from '../../services/auth-service'
import usersService from '../../services/user-service'
import { Link, Fragment } from 'react-router-dom';
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
            id: '',
            name: '',
            students: [],
            tutor:'',
            createdAt: '',
            updatedAt: ''
        },
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

    handleExpel = (id) => {
        console.log(this.state.classroom.id, id)
        classroomService.expelStudent(this.state.classroom.id, id)
        
            .then((user) => {
                const newStudents = [...this.state.classroom.students]
                    .filter(student => student.id !== id);
                this.setState({
                    students: [...this.state.students, user],
                    classroom: {
                        ...this.state.classroom,
                        students: newStudents
                    }
                })
            })
    }

    addStudent = (id) => {
         console.log(this.state.classroom.id, id)
            classroomService.addStudent(this.state.classroom.id, id)  
           
            .then((user) => {
                    const newStudents = [...this.state.students]
                        .filter(student => student.id !== id);
                    this.setState({
                        classroom: {
                            ...this.state.classroom,
                            students: [...this.state.classroom.students, user]
                        },
                        students: newStudents
                    })

                }
            )
    }


    handleSubmit = (e) => {
        // const { classroom } = this.state;
        // const stateClassroom = {...classroom};
        console.log(this.state.classroom)
        e.preventDefault();
        if(this.isValid()) {
            classroomService.update(this.state.classroom.id, this.state.classroom)
                .then(
                    (classroom) => {
                        console.log(classroom)
                        this.setState({ classroom: { ...this.state.classroom, ...classroom}} );
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
        Promise.all([
            classroomService.get(params.id),
            usersService.userList({ role: 'TUTOR'}) 
           
        ]).then(
                ([classroom, tutors]) => this.setState({ 
                    classroom: classroom,
                    tutors: tutors
                   
                }),
                (error) => console.error(error)
            )
        return usersService.userList({role: 'STUDENT'})
            .then(
                (elements) => {
                    const classroomStudents = this.state.classroom.students
                    const students = elements.filter(element => !classroomStudents.includes(element) )
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
            // console.log(tutor.id === classroom.tutor.id)
            return (
                <option key={tutor.id} value={tutor.id}>{tutor.name}</option>
            )
        });
        const studentsOpts = students.map(student => {
            // console.log(student.id === classroom.student.id)
            return (
                <li key={student.id} value={student.id} className="list-group-item d-flex justify-content-between align-items-center">{student.name}
                <i className="mr-3 fa fa-check text-success" 
                onClick={this.addStudent.bind(this, student.id)}></i></li>
            )
        });
        const classStudents = classroom.students.map(classStudent => 
            <li key={classStudent.id} value={classStudent.id} {...classStudent}className="list-group-item d-flex justify-content-between align-items-center">{classStudent.name}
                <i className="mr-2 fa fa-times text-danger" 
                onClick={this.handleExpel.bind(this, classStudent.id)}></i></li>
            )
           

        return (

            
            <div className = "row justify-content-center mt-5" >
                

                    <div className="box col-6">
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
                                    {tutorsOpts}
                                </select>
                                <div className="invalid-feedback">{errors.classroom}</div>
                            </div>
                            <div className=" pt-3">

                                <button className="btn btn-primary" form="profile-form" type="submit" disabled={!this.isValid()}>Editar clase</button>
                                <a className="float-right"><i className='fa fa-reply fa-2x mt-3 text-danger' onClick={() => this.props.history.go(-1)}></i></a> 
                            </div>
                            

                            <div className="form-group pt-3">
                                <label>Eliminar Alumnos:</label>
                                    
                                    <ul>
                                        {classStudents}
                                    </ul>
                                <label>Añadir Alumnos:</label>
                                    <ul>
                                        {studentsOpts}
                                    </ul>
                                  

                                <div className="invalid-feedback">{errors.classroom}</div>
                            </div>

                        </form>
                    </div>
                   
                    
              
            </div>

        )

    }

}
export default withAuthConsumer(EditClassroom)