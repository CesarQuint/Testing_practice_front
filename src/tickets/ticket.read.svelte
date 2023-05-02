<script>

    import { TicketStore } from '../stores'

    import PaymentTable from '../payments/payment.ticket.svelte';

    import Utils from '../utils'
    import Tabs from '../$components/tabs.svelte'


    let option ="information"
   
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-missing-attribute -->

<div class="table-container">
    <table class="table is-fullwidth">
        <thead>
            <div class="tabs">
                <ul>
                    <li on:click={()=>option="information"} class:is-active={option === 'information'}><a>Informacion</a></li>
                    <li on:click={()=>option="charts"} class:is-active={option === 'charts'}><a><i class="fas fa-file-alt fa-xs"></i>Tabla de Pagos</a></li>
                </ul>
            </div>
        </thead>
        <tbody>
            {#if option == "information"}
            <tr>
                <th>Concepto</th>
                <td>{$TicketStore.concept}</td>
            </tr>
            <tr>
                <th>Tipo</th>
                <td>{$TicketStore.type}</td>
            </tr>
            <tr>
                <th>Cantidad</th>
                <td>{Utils.cash($TicketStore.amount)}</td>
            </tr>
            <tr>
                <th>Fecha de Creacion</th>
                <td>{Utils.dateLarge($TicketStore.created)}</td>
            </tr>
            <tr>
                <th>Fecha Limite</th>
                <td>{Utils.dateLarge($TicketStore.limited)}</td>     
            </tr>
            {/if}
            {#if option == "charts"}
                <PaymentTable />
            {/if}

        </tbody>
    </table>
</div>