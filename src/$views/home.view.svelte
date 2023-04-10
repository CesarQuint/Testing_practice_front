<script>

    import Menu from '../$layouts/menu.svelte'
   
    export let currentRoute = null

</script>

<Menu path={ currentRoute.path }>
    <h1 class="title is-4">Notificaciones</h1>
    <h1 class="title is-4">Post</h1>
</Menu>
