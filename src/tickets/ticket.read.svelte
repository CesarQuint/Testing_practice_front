<script>

    import { TicketStore } from '../stores'

    import PaymentTable from '../payments/payment.ticket.svelte';

    import Utils from '../utils'
    import Tabs from '../$components/tabs.svelte'


    export let option ="information"
   
</script>



<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-missing-attribute -->

<div class="table-container">
    <table class="table is-fullwidth">
        <thead>
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
                <th>Fecha limite de pago</th>
                <td>{Utils.dateLarge($TicketStore.limited)}</td>     
            </tr>
            {/if}
            {#if option == "charts"}
                <PaymentTable />
            {/if}

        </tbody>
    </table>
</div>