import http from './base-http-service';
 
const list = () => http.get('/classrooms')
    .then(response => response.data)
 
const create = (classroom) => http.post('/classroom', classroom)
    .then(response => response.data)
 
const get = (id) => http.get(`/classroom/${id}`)
    .then(response => response.data)
 
const update = (id) => http.put(`/classroom/${id}`)
    .then(response => response.data)
 
const addStudent = (id) => http.put(`/classroom/${id}/addStudent`)
    .then(response => response.data)
 
const deleteClassroom = (id) => http.delete(`/classroom/${id}`)
    .then(response => response.data)
 
export default {
    list,
    create,
    get,
    update,
    addStudent,
    deleteClassroom
}
