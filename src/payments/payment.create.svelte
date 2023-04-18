<script>

    import { createEventDispatcher } from 'svelte'
    import { PaymentsStore, ToastStore } from '../stores'

    import PaymentsService from '../$services/payments.service'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'

    import HomeSelect from '../homes/home.select.svelte'
    import TicketSelect from '../tickets/ticket.select.svelte'

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {}
    let ticket = null

    async function createPayment() {
        
        data.concept = ticket.concept
        data.amount = ticket.amount
        data.ticketId = ticket._id

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
        <TicketSelect bind:ticketId={data.ticketId} bind:ticket/>
    </div>
    <div class="columns">
        <HomeSelect bind:homeId={data.homeId}/>
    </div>
    <div class="columns">
        <Input bind:value={ data.reference } label="Referencia de pago" icon="tag" placeholder="Pago" />
    </div>
    <div class="columns">
        <Input bind:value={ data.voucher } type="file" label="Comprobante" icon="tag" placeholder="Ingrese comprobante"/>
    </div>
    {#if ticket != null}
        <div class="columns">
            <Input bind:value={ ticket.concept } readonly label="Concepto de Pago" icon="tag" placeholder="Concepto..." />
        </div>
        <div class="columns">
            <Input bind:value={ ticket.amount } readonly label="Cantidad" icon="dollar-sign" placeholder="Ingrese la cantidad" type="number" />
        </div>
    {/if}
</Form>