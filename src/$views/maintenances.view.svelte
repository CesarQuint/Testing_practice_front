<script>

    import { MaintenanceStore } from '../stores'

    import Menu from '../$layouts/menu.svelte'
    import Modal from '../$components/modal.svelte'
    import Dropdown from '../$components/dropdown.svelte'

    import Maintenances from '../maintenances/maintenances.svelte'
    import MaintenanceRead from '../maintenances/maintenance.read.svelte'
    import MaintenanceCreate from '../maintenances/maintenance.create.svelte'
    import MaintenanceUpdate from '../maintenances/maintenance.update.svelte'
    import MaintenanceDelete from '../maintenances/maintenance.delete.svelte'

    export let currentRoute = null

</script>

<Menu path={ currentRoute.path }>
    <Maintenances />
</Menu>

<Modal id="MaintenanceRead" title="Información" >
    <div class="dropread">
        <Dropdown icon="bars" color="white" isRight options={[
            {value: 'edit', text: 'Editar', click: () => MaintenanceStore.modalUpdate()},
            {value: 'delete', text: 'Borrar', click: () => MaintenanceStore.modalDelete()},
        ]} />
    </div>
    <MaintenanceRead />
</Modal>

<Modal id="MaintenanceCreate" title="Crear" >
    <MaintenanceCreate on:created={() => MaintenanceStore.modalClose()} on:canceled={() => MaintenanceStore.modalClose()} />
</Modal>

<Modal id="MaintenanceUpdate" title="Editar" >
    <MaintenanceUpdate on:updated={() => MaintenanceStore.modalRead()} on:canceled={() => MaintenanceStore.modalRead()} />
</Modal>

<Modal id="MaintenanceDelete" title="Borrar" >
    <MaintenanceDelete on:deleted={() => MaintenanceStore.modalClose()} on:canceled={() => MaintenanceStore.modalRead()} />
</Modal>