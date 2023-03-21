<script>
    
    import { createEventDispatcher } from 'svelte'
    import { UsersStore, UserStore, ToastStore } from '../stores'
    import { fade } from 'svelte/transition'

    import UsersService from '../$services/users.service'
    import Input from './input.svelte'
  import User from '../users/user.read.svelte';

    export let value = null
    let query = {find:value}
    $:value =query.find=value
    let metadata = {}

    const dispatch = createEventDispatcher()

    async function getUsers(){
      console.log(value.length);
      if (value.length < 2) {
        return
      }
      const response = await UsersService.getUsers(query)
      if(response.error)
            return ToastStore.error(response.error)

        UsersStore.set(response.data.users)
        metadata = response.data.metadata
        console.log($UsersStore);
      

    }

  function setUser(userId){
    console.log(userId);
  }
 

</script>

<div class="dropdown is-active">
    <div class="dropdown-trigger">
      <input aria-haspopup="true" aria-controls="dropdown-menu"
        bind:value on:keyup={getUsers}
      />
    </div>
    <div class={`${$UsersStore.length > 0 && 'dropdown-menu'}`} id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        {#each $UsersStore as User (User._id) }
        <a href="#" class="dropdown-item" on:click={setUser(User._id)}>
          {User.name}
        </a>
        {/each}
      </div>
    </div>
  </div>