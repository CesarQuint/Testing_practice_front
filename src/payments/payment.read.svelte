<script>
  import Home from '../homes/home.create.svelte';


    import { PaymentStore } from '../stores'

    import Utils from '../utils'

</script>


<div class="table-container">
    <table class="table is-fullwidth">
        <tbody>
            <tr>
                <th>Estatus</th>
                <td><strong>
                    {$PaymentStore.status == 'complete'?'Completado':$PaymentStore.status == 'failed' ?'Fallido':'Pendiente..'}
                </strong></td>
            </tr>
            <tr>
                <th>Casa</th>
                <td>{$PaymentStore.home.address}</td>  
            </tr>
            <tr>
                <th>Concepto</th>
                <td>{$PaymentStore.concept}</td>
            </tr>
            <tr>
                <th>Cantidad</th>
                <td>{Utils.cash($PaymentStore.amount)}</td>
            </tr>
            <tr>
                <th>Referencia</th>
                <td>{$PaymentStore.reference}</td>
            </tr>
            {#if $PaymentStore.voucher}
                <tr>
                    <th>Voucher de pago</th>
                    <td><a href={$PaymentStore.voucher} target="blanck">Revisa el Voucher</a></td>
                </tr>
            {/if}
           
        </tbody>
    </table>
</div>