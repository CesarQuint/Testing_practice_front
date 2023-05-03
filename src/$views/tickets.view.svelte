<script>

    import { TicketStore,PaymentStore } from '../stores'

    import Menu from '../$layouts/menu.svelte'
    import Modal from '../$components/modal.svelte'
    import Dropdown from '../$components/dropdown.svelte'

    import Tickets from '../tickets/tickets.svelte'
    import TicketRead from '../tickets/ticket.read.svelte'
    import TicketCreate from '../tickets/ticket.create.svelte'
    import TicketUpdate from '../tickets/ticket.update.svelte'
    import TicketDelete from '../tickets/ticket.delete.svelte'

    import PaymentRead from '../payments/payment.read.svelte'

    export let currentRoute = null
    let option = "information"

</script>

<style>
    i{
        margin: 0 0.3rem;
    }
</style>

<Menu path={ currentRoute.path }>
    <Tickets/>
</Menu>

<Modal id="TicketRead" title="Información" >
    <div class="tabs">
        <ul>
            <li on:click={()=>option="information"} class:is-active={option === 'information'}><a>Informacion</a></li>
            <li on:click={()=>option="charts"} class:is-active={option === 'charts'}><a><i class="fas fa-file-alt fa-xs"></i>Tabla de Pagos</a></li>
        </ul>
    </div>
    {#if option == 'information'}
        <div class="dropread">
            <Dropdown icon="bars" color="white" isRight options={[
                {value: 'edit', text: 'Editar', click: () => TicketStore.modalUpdate()},
                {value: 'delete', text: 'Borrar', click: () => TicketStore.modalDelete()},
            ]} />
        </div>
    {/if}
    
    <TicketRead option={option} />
</Modal>

<Modal id="TicketCreate" title="Crear" >
    <TicketCreate on:created={() => TicketStore.modalClose()} on:canceled={() => TicketStore.modalClose()} />
</Modal>

<Modal id="TicketUpdate" title="Editar" >
    <TicketUpdate on:updated={() => TicketStore.modalRead()} on:canceled={() => TicketStore.modalRead()} />
</Modal>

<Modal id="TicketDelete" title="Borrar" >
    <TicketDelete on:deleted={() => TicketStore.modalClose()} on:canceled={() => TicketStore.modalRead()} />
</Modal>

<Modal id="PaymentRead" title="Información" >
    <PaymentRead />
</Modal>
