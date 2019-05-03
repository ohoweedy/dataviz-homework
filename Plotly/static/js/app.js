function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    var meta_url = `/metadata/${sample}`;
    d3.json(meta_url).then(function(meta_data) {
  // Use d3 to select the panel with id of `#sample-metadata`
    var meta_panel = d3.select("#sample-metadata");

  // Use `.html("") to clear any existing metadata
    meta_panel.html("");

      var row = meta_panel.append("p");
      Object.entries(meta_data).forEach(function([key, value]) {
        console.log(key, value);
        // Append a cell to the row for each value
        // in the weather report object
        var cell = row.append("h6")
        cell.text(key + "  :  " + value);
        });
      });
    };

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var charts_url = `/samples/${sample}`;
  d3.json(charts_url).then(function(charts_data) {

    console.log(charts_data)
    // @TODO: Build a Bubble Chart using the sample data
    var x_values = charts_data.otu_ids;
    var y_values = charts.data.sample_values;
    var marker_size = charts.data.sample_values;
    var marker_colors = charts.data.otu_ids;
    var text_values = charts.data.otu_labels;
   

    var trace1 = {
      type: "bubble",
      x: x_values,
      y: y_values,
      text: text_values,
      size: marker_size,
      bubble: {
        color: marker_colors
      }
    };

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  });
};


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
