<script>

    import { createEventDispatcher } from 'svelte'
    import { MaintenanceStore, MaintenancesStore, ToastStore } from '../stores'

    import MaintenancesService from '../$services/maintenances.service'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {
        name: $MaintenanceStore.name,
        description: $MaintenanceStore.description,
        amount: $MaintenanceStore.amount,
    }

    async function updateMaintenance() {

        loading = false
        const response = await MaintenancesService.updateMaintenance($MaintenanceStore._id, data)
        loading = true

        if(response.error)
            return ToastStore.error(response.error)

        MaintenanceStore.set(response.data)
        MaintenancesStore.replace(response.data)

        ToastStore.success('Actualizado')
        dispatch('updated')
    }

</script>

<Form on:submit={ updateMaintenance } on:canceled { loading } >
    <div class="columns">
        <Input bind:value={ data.name } label="Nombre" icon="tag" placeholder="Ingrese nombre" />
    </div>
    <div class="columns">
        <Input bind:value={ data.description } label="Descripción" icon="tag" placeholder="Ingrese descripción" />
    </div>
    <div class="columns">
        <Input bind:value={ data.amount } label="Monto" icon="dollar-sign" placeholder="Ingrese monto" />
    </div>
</Form>