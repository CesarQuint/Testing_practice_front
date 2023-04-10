<script>

    import { createEventDispatcher } from 'svelte'
    import { MaintenancesStore, ToastStore } from '../stores'

    import MaintenanceService from '../$services/maintenances.service'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {}

    async function createMaintenance() {

        loading = true
        const response = await MaintenanceService.createMaintenance(data)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        MaintenancesStore.append(response.data)

        ToastStore.success('Creado')
        dispatch('created')
    }

</script>

<Form on:submit={ createMaintenance } on:canceled { loading } >
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