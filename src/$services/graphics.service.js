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

function getPaymentsGraphic(data) {
    return API({
        method: 'post',
        route: '/graphics/payments',
        data
    })
}
