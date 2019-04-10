import React, { Component, Fragment } from 'react'
import authService from '../../services/auth-service';
import usersService from '../../services/user-service'
import classroomService from '../../services/classroom-services'
import ClassroomItem from '../classroom/ClassroomItem'
import { withAuthConsumer } from '../../contexts/AuthStore';
import { Link, withRouter } from 'react-router-dom'


class Profile extends Component {
    state = {
        user: {
            
        },
        classrooms: []
    }

    componentDidMount() {
        const { match: { params } } = this.props; 
        const { user } = this.props     
        classroomService.list({ tutor: user.id}) 
        .then(
            (classrooms) => this.setState({ classrooms: classrooms}),
            (error) => console.error(error)
        )

    }

    render() {
        const { user } = this.props
        const { isTutor } = this.props;
        const classrooms = this.state
            .classrooms
            .map(classroom => (<ClassroomItem key={classroom.id} {...classroom} tutorOptions={isTutor()} 
                onClickDeleteClassroom ={this.handleDeleteClassroom} />));
    
        return (
            <div className="row justify-content-center mt-5">
                <div className="box">
                    <div className="media">
                        <div className="media-left">
                            <figure className="figure">
                                <img className="figure-img img-fluid rounded" src={user.avatarURL || "http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png"} alt="Generic placeholder image"/>
                        </figure>
                        </div>       
                        <div className="media-body">
                            <h5 className="mt-0">{user.name}</h5><span>{user.role}</span>
                            {!isTutor()  &&
                            <p>Clase: {user.classroom.name}</p> 
                            }
                            <p>email: {user.email}</p>
                            <Link class="btn btn-primary" to="/edit" role="button">Editar Perfil</Link>                
                         
                            
                        </div>

                    </div>
                    {isTutor()  &&
                                <Fragment>
                                    <h2>Listado de Clases</h2>
                                    <div className="col-xs-12 ">
                                        <ul className="list-group mt-5">
                                            {classrooms}
                                        </ul>
                                    </div>
                                </Fragment>
                            }
                </div>
           </div>     
        )
    }
}

export default withRouter(withAuthConsumer(Profile));