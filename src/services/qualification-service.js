import http from './base-http-service';

const list = () => http.get('/qualification')
    .then(response => response.data)
 
const create = (qualification) => {
    qualification.student = qualification.student.id || qualification.student;
    return http.post(`/qualifications`, qualification) 
        .then(response => response.data)
}
const getOne = (id) => http.get(`/qualification/${id}`)
    .then(response => response.data)


export default {
    list,
    create,
    getOne
}