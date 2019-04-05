import React, { Component } from 'react';
import { classroomService } from '../../services'
import ClassroomItem from './ClassroomItem'
import { withAuthConsumer } from '../../contexts/AuthStore';


class ClassroomList extends Component {

    state = {
        classrooms: []
    }

    componentDidMount() {
        classroomService.list()
            .then(classrooms => this.setState({ classrooms: classrooms}))

    }

    handleDeleteClassroom = (id) => {
        this.setState({classrooms: this.state.classrooms.filter(classroom => classroom.id !== id)})
    }


    render () {
        const { isTutor } = this.props;
        const classrooms = this.state
            .classrooms
            .map(classroom => (<ClassroomItem key={classroom.id} {...classroom} tutorOptions={isTutor()} 
                onClickDeleteClassroom ={this.handleDeleteClassroom} />));

        return (
            <div className="row">
            <div className="col-12">
              <ul className="list-group mt-5">
                {classrooms}
              </ul>
            </div>
          </div>
        )
    
    }

}

export default withAuthConsumer(ClassroomList)