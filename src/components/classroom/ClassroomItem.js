import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import classroomService from '../../services/classroom-services'
import { withAuthConsumer } from '../../contexts/AuthStore';
 
class ClassroomItem extends Component {
 
    handleDelete = (id) => {
        classroomService.deleteClassroom(id)
            .then(() => this.props.onClickDelete(id))
    }
 
    render() {
        const { id, name, tutor, students, tutorOptions} = this.props;
        return (
            <div>
                <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{tutorOptions && <i className="mr-2 fa fa-times text-danger" 
                            onClick={this.handleDelete.bind(this, id)}></i>}</span>
                    <Link to={`/classrooms/${id}`}> <span>{name}  
                    </span></Link>
                    <span>Tutor: {tutor.name}</span>
                </li>
            </div>
        )
    }
}

export default ClassroomItem