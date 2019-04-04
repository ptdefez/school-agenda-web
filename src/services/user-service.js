import http from './base-http-service';
 
const userList = () => http.get('/users')
    .then(response => response.data);
 
const getProfile = (id) => http.get('/users/:id')
    .then(response => response.date)
 
const updateProfile = () => http.put('/users/:id')
    .then(response => response.data)


const deleteUser = () => http.delete('/users/:id')
    .then(response => response.data)
 
export default {
    userList,
    getProfile,
    updateProfile,
    deleteUser
}