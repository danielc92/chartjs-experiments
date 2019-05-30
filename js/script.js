Chart.defaults.global.defaultFontFamily = 'monospace';

var ctx = document.getElementById('myChart').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');
var ctx3 = document.getElementById('myChart3').getContext('2d');

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
    			beginAtZero: true,

    		}
    	}]
    }
};


var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'scatter',

    // The data for our dataset
    data: {

    	datasets: [{
            label: 'Scatter Dataset',
            pointRadius: 5,
            backgroundColor: 'rgba(0,0,255,0.8)',
            data: [{
                x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }, {
                x: 0,
                y: 10
            }, {
                x: 32,
                y: 32
            }, {
                x: 12,
                y: 32
            }, {
                x: 45,
                y: 40
            }]
        }]
    },

    // Configuration options go here
    options: options
});

var chart2 = new Chart(ctx2, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
    	labels: ['Watermelon', 'Kiwi', 'Potato', 'Carrot', 'Apple'],
    	datasets: [{
            label: 'Season 1 Harvest',
            backgroundColor: 'rgba(0,0,255,0.7)',
            data: [30, -20, 5, 15, -10]
        },
        {
            label: 'Season 2 Harvest',
            backgroundColor: 'rgba(255,0,0,.8)',
            data: [20, 10, 5, 15, 8]
        },
        {
            label: 'Season 3 Harvest',
            backgroundColor: 'rgba(0,233,0,.8)',
            data: [8, 20, 12, 15,12]
        }
    ]
    },

    // Configuration options go here
    options: options
});

var chart3_labels = ['Jimmy', 'Anna', 'Nicole'];
var chart3_data = [122, 145, 83];


var chart3 = new Chart(ctx3, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: chart3_labels,
        datasets: [{
            label: 'Employees at XYZ Corp',
            backgroundColor: 'rgba(0,0,255,0.5)',
            data: chart3_data
        }]
    },

    // Configuration options go here
    options: options
});

var btn3_add = document.getElementById('btn3_add');
var btn3_remove = document.getElementById('btn3_remove');


function addData() {
    let label_value = document.getElementById("label_input").value;
    let number_value = document.getElementById("number_input").value;

    if ((label_value.length > 0) && (number_value.length > 0)) {
        chart3_labels.push(label_value);
        chart3_data.push(number_value);
        chart3.update();
    } else {
        alert('You must enter appropriate values');
    }
}


function removeData() {
    chart3_labels.pop();
    chart3_data.pop();
    console.log(chart3_data);
    chart3.update();
}


btn3_add.addEventListener('click', addData);
btn3_remove.addEventListener('click', removeData);


