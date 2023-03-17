<script>

    import { navigateTo } from 'svelte-router-spa'

    import Button from '../$components/button.svelte'

</script>

<div class="container">
    <div class="title">Index Page</div>
    <div class="subtitle">
        <Button on:click={() => navigateTo('login')} text="Login" icon="user" />
    </div>
</div>