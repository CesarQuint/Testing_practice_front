<script>

    import { onMount } from 'svelte'
    import { navigateTo } from 'svelte-router-spa'
    import { SessionStore, ToastStore } from '../stores'

    import SessionsService from '../$services/sessions.service'
    import Storage from '../storage'

    export let path = null

    let loading = false

    onMount(verifySession)

    async function verifySession() {

        loading = true
        const response = await SessionsService.verifySession($SessionStore.token)
        loading = false

        if(response.success)
            return SessionStore.set(response.data)

        ToastStore.error(response.error)
        Storage.deleteItem('session')
        navigateTo('login')
    }

    function logout() {
        localStorage.removeItem('session')
        navigateTo('/')
    }

</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

{#if $SessionStore}
    <section class="hero is-primary">
        <div class="hero-head">
            <nav class="navbar">
                <div class="container">
                    <div class="navbar-brand">
                        <a class="navbar-item">
                            SVELTE APP
                        </a>
                    </div>
                    <div class="navbar-menu">
                        <div class="navbar-end">
                            <a on:click={ logout } class="navbar-item">Salir</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </section>
    <br>
    <div class="container">
        <div class="tabs">
            <ul>
                <li on:click={() => navigateTo('home')} class:is-active={path === '/home'}><a>Home</a></li>
                <li on:click={() => navigateTo('users')} class:is-active={path === '/users'}><a>Usuarios</a></li>
                <li on:click={() => navigateTo('payments')} class:is-active={path === '/payments'}><a>Pagos</a></li>
            </ul>
        </div>
        <slot></slot>
    </div>
{/if}