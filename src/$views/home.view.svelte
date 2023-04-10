<script>

    import Menu from '../$layouts/menu.svelte'
    import Modal from '../$components/modal.svelte';
    import Dropdown from '../$components/dropdown.svelte';

    export let currentRoute = null

</script>

<Menu path={ currentRoute.path }>
    <h1 class="title is-4">Notificaciones</h1>
</Menu>