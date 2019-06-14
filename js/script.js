//Chart.defaults.global.defaultFontFamily = 'monospace';

var ctx = document.getElementById('myChart').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');
var ctx3 = document.getElementById('myChart3').getContext('2d');
var ctx4 = document.getElementById('myChart4').getContext('2d');

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

/* Filtered chart */
let raw = [{'sale':12.32, 'category':'PANTS', 'region':'west'},
           {'sale':43.32, 'category':'PANTS', 'region':'west'},
           {'sale':11.32, 'category':'SHIRTS', 'region':'south-east'},
           {'sale':5.32, 'category':'SHIRTS', 'region':'south-east'},
           {'sale':7.32, 'category':'SHIRTS', 'region':'west'},
           {'sale':34.32, 'category':'BELTS', 'region':'east'},
           {'sale':65.32, 'category':'SHIRTS', 'region':'west'},
           {'sale':23.32, 'category':'SHOES', 'region':'west'},
           {'sale':23.32, 'category':'SHOES', 'region':'east'},
           {'sale':43.32, 'category':'SHOES', 'region':'north'},
           {'sale':43.32, 'category':'SHIRTS', 'region':'north'},
           {'sale':23.32, 'category':'SHIRTS', 'region':'west'}];


// Set unique_categories
let categories = raw.map( item => {return item['category']});
let unique_categories = [...new Set(categories)];


// Set global variable for filterCheck
let filterCheck = [];


// Set Global for x axis
let xAxis = 'region';


// Set two copies of transposed data (one for filtering, one for resetting)
let transposed = transposeData(raw, 'sale', xAxis);
let original_data = transposeData(raw, 'sale', xAxis);

// Function to filter data
function filterData(raw, items, filter_criteria) {
    let results = raw.filter( item => {
        if (items.indexOf(item[filter_criteria]) > -1) {
            return item
        }
    })

    return results;
}


// Function to transpose data into chart JS format
function transposeData(raw, data_key, label_key) {
	
	let transposed = {'data':[], 'labels':[]}

	raw.map( dictionary => {

		let key = dictionary[label_key];
		let value = dictionary[data_key];
		let existsIndex = transposed['labels'].indexOf(key);
		
		if (existsIndex === -1) {
			transposed['labels'].push(key);
			transposed['data'].push(value);
		} else {
			transposed['data'][existsIndex] += value;
		}
	});

	return transposed
}


// Function to Check checkbox values
function validateCheckboxes() {
    let categories = unique_categories.filter( item => {
        
        let id = `cb_${item}`
        let checkbox = document.getElementById(id).checked;
        
        if (checkbox === true) {
            return item
        }
    });

    return categories;
}


// Add the event listeners for each button
document.getElementById('filter-check').addEventListener("click", function() {
	filterCheck = validateCheckboxes();
	console.log(filterCheck);
});


document.getElementById('filter-reset').addEventListener("click", function() {
	
	// Reset all checkboxes
	let allBoxes = document.querySelectorAll('input[type=checkbox]');

	//allboxes.map(item => {item.checked = false})
	allBoxes.forEach(item => {item.checked = false})

	chart4.data.labels = original_data['labels'];
	chart4.data.datasets.forEach((dataset) => {
		dataset.data = original_data['data'];
	});
	chart4.update();

});

document.getElementById('filter').addEventListener("click", function() {
	// Check filters
	filterCheck = validateCheckboxes();

	// Filter raw data in a new array
	let raw_filtered = filterData(raw, filterCheck, 'category');
	
	// Transpose
	transposed = transposeData(raw_filtered, 'sale', xAxis);

	// Update the chart
	chart4.data.labels = transposed['labels'];
	chart4.data.datasets.forEach((dataset) => {
		dataset.data = transposed['data'];
	});
	chart4.update();

});


// Build the chart
var chart4 = new Chart(ctx4, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: transposed['labels'],
        datasets: [{
            label: 'Mall Dataset',
            backgroundColor: 'rgba(0, 244, 111, 0.5)',
            data: transposed['data']
        }]
    },

    // Configuration options go here
    options: options
});



/*
COIN DESK CHART
This line chart will be able to fetch data from coindesk api (bitcoin index)
It will also be able to filter by dates by passing in date inputs
*/


var entries;
var fulfilled = false;

let startDate = '2019-04-01';
let endDate = '2019-06-01';
let url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
let button;
var json;
var keys;
var values;

var ctx5 = document.getElementById('myChart5').getContext('2d');
var chart5 = new Chart(ctx5, {

    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: `coindesk chart`,
            data: [],
            backgroundColor: 'rgba(0, 244, 111, 0.3)'
        }]
    },

    options: {}
});

const refresh = async () => {
    const response = await fetch(url);
    json = await response.json();
    keys = Object.keys(json.bpi);
    values = Object.values(json.bpi);
    updateChart(chart5, keys, values);
}

function updateChart(chart, keys, values) {
    chart5.data.datasets.forEach((dataset) => {
        dataset.data = values
    });
    chart5.data.labels = keys;
    chart5.update();
}


function doThis() {
    startDate = document.getElementById('start-date').value;
    endDate = document.getElementById('end-date').value;
    url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
    console.log(url);
    refresh();
}


regenerate_button = document.getElementById('coindesk-regen');
regenerate_button.addEventListener('click', doThis);


refresh();