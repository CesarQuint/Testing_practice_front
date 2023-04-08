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
        userId: $HomeStore.userId
    }
    
    function removeHomeId(){
       $HomeStore.userId = ''
       data = {
        ...data,
        userId:$HomeStore.userId
       }
    }

    async function updateHomeUser() {

        loading = false
        const response = await HomesService.updateHome($HomeStore._id, data)
        loading = true

        if(response.error){
            loading = false
            return ToastStore.error(response.error)
        }

        HomeStore.set(response.data)
        HomesStore.replace(response.data)

        await getHome()

        ToastStore.success('Actualizado')
        dispatch('updated')
    }

    async function getHome() {

        const home = $HomesStore.find(home => home.userId === $HomeStore.userId )
        console.log($HomesStore);

        if(!home)
            return

        loading = true
        const response = await HomesService.getHome(home._id)
        console.log(response);
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        HomesStore.replace(response.data)

    }


</script>

<Form on:submit={ updateHomeUser } on:canceled { loading } >
    <div class="columns">
        <div class="column">
            {#if $HomeStore.userId}
                <Tag bind:value={data.userId} text={$HomeStore.user.name} color='primary'  isLight isDelete size='large' on:click={removeHomeId}/>
            {/if}
            {#if !$HomeStore.userId}
                <div class="columns">
                    <SelectUser bind:userId={data.userId}/>
                </div>
            {/if}
        </div>
    </div>
</Form>