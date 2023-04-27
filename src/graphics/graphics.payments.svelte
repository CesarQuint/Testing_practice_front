<script>

    import Graphic from '../$components/graphic.svelte'
    import Loading from '../$components/loading.svelte'
    import Form from '../$components/form.svelte'
    import Select from '../$components/select.svelte'
    import Input from '../$components/input.svelte'
    import Button from '../$components/button.svelte'

    import GraphicsService from '../$services/graphics.service.js'
 
    let data ={} 
    let loading = false

    let labels = []
    let datasets = []


    async function getPayments() {
        labels = []
        datasets = []

        loading = true
        const response = await GraphicsService.getPaymentsGraphic(data)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        labels = response.data.labels
        datasets = response.data.datasets
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
                            <div class="column is-half">
                                <Input bind:value={data.datestart} label="Mes de Inicio" icon="calendar" placeholder="Ingrese fecha de Inicio de busqueda" type="date"/>
                            </div> 
                            <div class="column is-half">
                                <Input bind:value={data.dateend} label="Mes Final" icon="calendar" placeholder="Ingrese fecha Final de busqueda" type="date" minDate={data.daystart} />
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

    {#if labels.length > 0}
        <Graphic bind:loading={loading} chartType="bar" colorRandom labels={labels} datasets={datasets}/>
    {/if}
       


   
