<script>

    import Menu from '../$layouts/menu.svelte'

    import Graphic from '../$components/graphic.svelte'
   
    export let currentRoute = null

</script>

<Menu path={ currentRoute.path }>
    <div class="columns is-3">

        <Graphic chartType="bar" labels={['ivan', 'cesar']} datasets={[29, 21]} />

    </div>
</Menu>
