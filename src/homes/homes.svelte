<script>

    import { onMount } from 'svelte'
    import { HomesStore, HomeStore, ToastStore } from '../stores'

    import HomesService from '../$services/homes.service'
    import Utils from '../utils'

    import Table from '../$components/table.svelte'
    import Search from '../$components/search.svelte'
    import Button from '../$components/button.svelte'

    let loading = false
    let query = { all: true }
    let metadata = {}

    onMount(getHomes)

    async function getHomes() {

        loading = true
        const response = await HomesService.getHomes(query)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        HomesStore.set(response.data.homes)
        metadata = response.data.metadata

        console.log(response.data.homes);
    }

</script>

<Search on:enter={ getHomes } bind:value={ query.find } >
    <Button on:click={() => HomeStore.modalCreate()} text="Agregar" icon="plus" color="primary" />
</Search>

<Table bind:query items={ $HomesStore.length } on:change={ getHomes } { metadata } { loading }>
    <thead>
        <th>#</th>
        <th>Creado por</th>
        <th>Nombre</th>
        <th>Descripcion</th>
        <th>Fecha</th>
    </thead>
    <tbody>
        {#each $HomesStore as home, index}
            <tr on:click={() => HomeStore.modalRead(home)}>
                <td>{ (index+1) + ( metadata.page * metadata.limit ) }</td>
                <td>{ home.user.name }</td>
                <td>{ home.name }</td>
                <td>{ home.description }</td>
                <td>{ Utils.dateTimeLarge(home.created) }</td>
            </tr>
        {/each}
    </tbody>
</Table>