<script>

    import { createEventDispatcher } from 'svelte'
    import { HomeStore, HomesStore, ToastStore } from '../stores'
    import UserService from '../$services/users.service'

    import HomesService from '../$services/homes.service'
    import SelectUser from '../users/user.select.svelte'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'
    import Tag from '../$components/tag.svelte' 

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {
        userId: $HomeStore.userId,
        street: $HomeStore.street,
        extnumber: $HomeStore.extnumber,
        intnumber: $HomeStore.intnumber,
        colony: $HomeStore.colony,
        section: $HomeStore.section,
    }
    
    function removeHomeId(){
       $HomeStore.userId = ''
       data = {
        ...data,
        userId:$HomeStore.userId
       }
    }

    async function updateHome() {

        loading = false
        const response = await HomesService.updateHome($HomeStore._id, data)
        const usuario = await UserService.updateUser($HomeStore.user._id,{homeId:$HomeStore._id})
        console.log(usuario,response);
        loading = true

        if(response.error){
            loading = false
            return ToastStore.error(response.error)
        }
        if(usuario.error){
            loading = false
            return ToastStore.error(usuario.error)
        }
        HomeStore.set(response.data)
        HomesStore.replace(response.data)

        ToastStore.success('Actualizado')
        dispatch('updated')
    }


</script>

<Form on:submit={ updateHome } on:canceled { loading } >
    <div class="columns">
        <div class="column">
            {#if $HomeStore.userId}
                <Tag bind:value={data.userId} text={$HomeStore.user.name} color='primary' isLight isDelete size='large' on:click={removeHomeId}/>
            {/if}
            {#if !$HomeStore.userId}
                <div class="columns">
                    <SelectUser bind:userId={data.userId}/>
                </div>
            {/if}
        </div>
    </div>
    

    <div class="columns">
        <Input bind:value={ data.street } label="Calle" icon="tag" placeholder="Ingrese nombre" />
    </div>
    <div class="columns">
        <Input bind:value={ data.extnumber } label="Numero Exterior" icon="tag" placeholder="Ingrese descripción" />
    </div>
    <div class="columns">
        <Input bind:value={ data.intnumber } label="Numero Interior" icon="tag" placeholder="Ingrese nombre" />
    </div>
    <div class="columns">
        <Input bind:value={ data.colony } label="Colonia" icon="tag" placeholder="Ingrese descripción" />
    </div>
    <div class="columns">
        <Input bind:value={ data.section } label="Seccion" icon="tag" placeholder="Ingrese descripción" />
    </div>
</Form>