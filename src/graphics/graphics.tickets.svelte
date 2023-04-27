<script>
    import {TicketStore} from '../stores'

    import Graphic from '../$components/graphic.svelte'
    import SelectTicket from '../tickets/ticket.select.svelte'
    import Loading from '../$components/loading.svelte'

    import GraphicsService from '../$services/graphics.service.js'

    import Utils from '../utils'
 

    let loading = false
    let ticket = null

    let labels = []
    let datasets = []

    async function getTickets() {
        TicketStore.set(null)

        loading = true
        const response = await GraphicsService.getTicketGraphic(ticket._id)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)


        labels=["Pagados","Sin Pagar"]
        datasets = response.data.datasets
        
        TicketStore.set(response.data.ticket)
    }


</script>

<style>
    .columns.tickets{
        min-height: 24rem;
    }
    .column.no-chart{
        display: flex;
        justify-content: center;
        min-height: 24rem;
        gap: 1rem;
        flex-direction: column;
        align-items: center;
    }
    p.icon{
        font-size: 5rem;
        margin: 2rem;
    }
</style>

<SelectTicket bind:ticket={ticket} on:select={()=>{getTickets()}}/>

    <div class="columns tickets">
        <div class="column is-two-thirds no-chart">
            {#if $TicketStore && loading == false}
                <Graphic bind:loading={loading} colorRandom chartType="pie" labels={labels} datasets={datasets}/>
            {/if}
            {#if !$TicketStore}
                <p class="icon">
                    <i class="fas fa-chart-pie fa-lg" style="color: #d9d9d9;"></i>
                </p> 
                <p class="text">
                Ve el porcentaje del pago de tus Tickets...
                </p>
            {/if}

    </div>
    <div class="column is-one-third">
        
        <div class="table-container">
            <table class="table is-hoverable is-fullwidth">
                {#if $TicketStore && loading == false}
                <thead>
                    <strong>
                        {$TicketStore.concept}
                    </strong>
                </thead>
                <tbody>
                    <tr>
                        <th>Cantidad</th>
                        <td>{Utils.cash($TicketStore.amount)}</td>
                    </tr>
                    <tr>
                        <th>Pagados</th>
                        <td>{datasets[0]}</td>
                    </tr>
                    <tr>
                        <th>Sin Pagar</th>
                        <td>{datasets[1]}</td>
                    </tr> 
                    <tr>
                        <th>Total Pagado</th>
                        <td>{Utils.cash($TicketStore.amount*datasets[0])}</td>
                    </tr>  
                </tbody>
                {/if}
            </table>
        </div>
    </div>
</div>

