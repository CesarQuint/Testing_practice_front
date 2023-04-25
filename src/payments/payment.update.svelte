<script>

    import { createEventDispatcher } from 'svelte'
    import { PaymentStore, PaymentsStore, ToastStore } from '../stores'

    import PaymentsService from '../$services/payments.service'

    import Form from '../$components/form.svelte'
    import Input from '../$components/input.svelte'
    import Dropdown from '../$components/dropdown.svelte'

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {
        homeId: $PaymentStore.homeId,
        concept: $PaymentStore.concept,
        reference: $PaymentStore.reference,
        voucher: $PaymentStore.voucher,
        amount: $PaymentStore.amount,
        status:$PaymentStore.status
    }

    async function updatePayment() {

        loading = true
        const response = await PaymentsService.updatePayment($PaymentStore._id, data)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        PaymentsStore.replace(response.data)
        PaymentStore.set(response.data)

        ToastStore.success('¡Pago actualizado!')
        dispatch('updated')
    }

</script>

<Form on:submit={ updatePayment } on:canceled { loading } >
    <div class="columns">
        <Input bind:value={ data.concept } label="Concepto" icon="tag" placeholder="Ingrese el concepto" />
    </div>
    <div class="columns">
        <Input bind:value={ data.reference } label="Referencia" icon="tag" placeholder="Ingrese la referencia" />
    </div>

    {#if $PaymentStore.voucher }
        <div class="columns">
            <Input bind:value={ data.voucher } type="file" label="Comprobante" icon="tag" placeholder="Ingrese comprobante"/>
        </div>
    {/if}
    
    <div class="columns">
        <Input bind:value={ data.amount } label="Cantidad" icon="dollar-sign" placeholder="Ingrese la referencia" type="number" />
    </div>
    <div class="columns">
        <Dropdown bind:value={data.status} column text="Estatus de pago" options={[{text:"Pendiente",value:"pending"},
                                                                                   {text:"Completado",value:"complete"},
                                                                                   {text:"Fallido",value:"failed"}]}/>
    </div>
</Form>