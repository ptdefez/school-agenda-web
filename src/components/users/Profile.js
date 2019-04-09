import React, { Component } from 'react'
import authService from '../../services/auth-service';
import usersService from '../../services/user-service'
import { withAuthConsumer } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom'

class Profile extends Component {
    render() {
        const { user } = this.props
    
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
                            <p>Clase: {user.classroom.name}</p> 
                            <p>email: {user.email}</p>
                            <Link class="btn btn-primary" to="/edit" role="button">Editar Perfil</Link>                

                            
                        </div>
                    </div>
                </div>
           </div>     
        )
    }
}

export default withAuthConsumer(Profile)