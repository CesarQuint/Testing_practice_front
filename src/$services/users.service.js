import API from './$api'

export default {
    userLogin,
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}

async function userLogin(data) {
    return API({
        method: 'post',
        route: '/users/login',
        data
    })
}

async function createUser(data) {
    return API({
        method: 'post',
        route: '/users',
        data
    })
}

async function getUsers(query) {
    return API({
        method: 'get',
        route: '/users',
        query
    })
}

async function getUser(userId) {
    return API({
        method: 'get',
        route: `/users/${ userId }`,
    })
}

async function updateUser(userId, data) {
    return API({
        method: 'put',
        route: `/users/${ userId }`,
        data
    })
}

async function deleteUser(userId) {
    return API({
        method: 'delete',
        route: `/users/${ userId }`,
    })
}