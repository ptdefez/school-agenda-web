import React, { Component } from 'react';
import { classroomService } from '../../services';
import { Link } from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';

class ClassroomShow extends Component {
    state = {
        classroom: {
            name: '',
            students: [],
            tutor: {
                name: ''
            },
            createdat: '',
            updatedat: ''
        },

    }
    componentDidMount() {
        const { match: { params } } = this.props;
        classroomService.get(params.id)
            .then(
                (classroom) => this.setState({ classroom: {...classroom}}),
                (error) => console.error(error)
            )
    }

    render() {
        const { name, tutor, classroom } = this.state;

        return (
            <div className="box mx-auto mt-5">
                <div className="container">
                    <h3>Clase {classroom.name}</h3>
                    <h5>Tutor:</h5>
                    <p>{classroom.tutor.name}</p>
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


                </div>
            </div>
        )

    }
}

export default withAuthConsumer(ClassroomShow)
