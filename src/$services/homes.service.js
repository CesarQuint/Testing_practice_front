import API from './$api'

export default {
    createHome,
    getHomes,
    getHomeUser,
    getHome,
    updateHomeUser,
    updateHome,
    deleteHome,
}

function createHome(data) {
    return API({
        method: 'post',
        route: '/homes',
        data
    })
}

function getHomes(query) {
    return API({
        method: 'get',
        route: '/homes',
        query
    })
}

function getHome(homeId) {
    return API({
        method: 'get',
        route: `/homes/${ homeId }`,
    })
}

function getHomeUser(userId) {
    return API({
        method: 'get',
        route: `/homes/${ userId }`,
    })
}

function updateHome(homeId, data) {
    return API({
        method: 'put',
        route: `/homes/${ homeId }`,
        data
    })
}

function updateHomeUser(homeId, data) {
    return API({
        method: 'put',
        route: `/homes/${ homeId }/user`,
        data
    })
}

function deleteHome(homeId) {
    return API({
        method: 'delete',
        route: `/homes/${ homeId }`,
    })
}