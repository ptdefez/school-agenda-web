import React, { Component } from 'react'
import authService from '../../services/auth-service';
import usersService from '../../services/user-service'
import { withAuthConsumer } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom'

class StudentsProfile extends Component {

    state = {
        grades: [],
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
            avatarURL:'',
            grades: []

        },
        createdat: '',
        updatedat: '',
        filteredSubject: ''
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        usersService.getProfile(params.id)
            .then(
                
                (user) => {
                    this.setState({ user: {...user} , grades: user.grades })
                    // const newDates = this.state.user.grades.map( grade => grade.date.toLocaleDateString())
                    // this.setState({ user: {...this.state.user, date: newDates}})
                },
                (error) => console.error(error)
            )
    }

    findAverage = () => {
        console.log(this.state.user)
        const userGrades = this.state.user.grades.map(({grade}, index) => grade)
        console.log(userGrades)
        const add = userGrades.reduce(function(a, b){ return a + b; })
        return add/userGrades.length
    }

    onFilter = (e) => {
        // this.setState({
        //     filteredSubject: e.target.value
        // })
        // this.componentDidMount()
        const filteredSubject = e.target.value
        console.log(filteredSubject)
        const newGrades = e.target.value === ""
            ? this.state.grades
            : this.state.grades.filter( grade =>  grade.subject === filteredSubject)
        console.log(newGrades)
        this.setState({ user: {...this.state.user, grades: newGrades}})

    }

    render() {
        const { user, filteredSubject } = this.state
        // const date  = this.state.user.grades.map(({date}, index) => date.toLocaleDateString())
        const subjects = ['Math','Leng', 'Engl', 'NatS', 'SocS' ]
        const subjectOpts = subjects.map(subj => {
            return (
                <option key={subj} value={subj}>{subj}</option>
            )
        });

        return(
            <div className="row justify-content-center mt-5">
                <div className="box w-50 ">
                    <div className="media ">
                        <div className="media-left mr-5">
                            <figure class="image is-64x64">
                                <img src={user.avatarURL || "http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png"} alt="Generic placeholder image"/>
                        </figure>
                        </div>       
                        <div className="media-body">
                            <h5 className="mt-0">{user.name}</h5><span>{user.role}</span>
                            <p>email: {user.email}</p>
                           
                        </div>
                    </div>
                    <h2>Listado de calificaciones</h2>
                            <table className="table">
                                <thead>
                                    <tr className="text-center align-middle">
                                        <th scope="col">#</th>
                                        <th scope="col">Código de examen</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col"><select name="subject" 
                                            onChange={this.onFilter} >
                                            <option></option>
                                            { subjectOpts }
                                            </select></th>
                                        <th scope="col">Puntuación</th>
                                    </tr>          
                                </thead>
                                <tbody>
                                    {user.grades && user.grades.length > 0 && (
                                        <React.Fragment>
                                            {user.grades.map((grade, index) => (
                                                <tr {...grade} key={grade.id} className="text-center align-middle">
                                                <th scope="row">{index + 1}</th>
                                                <td>{grade.examCode}</td>
                                                <td>{grade.date && new Date(grade.date).toLocaleDateString()}</td>
                                                <td>{grade.subject}</td>
                                                <td>{grade.grade}</td>
                                                </tr>
                                            ))}
                                                <tr className="text-center align-middle">
                                                <th scope="row">Media</th>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>{this.findAverage()}</td>
                                                </tr>
                                        </React.Fragment>
                                    )}
                                </tbody>
                            </table>
                          <a className="float-right"><i className='fa fa-reply fa-2x mt-3 text-danger' onClick={() => this.props.history.go(-1)}></i></a>  
                </div>
            </div>
        )
    }
}

export default StudentsProfile