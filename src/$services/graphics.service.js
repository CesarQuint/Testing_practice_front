import API from './$api'

export default {
    getTicketGraphic,
    getPaymentsGraphic
}

function getTicketGraphic(ticketId) {
    return API({
        method: 'get',
        route: `/graphics/ticket/${ticketId}`,
    })
}

function getPaymentsGraphic(query) {
    return API({
        method: 'get',
        route: '/graphics/payments',
        query
    })
}
