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
                <div className="media">
                
                    <img src={user.avatarURL || "http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png"} alt="Generic placeholder image"/>
                
                    <div className="media-body">
                        <h5 className="mt-0">{user.name}</h5>
                        <p>Clase: {user.classroom}</p> <span>{user.role}</span>
                        <p>email: {user.email}</p>
                        <Link class="btn btn-primary" to="#" role="button">Editar Perfil</Link>                

                        
                    </div>
                </div>
           </div>     
        )
    }
}

export default withAuthConsumer(Profile)