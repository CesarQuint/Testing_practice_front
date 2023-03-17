<script>

    import { MaintenanceStore } from '../stores'

    import Utils from '../utils'

</script>

<div class="table-container">
    <table class="table is-fullwidth">
        <tbody>
            <tr>
                <th>Nombre</th>
                <td>{ $MaintenanceStore.name }</td>
            </tr>
            <tr>
                <th>Descripción</th>
                <td>{ $MaintenanceStore.description }</td>
            </tr>
            <tr>
                <th>Monto</th>
                <td>{ $MaintenanceStore.amount }</td>
            </tr>
            <tr>
                <th>Fecha de registro</th>
                <td>{ Utils.dateTimeLarge($MaintenanceStore.created) }</td>
            </tr>
        </tbody>
    </table>
</div>