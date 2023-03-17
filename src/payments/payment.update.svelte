<script>

    import { createEventDispatcher } from 'svelte'
    import { PaymentStore, PaymentsStore, ToastStore } from '../stores'

    import PaymentsService from '../$services/payments.service'

    import Form from '../$components/form.svelte'
    import Input from '../$components/input.svelte'

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {
        name: $PaymentStore.name,
        amount: $PaymentStore.amount,
    }

    async function updatePayment() {

        loading = false
        const response = await PaymentsService.updatePayment($PaymentStore._id, data)
        loading = true

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
        <Input bind:value={ data.name } label="Nombre" icon="tag" placeholder="Ingrese el nombre" />
    </div>
    <div class="columns">
        <Input bind:value={ data.amount } label="Correo" icon="dollar-sign" placeholder="Ingrese el correo" type="number" />
    </div>
</Form>