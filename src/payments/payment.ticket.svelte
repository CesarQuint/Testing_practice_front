<script>
    import { onMount } from 'svelte'
    import {PaymentsStore,PaymentStore,TicketStore} from '../stores'

    import PaymentsService from '../$services/payments.service'
    import Utils from '../utils'

    import Table from '../$components/table.svelte'
    
    
    let loading = false 
    let query = { all: true,
                  find: $TicketStore.concept             
    }
    let metadata = {}

    async function getPayments() {

        loading = true
        const response = await PaymentsService.getPayments(query)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        PaymentsStore.set(response.data.payments)
        metadata = response.data.metadata

    }
    onMount(getPayments)
</script>

{#if PaymentsStore}
    <Table bind:query items={ $PaymentsStore.length } on:change={ getPayments } { metadata } { loading }>
        <thead>
            <th>#</th>
            <th>Casa</th>
            <th>Alias</th>
            <th>Estatus</th>
        </thead>
        <tbody>
            {#each $PaymentsStore as payment, index}
                <tr on:click={() => PaymentStore.modalRead(payment)}>
                    <td>{ (index+1) + ( metadata.page * metadata.limit ) }</td>
                    <td>{String(payment.home.address).substring(0,30) + "..."}</td>
                    <td>{payment.home.alias}</td>
                    <td><strong>{payment.status == 'complete'?'Completado':payment.status == 'failed' ?'Fallido':'Pendiente..'}</strong></td>
                </tr>
            {/each}
        </tbody>
    </Table>
{/if}
