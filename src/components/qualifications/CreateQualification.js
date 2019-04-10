import React, { Component } from 'react'
import authService from '../../services/auth-service'
import usersService from '../../services/user-service'
import { Link, Redirect } from 'react-router-dom';
import qualificationService from '../../services/qualification-service'
import { withAuthConsumer } from '../../contexts/AuthStore';

const validations = {
    kind: (value) => {
        let message;
        if (!value) {
            message = 'El tipo de examen  es necesario';
        }
        return message;
    },
    subject: (value) => {
        let message;
        if (!value) {
            message = 'La asignatura es necesaria';
        }
        return message;
    },
    number: (value) => {
        let message;
        if (!value) {
            message = 'El número es necesario';
        } else if (value <= 0){
            message = 'Valor no admisible'
        }
        return message;
    },
    date: (value) => {
        let message;
        if (!value) {
            message = 'La fecha es necesaria';
        }
        return message;
    },
    grade: (value) => {
        let message;
        if(!value) {
            message = 'No ha puesto nota'
        } else if (value < 0) {
            message = 'Valor no admisible'
        }
    }
}

class CreateQualification extends Component {

    state = {
        qualification: {
            student: {
              
                id: ''
            },
            classroom: '',
            subject: '',
            kind: '',
            number: '',
            date: '',
            examCode: '',
            grade: ''
            },
        errors: {
            // classroom: true,
            subject: true,
            kind: true,
            number: true,
            date: true,
            // examCode: true,
            grade: true
        },
        touch: {},
        isRegistered: false
        
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            qualification: {
                ...this.state.qualification,
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
        const { qualification } = this.state;
        e.preventDefault();
        if (this.isValid()) {
            const examCode = qualification.subject + qualification.kind + qualification.number + qualification.date
            const qualificationToSend = { ...this.state.qualification, examCode };
            console.log(qualificationToSend)    
            qualificationService.create(qualificationToSend)
            
              .then(
                (result) => this.setState({ isRegistered: true }),
                (error) => {
                  const { message, errors } = error.response.data;
                  this.setState({
                    errors: {
                      ...errors,
                      name: !errors && message
                    },
                    touch: {
                      ...errors,
                      name: !errors && message
                    }
                  })
                }
              )
              return (<Redirect to="/" />)
          }
      
    }

    isValid = () => {
        return !Object.keys(this.state.qualification)
        .some(attr => this.state.errors[attr])
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        usersService.getProfile(params.studentId)
            .then(
                (student) => this.setState({qualification:{ student: {...student}, classroom: params.classroomId}}),
                (error) => console.error(error)
            )
    }


    render() {
        const { classroom, qualification, errors, touch } = this.state
        const subjects = ['Math','Leng', 'Engl', 'NatS', 'SocS' ]

        const subjectOpts = subjects.map(subj => {
            return (
                <option key={subj} value={subj}>{subj}</option>
            )
        });

        return(
            <div className="box mx-auto mt-5">
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Alumno: {qualification.student.name}</h3>
                        
                        <div class="form-row">                        
                            {/* <div class="col-md-4 mb-3">
                                <label for="validationCustom01">Clase</label>
                                <input type="text" name="classroom" className={`form-control ${touch.classroom && errors.classroom ? 'is-invalid' : ''}`}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                value={qualification.classroom}  />
                                <div className="invalid-feedback">{ errors.classroom }</div>
                            </div> */}
                            <div class="col-md-4 mb-3">
                                <label for="validationCustom02">Asignatura</label>
                                <select name="subject" className={`form-control ${touch.subject && errors.subject ? 'is-invalid' : ''}`}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                value={qualification.subject}>
                                <option selected>Selecciona...</option>
                                {subjectOpts}
                                </select>
                                <div className="invalid-feedback">{ errors.subject }</div>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="validationCustom02">Tipo de examen</label>
                                <select type="text" name="kind" className={`form-control ${touch.kind && errors.kind ? 'is-invalid' : ''}`}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                value={qualification.kind}>
                                    <option selected>Selecciona...</option>
                                    <option>Test</option>
                                    <option>Trimester</option>
                                    <option>Recovery</option>
                                </select>
                                <div className="invalid-feedback">{ errors.kind}</div>
                            </div>
                            <div class="col-md-2 mb-3">
                                <label for="validationCustom01">Número</label>
                                <input type="number" min="1" name="number" className={`form-control ${touch.number && errors.number ? 'is-invalid' : ''}`}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                value={qualification.number}  />
                                <div className="invalid-feedback">{ errors.number }</div>
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="validationCustom02">Fecha</label>
                                <input type="date" name="date" className={`form-control ${touch.date && errors.date ? 'is-invalid' : ''}`}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                value={qualification.date}  />
                                <div className="invalid-feedback">{ errors.date }</div>
                            </div>
                        </div>
                        <div class="form-row">
                           
                            {/* <div class="col-md-4 mb-3">
                                <label for="validationCustom02">Código de examen</label>
                                <input type="text" name="examCode" className={`form-control ${touch.examCode && errors.examCode ? 'is-invalid' : ''}`}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                value={qualification.examCode}  />
                                <div className="invalid-feedback">{ errors.examCode }</div>
                            </div> */}
                            <div class="col-md-1 mb-3">
                                <label for="validationCustom02">Puntuación</label>
                                <input type="number" min="0" max="10" name="grade" className={`form-control ${touch.grade && errors.grade ? 'is-invalid' : ''}`}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                value={qualification.grade}  />
                                <div className="invalid-feedback">{ errors.grade }</div>
                            </div>
                            
                        </div>
                        <div className="col-6 pt-4 from-actions">
                                <button  type="submit" className="btn btn-primary " disabled={!this.isValid()}>Poner nota</button>
                        </div>
                    </form>
                </div>
            </div>
        )

    }

}

export default withAuthConsumer(CreateQualification)