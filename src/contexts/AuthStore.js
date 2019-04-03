import React, { Component } from 'react'
 
const CURRENT_USER_KEY = 'current-user';
const AuthContext = React.createContex();
 
class AuthStore extends Component {
 
    state = {
        user: JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || '{}')
    }
   
    handleUserChange = (user) => {
        this.setState({ user: user});
        if (user && user.email) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(CURRENT_USER_KEY)
        }
    }
 
    isAuthenticated = () => this.state.user && this.state.user.email;
    isTutor = () => this.state.user && this.state.user.role === 'TUTOR';
 
    render() {
        return (
            <AuthContext.Provider value={{
                user: this.state.user,
                onUserChange: this.handleUserChange,
                isAuthenticated: this.isAuthenticated,
                isTutor: this.isTutor,
            }}>
                {this.props.children}
            </AuthContext.Provider>

        ); 
    }
 
}

const withAuthConsumer = (Component) => {
    return (props) => (
        <AuthContext.Consumer>
            {(storeProps) => <Component {...props} {...storeProps} />}
        </AuthContext.Consumer>
    )
}

export { AuthContext, AuthStore, withAuthConsumer }