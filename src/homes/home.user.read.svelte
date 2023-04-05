<script>

    import { onMount } from 'svelte';
    import { UserStore } from '../stores'

    import HomeService from '../$services/homes.service'

    onMount(async()=>{
     let {data} = await HomeService.getHomeUser($UserStore._id)
     console.log(data[0]);
    })

</script>

    