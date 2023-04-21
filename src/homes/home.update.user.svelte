<script>

    import { createEventDispatcher } from 'svelte'
    import { HomeStore, HomesStore, ToastStore } from '../stores'
    import UserService from '../$services/users.service'

    import HomesService from '../$services/homes.service'
    import SelectUser from '../users/user.select.svelte'

    import Form from '../$components/form.svelte'

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {
        userId: $HomeStore.userId
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

        console.log($HomesStore);
       
        await getHome(response.data.userId)

        ToastStore.success('Actualizado')
        dispatch('updated')
    }

    async function getHome(userId) {

        const homes = $HomesStore.filter(home => home.userId == userId)
        if(homes.length > 0){
            homes.forEach(home => {
                console.log(home.updated);
            })
        }

        // if(!home)
        //     return

        // loading = true
        // const response = await HomesService.getHome(home._id)
        // loading = false

        // if(response.error)
        //     return ToastStore.error(response.error)

        // HomesStore.replace(response.data)

    }


</script>

<Form on:submit={ updateHomeUser } on:canceled { loading } >
    <div class="columns">
        <div class="column">
                <div class="columns">
                    <SelectUser bind:userId={data.userId}/>
                </div>
        </div>
    </div>
</Form>