<script>

    import { UsersStore, ToastStore } from '../stores'
    import {createEventDispatcher} from 'svelte'

    import UsersService from '../$services/users.service'
    import Input from '../$components/input.svelte'

    const dispatch =createEventDispatcher()

    export let value = null
    let cargado =false
    export let userId = null


    async function getUsers() {

        let query ={find:value}
        let metadata

      console.log(value.length);
      if (value.length < 2) {
        cargado=false
        return
      }
      const response = await UsersService.getUsers(query)

      if(response.data.users.length == 0) {
        cargado=false
        return 
      }

      if(response.error)
            return ToastStore.error(response.error)

        UsersStore.set(response.data.users)
        metadata = response.data.metadata
        cargado=true
    
    }

    function Click(item){
        cargado=false
        dispatch('Click',)
        userId = item._id
        value = item.name
    }
</script>

<div class="dropdown is-active">
    <div class="dropdown-trigger">
      <Input type="text" aria-haspopup="true" aria-controls="dropdown-menu"
      bind:value label="Nombre Creador" icon="tag" on:keyup={getUsers}  />
    </div>
    {#if cargado}
      <div class='dropdown-menu'id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          {#each $UsersStore as user }
          <a href="#" class="dropdown-item" on:click={()=>Click(user)}>
            {user.name}
          </a>
          {/each}
        </div>
      </div>
    {/if}
    
  </div>