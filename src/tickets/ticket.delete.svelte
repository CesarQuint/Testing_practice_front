<script>

    import { createEventDispatcher } from 'svelte'
    import { MaintenanceStore, MaintenancesStore, ToastStore } from '../stores'

    import MaintenancesService from '../$services/maintenances.service'

    import Form from '../$components/form.svelte'

    const dispatch = createEventDispatcher()

    let loading = false

    async function deleteMaintenance() {

        loading = true
        const response = await MaintenancesService.deleteMaintenance($MaintenanceStore._id)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        MaintenancesStore.remove($MaintenanceStore._id)

        ToastStore.success('Borrado')
        dispatch('deleted')
    }

</script>

<Form on:submit={ deleteMaintenance } on:canceled { loading } >
    <div class="columns">
        <div class="column">
            <div class="title">¿Seguro que quieres borrar el registro?</div>
        </div>
    </div>
</Form>