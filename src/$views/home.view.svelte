<script>
    import {TicketStore} from '../stores'

    import Menu from '../$layouts/menu.svelte'

    import Graphic from '../$components/graphic.svelte'
    import GraphicTicket from '../graphics/graphics.tickets.svelte'
    import SelectTicket from '../tickets/ticket.select.svelte'
   
    export let currentRoute = null

    let ticket = {}


</script>

<Menu path={ currentRoute.path }>
    <div class="columns is-3">

        <Graphic colorRandom chartType="bar" labels={['ivan', 'cesar', 'Marco']} datasets={[29, 21, 32]} />

    </div>
    <div>
        <SelectTicket bind:ticket={ticket} on:select={()=>{TicketStore.set(ticket)
        }}/>
        {#if $TicketStore}
            <GraphicTicket ticketId={$TicketStore._id}/>
        {/if}
    </div>
</Menu>
