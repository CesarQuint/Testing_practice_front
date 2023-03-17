<script>

    import { HomeStore } from '../stores'

    import Utils from '../utils'

</script>

<div class="table-container">
    <table class="table is-fullwidth">
        <tbody>
            <tr>
                <th>Nombre</th>
                <td>{ $HomeStore.name }</td>
            </tr>
            <tr>
                <th>Descripción</th>
                <td>{ $HomeStore.description }</td>
            </tr>
            <tr>
                <th>Fecha de registro</th>
                <td>{ Utils.dateTimeLarge($HomeStore.created) }</td>
            </tr>
        </tbody>
    </table>
</div>