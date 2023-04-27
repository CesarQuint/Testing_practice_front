<script>
   import moment from 'moment'


    import Graphic from '../$components/graphic.svelte'
    import SelectTicket from '../tickets/ticket.select.svelte'
    import Loading from '../$components/loading.svelte'
    import Form from '../$components/form.svelte'
    import Select from '../$components/select.svelte'
    import Input from '../$components/input.svelte'
    import Button from '../$components/button.svelte'

    import GraphicsService from '../$services/graphics.service.js'

    import Utils from '../utils'
 
    let data ={} 
    let loading = false
    let ticket = null

    let labels = []
    let datasets = []


    async function getPayments() {
        console.log(data);

        loading = true
        const response = await GraphicsService.getPaymentsGraphic(data)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

    }


</script>

<style>

</style>

    <div class="columns">
        <div class="column">
            <Form>
                <div class="columns">
                    <div class="column is-half">
                        <Select bind:value={data.dateType} label="Filtrar por:" placeholder="--Seleccione--" options={[{value:"month",text:"Mes"},{value:"day",text:"Dia"}]}/>
                    </div>
                </div>
                <div class="columns">  
                        {#if data.dateType == "month"}
                        <div class="column">
                            <Input type="date"/>
                        </div>
                        {/if}
                        {#if data.dateType == "day"}
                        <div class="column is-half">
                            <Input bind:value={data.datestart} label="Dia de Inicio" icon="calendar" placeholder="Ingrese fecha de Inicio de busqueda" type="date"/>
                        </div> 
                        <div class="column is-half">
                            <Input bind:value={data.dateend} label="Dia Final" icon="calendar" placeholder="Ingrese fecha Final de busqueda" type="date" minDate={data.daystart} />
                        </div>
                        {/if}
                </div>
                <div slot="buttons">
                    <div class="column">
                        <Button on:click={getPayments} color="primary" loading={loading} text="Buscar Pagos" type="submit"/>
                    </div>
                </div>
            </Form>
        </div>
    </div>
       


   
