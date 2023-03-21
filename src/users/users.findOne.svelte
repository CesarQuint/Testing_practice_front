<script>

import { UsersStore, UserStore, ToastStore } from '../stores'
    import {createEventDispatcher} from 'svelte'

    import UsersService from '../$services/users.service'
    import User from '../users/user.read.svelte';

    const dispatch =createEventDispatcher()

    export let value = null
    export let cargado =false
    export let userId = null

    
    let query ={find:value}
    let metadata
    $:value =query.find=value

    async function getUsers() {
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
      dispatch('Click',)
      userId = item._id
      value = item.name
    }
</script>

<div class="dropdown is-active">
    <div class="dropdown-trigger">
      <input aria-haspopup="true" aria-controls="dropdown-menu"
        bind:value on:keyup={getUsers}  
      />
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