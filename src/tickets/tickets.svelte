<script>

    import { onMount } from 'svelte'
    import { MaintenancesStore, MaintenanceStore, ToastStore } from '../stores'

    import MaintenancesService from '../$services/maintenances.service'
    import Utils from '../utils'

    import Table from '../$components/table.svelte'
    import Search from '../$components/search.svelte'
    import Button from '../$components/button.svelte'

    let loading = false
    let query = {}
    let metadata = {}

    onMount(getMaintenances)

    async function getMaintenances() {

        loading = true
        const response = await MaintenancesService.getMaintenances(query)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        MaintenancesStore.set(response.data.maintenances)
        metadata = response.data.metadata
    }

</script>

<Search on:enter={ getMaintenances } bind:value={ query.find } >
    <Button on:click={() => MaintenanceStore.modalCreate()} text="Agregar" icon="plus" color="primary" />
</Search>

<Table bind:query items={ $MaintenancesStore.length } on:change={ getMaintenances } { metadata } { loading }>
    <thead>
        <th>#</th>
        <th>Fecha</th>
    </thead>
    <tbody>
        {#each $MaintenancesStore as maintenance, index}
            <tr on:click={() => MaintenanceStore.modalRead(maintenance)}>
                <td>{ (index+1) + ( metadata.page * metadata.limit ) }</td>
                <td>{ Utils.dateTimeLarge(maintenance.created) }</td>
            </tr>
        {/each}
    </tbody>
</Table>