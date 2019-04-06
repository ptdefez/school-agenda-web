import http from './base-http-service';
 
const userList = () => http.get('/users')
    .then(response => response.data);
 
const getProfile = (id) => http.get(`/users/${id}`)
    .then(response => response.data)
 
const updateProfile = (id, user) => {
    const data = new FormData();

    Object.keys(user).forEach(key => {
        data.append(key, user[key])
    })

    return http.put(`/users/${id}`, data)
    .then(response => response.data)
}


const deleteUser = (id) => http.delete(`/users/${id}`)
    .then(response => response.data)
 
export default {
    userList,
    getProfile,
    updateProfile,
    deleteUser
}