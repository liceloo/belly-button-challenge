// url

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});


//variables

var samples;
var mdata;

// Dropdown
d3.json(url).then(function(data){
  let dropdownMenu = d3.select("#selDataset")
  mdata = data.metadata
  samples = data.samples
  data.names.forEach((id) => {
    dropdownMenu.append('option').text(id).property("value")
  });

  // initial plots for first sample (ID: 940)
  showMetaData(mdata[0])
  hbar(samples[0])
  bubble(samples[0])
});

// Update all the plots when a new sample is selected
function optionChanged(name){
  sample_data = samples.find((item) => item.id == name)
  mdata_data = mdata.find((item) => item.id == name)
  hbar(sample_data)
  bubble(sample_data)
  showMetaData(mdata_data)
};

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function hbar(sample_data){
  
  x_axis_vals = sample_data.sample_values.slice(0,10).reverse()
  y_axis_vals = sample_data.otu_ids.slice(0,10).reverse()
  y_axis_text = y_axis_vals.map(item => `OTU ${item}`)
  value_text = sample_data.otu_labels.slice(0,10).reverse()

  hBarTrace = {
    x: x_axis_vals,
    y: y_axis_text,
    text: value_text,
    type: 'bar',
    orientation: 'h'
  };
  hbarChartData = [hBarTrace]

  Plotly.newPlot("bar", hbarChartData);
};

// Create a bubble chart that displays each sample. scatter

function bubble(sample_data){
  x_vals = sample_data.otu_ids
  y_vals = sample_data.sample_values
  marker_size = sample_data.sample_values
  marker_color = sample_data.otu_ids
  value_text = sample_data.otu_labels

  bubbleTrace = {
    x: x_vals,
    y: y_vals,
    text: value_text,
    marker:{
      color: marker_color,
      size: marker_size
    },
    type: 'scatter',
    mode: 'markers'
    }
  bubbleData = [bubbleTrace]

  Plotly.newPlot("bubble", bubbleData)
};





// Display each key-value pair from the metadata JSON object somewhere on the page.

function showMetaData(mdata_data){
  demoInfo = d3.select('#sample-metadata')
  Object.entries(mdata_data).forEach(function([k, v]){
    d3.select('#sample-metadata').append('p').text(`${k}: ${v}`)
  })
  
};

