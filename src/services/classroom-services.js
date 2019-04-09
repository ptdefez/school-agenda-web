import http from './base-http-service';
 
const list = () => http.get('/classrooms')
    .then(response => response.data)
 
const create = (classroom) => http.post('/classrooms', classroom)
    .then(response => response.data)
 
const get = (id) => http.get(`/classrooms/${id}`)
    .then(response => response.data)
 
const update = (id, classroom) => {
    classroom.tutor = classroom.tutor.id || classroom.tutor;
    return http.put(`/classrooms/${id}`, classroom)   
        .then(response => response.data)
}
 
const addStudent = (id, student) => http.put(`/classrooms/${id}/addStudent`, {id: student})
    .then(response => response.data)

const expelStudent = (id, student) => http.put(`/classrooms/${id}/expelStudent`, { id: student})
    .then(response => response.data)
 
const deleteClassroom = (id) => http.delete(`/classrooms/${id}`)
    .then(response => response.data)
 
export default {
    list,
    create,
    get,
    update,
    addStudent,
    expelStudent,
    deleteClassroom
}
