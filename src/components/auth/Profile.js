
import authService from '../services/auth-service';
import usersService from '../services/user-service'
import { Component } from 'react';
import { withAuthConsumer } from 'react-router-dom';

class Profile extends Component {
    render() {
        const { user } = this.props
    
        return (
            <div className="media">
                <img src={user.avatarURL || "http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png"} alt="Generic placeholder image"/>
              
                <div className="media-body">
                    <h5 className="mt-0">Media heading</h5>
                    
                </div>
            </div>
        )
    }
}

export default withAuthConsumer(Profile)