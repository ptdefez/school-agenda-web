import React, { Component } from 'react';
import { classroomService, qualificationService } from '../../services';
import { Link, withRouter, NavLink } from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';

class ClassroomShow extends Component {
    state = {
        classroom: {
            name: '',
            students: [],
            tutor: {
                name: ''
            },
            exams: [],
            createdat: '',
            updatedat: ''
        },
        exams: [],
        isMounted: false
    }
   
    findAverage = () => {
        console.log(this.state.classroom)
        if (this.state.classroom.exams.length > 0) {
            return this.state.classroom.exams.reduce((prev, curr) => prev + curr.grade, 0) / this.state.classroom.exams.length;
        }
        return 0
    }

    componentDidMount() {
        this.state.isMounted = true;
        const { match: { params } } = this.props;
        classroomService.get(params.id)
            .then(
                (classroom) => {
                    this.setState({ classroom: {...classroom}}, () => {
                        this.fetchExams()
                    })
                },
                (error) => console.error(error)
            )
        
    }
    
    fetchExams = () => {
        qualificationService.list({ classroom: this.state.classroom.id })
            .then(exams => this.setState({ exams }))
    }

    render() {
        const { name, tutor, classroom, exams } = this.state;
        

        return (
            <div className="box mx-auto mt-5">
                <div className="container">
                    <h3>Clase {classroom.name}</h3><br/>
                    <h5>Tutor:   <small>{classroom.tutor.name}</small></h5><br/>
                    
                    <h5>Alumnos:</h5>
                    <table className="table">
                        <thead>
                            <tr className="text-center align-middle">
                                <th scope="col">#</th>
                                <th scope="col"><i class="fa fa-users fa-lg"></i></th>
                                <th scope="col">Nombre</th>
                                <th scope="col">email</th>

                            </tr>
                        </thead>
                        <tbody>

                            {classroom.students.map((student, index) => (
                                <tr {...student} key={student.id} className="text-center align-middle">
                                <th scope="row">{index + 1}</th>
                                <td><img className="img-fluid rounded-circle" width="50" height="50" src={student.avatarURL || "http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png"}/></td>
                                <Link to={`/students/${student.id}`}><td>{student.name} </td></Link>
                                <td>{student.email}</td>
                                <Link className="btn btn-sm btn-primary" to={`/classrooms/${classroom.id}/qualifications/${student.id}`} role="button">Poner Nota</Link>
                                </tr>
                            ))}
                        </tbody>                                   
                    </table>
                    <div>
                        <Link className="btn btn-sm btn-primary" to={`/classrooms/${classroom.id}/edit`}>
                        Editar Clase
                        </Link>
                    </div>
                    <br/>            
                    <h5>Exámenes:</h5>
                    <table className="table">
                        <thead>
                            <tr className="text-center align-middle">
                               <th scope="col">#</th>
                               <th scope="col">Alumno</th> 
                               <th scope="col">Código de Examen</th>
                               <th scope="col">Fecha</th>
                               <th scope="col">Puntuación</th>

                            </tr>
                        </thead>
                        <tbody>
                             {exams.map((exam, index) => (
                                 <tr key={exam.id} className="text-center align-middle" >
                                    <th scope="row">{index+1}</th>
                                    <td>{exam.student.name}</td>
                                    <td>{exam.examCode}</td>
                                    <td>{exam.date && new Date(exam.date).toLocaleDateString()}</td>
                                    <td>{exam.grade}</td>

                                 </tr>
                              ))}
                                <tr className="text-center align-middle">
                                <th scope="row">Media</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{this.findAverage()}</td>
                                </tr>

                        </tbody>
                    </table>
                   
                    
                    <a className="float-right"><i className='fa fa-reply fa-2x mt-3 text-danger' onClick={() => this.props.history.go(-1)}></i></a>  

                </div>
                        
            </div>
        )

    }
}

export default withAuthConsumer(ClassroomShow)
// export default withRouter(withAuthConsumer(ClassroomShow));
