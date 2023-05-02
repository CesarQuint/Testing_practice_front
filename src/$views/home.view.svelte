<script>
    import Menu from '../$layouts/menu.svelte'

    import GraphicTicket from '../graphics/graphics.tickets.svelte'
    import GraphicPayment from '../graphics/graphics.payments.svelte'
  
   
    export let currentRoute = null


</script>

<Menu path={ currentRoute.path }>
    <div>
        <GraphicPayment/>
    </div>
    <div>
        <GraphicTicket/>
    </div>
</Menu>
