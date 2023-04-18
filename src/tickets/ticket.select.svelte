<script>
    import { TicketsStore, ToastStore } from '../stores'
    import { createEventDispatcher } from 'svelte'

    import TicketServices from '../$services/tickets.service'

    import DropdownSelect from '../$components/dropdown.select.svelte'

    const dispatch = createEventDispatcher()

    export let ticketId = null
    export let column = true
    export let ticket = null

    let loading = false
    let query = {
        all : true
    }
    let show = false

    async function getTickets() {
        
        loading = true
        const response = await TicketServices.getTickets(query)
        loading = false

        if(response.error) 
            return ToastStore.error(response.error)

        TicketsStore.set(response.data.tickets)

        show = !!response.data.tickets.length
    }

    
    function onKeyup() {

    TicketsStore.set([])
    ticketId = null
    show = false

    if(query.find.length > 1)
        getTickets()
    }

    function onSelect(event) {

    ticket = event.detail

    ticketId = ticket._id
    query.find = ticket.concept

    dispatch('select', ticket)
    }

</script>


<DropdownSelect 
    on:select={ onSelect }
    on:keyup={ onKeyup }
    bind:value={ ticketId }
    bind:text={ query.find }
    bind:show
    label="Ticket"
    placeholder="Buscar casa"
    items={ $TicketsStore }
    prop="concept"
    { column }
/>