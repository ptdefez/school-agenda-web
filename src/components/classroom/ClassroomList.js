import React, { Component } from 'react';
import { classroomService } from '../../services'
import ClassroomItem from './ClassroomItem'
import { Link } from 'react-router-dom';
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
            <div className="row justify-content-center mt-5">
                <div className = "box mx-auto col-sm-8">
                    <h2>Listado de Clases</h2>
                    <div className="col-xs-12 ">
                        <ul className="list-group mt-5">
                            {classrooms}
                        </ul>
                    </div>
                    <div className="mt-3">          
                        <Link className="btn btn-sm btn-primary" to={`/classrooms/create`}>Crear Clase</Link>
                    </div>
                    <a className="float-right"><i className='fa fa-reply fa-2x mt-3 text-danger' onClick={() => this.props.history.go(-1)}></i></a> 
                </div>
                
          </div>
        )
    
    }

}

export default withAuthConsumer(ClassroomList)