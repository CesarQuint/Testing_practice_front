<script>

    import { onMount } from 'svelte';

    import Graphic from '../$components/graphic.svelte'

    import GraphicsService from '../$services/graphics.service.js'

    let loading = false
    export let ticketId = null

    let labels = []
    let datasets = []

    onMount(getTickets)

    async function getTickets() {

        loading = true
        const response = await GraphicsService.getTicketGraphic(ticketId)
        loading = false

        if(response.error)
            // toast

        labels = response.data.labels
        datasets = response.data.datasets
    }


</script>

<p>test</p>

