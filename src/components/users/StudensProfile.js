import React, { Component } from 'react'
import authService from '../../services/auth-service';
import usersService from '../../services/user-service'
import { withAuthConsumer } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom'

class StudentsProfile extends Component {

    state = {
        user:{
            role: '',
            name: '',
            email: '',
            classroom: {
                name: '' 
            },
            tutor: {
                name: ''
            },
            avatarURL:''

        },
        createdat: '',
        updatedat: ''
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        usersService.getProfile(params.id)
            .then(
                (user) => this.setState({ user: {...user}}),
                (error) => console.error(error)
            )
    }

    render() {
        const { user } = this.state

        return(
            <div className="row justify-content-center mt-5">
                <div className="box">
                    <div className="media">
                        <div className="media-left">
                            <figure class="image is-64x64">
                                <img src={user.avatarURL || "http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png"} alt="Generic placeholder image"/>
                        </figure>
                        </div>       
                        <div className="media-body">
                            <h5 className="mt-0">{user.name}</h5><span>{user.role}</span>
                            {/* <p>Clase: {user.classroom.name}</p>  */}
                            <p>email: {user.email}</p>
                            <Link className="btn btn-primary" to="" role="button">Poner Nota</Link>                

                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentsProfile