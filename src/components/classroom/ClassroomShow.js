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
            }
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
            <div className="box mx-auto">
                <div className="container">
                    <h3>Clase {classroom.name}</h3>
                    <h5>Tutor:</h5>
                    <p>{classroom.tutor.name}</p>
                    <h5>Alumnos:</h5>
                    <ul>
                        {classroom.students.map((student) => (
                            <li {...student} key={student.id}>{student.name}</li>
                        ))}
                        
                    </ul>
                    <div>
                        <Link className="btn btn-sm btn-primary" to={"/classroom/:id/addStudent"}>
                        Añadir alumno
                        </Link>
                    </div>


                </div>
            </div>
        )

    }
}

export default withAuthConsumer(ClassroomShow)
