<script>

    import { UserStore } from '../stores'

    import Utils from '../utils'
    import UserHome from '../homes/home.user.read.svelte'

</script>

<div class="table-container">
    <table class="table is-fullwidth">
        <tbody>
            <tr>
                <th>Nombre</th>
                <td>{ $UserStore.name }</td>
            </tr>
            <tr>
                <th>Correo</th>
                <td>{ $UserStore.email }</td>
            </tr>
            <tr>
                <th>Telefono</th>
                <td>{ $UserStore.phone }</td>
            </tr>
                <th>Casa</th>
                <td> {$UserStore.home ? 'Casa en calle: '+ $UserStore.home.street +' Numero Ext: '+ $UserStore.home.extnumber : 'Casa no asignada'}</td>
                <UserHome/>
            <tr>
                <th>Fecha de registro</th>
                <td>{ Utils.dateTimeLarge($UserStore.created) }</td>
            </tr>
        </tbody>
    </table>
</div>