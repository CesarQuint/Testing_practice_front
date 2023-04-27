<script>
   
    import Graphic from '../$components/graphic.svelte'
    import SelectTicket from '../tickets/ticket.select.svelte'
    import Loading from '../$components/loading.svelte'
    import Form from '../$components/form.svelte'
    import Select from '../$components/select.svelte'

    import GraphicsService from '../$services/graphics.service.js'

    import Utils from '../utils'
 
    let query ={} 
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

</style>

<div class="columns">
    <div class="column">
        <Form>
            <Select bind:value={query.dateType} label="Filtrar por:" placeholder="--Seleccione--" options={[{value:"month",text:"Mes"},{value:"day",text:"Dia"}]}/>
            {#if query.dateType == "month"}
                <Select
                bind:value={query.month} label="Selecciona el mes" placeholder="--Seleccione--" options={[{value:"01",text:"Enero"},{value:"day",text:"Dia"}]}
                />
            {/if}
        </Form>
    </div>
</div>


   
