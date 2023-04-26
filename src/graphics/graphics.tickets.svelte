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

<SelectTicket bind:ticket={ticket} on:select={()=>{getTickets()}}/>

{#if $TicketStore && loading == false}
<div class="columns">
    <div class="column is-two-thirds">
        <Graphic bind:loading={loading} colorRandom chartType="pie" labels={labels} datasets={datasets}/>
    </div>
    <div class="column is-one-third">
        <div class="table-container">
            <table class="table is-hoverable is-fullwidth">
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
            </table>
        </div>
    </div>

</div>
{/if}
{#if !$TicketStore && loading == true}
<div class="columns">
    <Loading loading={loading}/>
</div>
{/if}

