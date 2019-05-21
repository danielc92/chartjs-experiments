Chart.defaults.global.defaultFontFamily = 'monospace';

var ctx = document.getElementById('myChart').getContext('2d');

function done(){
  var url = chart.toBase64Image();
  document.getElementById("download-chart").href = url;
}

var options = {

	title: {
		display: true,
		text: 'A custom chart'
	},

    animation: {
    	duration: 1200,
        onComplete: done

    },

    scales: {
    	yAxes: [{
    		ticks: {
    			beginAtZero: true
    		}
    	}]
    }
};


var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['Apples', 'Bananas', 'Carrots', 'Kiwi', 'Watermelon'],
        datasets: [{
            label: 'Season 1 Harvest',
            backgroundColor: 'rgba(0,0,255,.8)',
            // borderColor: 'rgb(0,0,0)',
            data: [30, -20, 5, 15, -10]
        },
        {
            label: 'Season 2 Harvest',
            backgroundColor: 'rgba(255,0,0,.8)',
            // borderColor: 'rgb(0,0,0)',
            data: [20, 10, 5, 15, 8]
        },
        {
            label: 'Season 3 Harvest',
            backgroundColor: 'rgba(0,233,0,.8)',
            // borderColor: 'rgb(0,0,0)',
            data: [8, 20, 12, 15,12]
        }]
    },

    // Configuration options go here
    options: options
});
