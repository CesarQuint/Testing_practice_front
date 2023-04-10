<script>

    import { createEventDispatcher } from 'svelte'
    import { NotificationsStore, ToastStore } from '../stores'

    import NotificationService from '../$services/notifications.service'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'

    const dispatch = createEventDispatcher()

    let show = false
    let loading = false
    let data = {}

    async function createNotification() {

        loading = true
        const response = await NotificationService.createNotification(data)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        NotificationsStore.append(response.data)

        ToastStore.success('Creado')
        dispatch('created')
    }

</script>

<Form on:submit={ createNotification } on:canceled { loading } >
    <div class="columns">
        <Input bind:value={ data.street } label="Calle" icon="tag" placeholder="Ingrese la calle"/>
    </div>
    <div class="columns">
        <Input bind:value={ data.extnumber } label="Numero Exterior" icon="hashtag" placeholder="Numero Exterior" />
    </div>
    <div class="columns">
        <Input bind:value={ data.intnumber } label="Numero Interior" icon="hashtag" placeholder="Numero Interior" />
    </div>
    <div class="columns">
        <Input bind:value={ data.colony } label="Colonia" icon="tag" placeholder="Colonia" />
    </div>
    <div class="columns">
        <Input bind:value={ data.section } label="Seccion" icon="tag" placeholder="Seccion" />
    </div>
</Form>