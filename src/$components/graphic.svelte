<script>
  
    import Chart from 'chart.js'

    export let labels = []
    export let datasets = []
   

    export let chartType = 'line'
    export let colorRandom = false
    export let color = '#C8645C'
    export let fill = false

    $: canvas && setChart()

    let chart
    let canvas
    

    function setChart() {

        color = colorRandom? getColors(labels) : color

        const chartData = {
            labels,
            datasets: [{
                label: '',
                data: datasets,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1,
                fill
            }]
        }

        if(!chart)
            return chart = new Chart(canvas, {
                type: chartType,
                data: chartData
            })

        chart.data = chartData
        chart.update()
    }

    function getColors(labels) {
        return labels.map(label => {
            return `rgba(${ parseInt((Math.random() * 200) + 50) }, ${ parseInt((Math.random() * 200) + 50) }, ${ parseInt((Math.random() * 200) + 50) }, 1)`
        })
    }


</script>
<style>
    canvas{
        transition: all 500ms ease;
        transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    }
</style>
    <canvas bind:this={canvas} width={100}></canvas>