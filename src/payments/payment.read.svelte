<script>
    import {PaymentStore} from '../stores'

    import Utils from '../utils';
</script>

<div class="table-container">
    <table class="table is-fullwidth">
        <tbody>
            <tr>
                <th>Nombre</th>
                <td>{ $PaymentStore.name }</td>
            </tr>
            <tr>
                <th>Cantidad</th>
                <td>{ Utils.cash($PaymentStore.amount) }</td>
            </tr>
            <tr>
                <th>Fecha de registro</th>
                <td>{ Utils.dateTimeLarge($PaymentStore.created) }</td>
            </tr>
        </tbody>
    </table>
</div>