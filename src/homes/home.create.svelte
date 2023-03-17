<script>

    import { createEventDispatcher } from 'svelte'
    import { HomesStore, ToastStore } from '../stores'

    import HomeService from '../$services/homes.service'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {}

    async function createHome() {

        loading = true
        const response = await HomeService.createHome(data)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        HomesStore.append(response.data)

        ToastStore.success('Creado')
        dispatch('created')
    }

</script>

<Form on:submit={ createHome } on:canceled { loading } >
    <div class="columns">
        <Input bind:value={ data.name } label="Nombre" icon="tag" placeholder="Ingrese nombre" />
    </div>
    <div class="columns">
        <Input bind:value={ data.description } label="Descripción" icon="tag" placeholder="Ingrese descripción" />
    </div>
</Form>