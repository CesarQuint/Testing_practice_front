<script>
    import {createEventDispatcher} from 'svelte'
    import {PaymentsStore, ToastStore} from '../stores'

    import PaymentsService from '../$services/payments.service'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'
    import SearchDrop from '../$components/searchDrop.svelte'

    //TODO: revisar documentacion que es createEvent....

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {}

    async function createPayment() {

        loading = true
        const response = await PaymentsService.createPayment(data)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        PaymentsStore.append(response.data)

        ToastStore.success('¡Pago Creado!')
        dispatch('created')
    }
</script>


<Form on:submit={ createPayment } on:canceled { loading } >
    <div class="columns">
        <SearchDrop/>
    </div>
    <div class="columns">
        <Input bind:value={ data.name } label="Nombre" icon="tag" placeholder="Ingrese el nombre" />
    </div>
    <div class="columns">
        <Input bind:value={ data.amount } label="Correo" icon="dollar-sign" placeholder="Ingrese el correo" type="number" />
    </div>
</Form>