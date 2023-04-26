<script>
    import {TicketStore} from '../stores'

    import Menu from '../$layouts/menu.svelte'

    import Graphic from '../$components/graphic.svelte'
    import GraphicTicket from '../graphics/graphics.tickets.svelte'
  
   
    export let currentRoute = null


</script>

<Menu path={ currentRoute.path }>
    <div class="columns is-3">

        <Graphic colorRandom chartType="bar" labels={['ivan', 'cesar', 'Marco']} datasets={[29, 21, 32]} />

    </div>
    <div>
            <GraphicTicket/>
    </div>
</Menu>
