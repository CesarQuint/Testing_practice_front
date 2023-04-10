<script>

    import { onMount } from 'svelte'
    import { NotificationsStore, NotificationStore, ToastStore } from '../stores'

    import NotificationsService from '../$services/notifications.service'
    import Utils from '../utils'

    import Table from '../$components/table.svelte'
    import Search from '../$components/search.svelte'
    import Button from '../$components/button.svelte'

    let loading = false
    let query = { all: true }
    let metadata = {}

    onMount(getNotifications)

    async function getNotifications() {

        loading = true
        const response = await NotificationsService.getNotifications(query)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        NotificationsStore.set(response.data.notifications)
        metadata = response.data.metadata

    }

</script>

<Search on:enter={ getNotifications } bind:value={ query.find } >
    <Button on:click={() => NotificationStore.modalCreate()} text="Agregar" icon="plus" color="primary" />
</Search>

<Table bind:query items={ $NotificationsStore.length } on:change={ getNotifications } { metadata } { loading }>
    <thead>
        <th>#</th>
        <th>Dueño</th>
        <th>Direccion</th>
        <th>Fecha de creacion</th>
    </thead>
    <tbody>
        {#each $NotificationsStore as Notification, index}
            <tr on:click={() => NotificationStore.modalRead(Notification)}>
                <td>{ (index+1) + ( metadata.page * metadata.limit ) }</td>
            </tr>
        {/each}
    </tbody>
</Table>