<script>


    import Graphic from '../$components/graphic.svelte'

    import GraphicsService from '../$services/graphics.service.js'

    let loading = false
    let query = {}

    let labels = []
    let datasets = []

    function getPayments() {

        loading = true
        const response = await GraphicsService.getPayments(query)
        loading = false

        if(response.error)
            // toast

        labels = response.data.labels
        datasets = response.data.datasets
    }


</script>

<Graphic type="bar" { labels } { datasets } />