import http from './base-http-service';
 
const list = () => http.get('/classrooms')
    .then(response => response.data)
 
const create = (classroom) => http.post('/classrooms', classroom)
    .then(response => response.data)
 
const get = (id) => http.get(`/classrooms/${id}`)
    .then(response => response.data)
 
const update = (id) => http.put(`/classrooms/${id}`)
    .then(response => response.data)
 
const addStudent = (id) => http.put(`/classrooms/${id}/addStudent`)
    .then(response => response.data)
 
const deleteClassroom = (id) => http.delete(`/classrooms/${id}`)
    .then(response => response.data)
 
export default {
    list,
    create,
    get,
    update,
    addStudent,
    deleteClassroom
}
