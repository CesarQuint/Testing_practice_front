<script>
    import {createEventDispatcher} from 'svelte'
    import {PaymentsStore, ToastStore} from '../stores'

    import PaymentsService from '../$services/payments.service'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'
    import UserFind from '../users/users.findOne.svelte'

    ////

    function setUser(userId,userN) {
    console.log(userN,userId);
    }

    ////

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

{data.userId}
<Form on:submit={ createPayment } on:canceled { loading } >
    <div class="columns">
        <UserFind on:Click={setUser} bind:userId={data.userId}/>    
    </div>
    <div class="columns">
        <Input bind:value={ data.name } label="Nombre" icon="tag" placeholder="Ingrese el nombre" />
    </div>
    <div class="columns">
        <Input bind:value={ data.amount } label="Correo" icon="dollar-sign" placeholder="Ingrese el correo" type="number" />
    </div>
</Form>