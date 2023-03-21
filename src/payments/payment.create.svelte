<script>

    import { createEventDispatcher } from 'svelte'
    import { PaymentsStore, ToastStore } from '../stores'

    import PaymentsService from '../$services/payments.service'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'

    import UserSelect from '../users/user.select.svelte'

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
        <UserSelect bind:userId={ data.userId } />
    </div>
    <div class="columns">
        <Input bind:value={ data.name } label="Nombre" icon="tag" placeholder="Ingrese el nombre" />
    </div>
    <div class="columns">
        <Input bind:value={ data.amount } label="Cantidad" icon="dollar-sign" placeholder="Ingrese el correo" type="number" />
    </div>
</Form>