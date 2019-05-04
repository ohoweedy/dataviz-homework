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
        
        var washer_frequency = (meta_data.WFREQ)*20;
        console.log(washer_frequency);
        // Trig to calc meter point
        var degrees = 180 - washer_frequency,
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var data = [{ type: 'scatter',
          x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'washer frequency',
            text: washer_frequency,
            hoverinfo: 'text+name'},
          { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
          rotation: 90,
          text: ['8-9', '7-8', '6-7', '5-6',
                    '4-5', '3-4', '2-3', '1-2', '0-1', ''],
          textinfo: 'text',
          textposition:'inside',
          marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                                'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                                'rgba(220, 220, 145, .5)', 'rgba(230, 225, 180, .5)',
                                'rgba(240, 230, 212, 0.5)', 'rgba(245, 240, 222, 0.5)', 
                                'rgba(248, 247, 247, 0.5)', 'rgba(250, 250, 250, 0.5)']},
          labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
          hoverinfo: 'label',
          hole: .5,
          type: 'pie',
          showlegend: false
        }];

        var layout = {
          shapes:[{
              type: 'path',
              path: path,
              fillcolor: '850000',
              line: {
                color: '850000'
              }
            }],
          title: `Belly Button Sample ${sample} Washing Frequency<br> Scrubs per Week`,
          height: 500,
          width: 500,
          xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
          yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]}
        };

        Plotly.newPlot("gauge", data, layout);
      });
    };

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var charts_url = `/samples/${sample}`;
  d3.json(charts_url).then(function(charts_data) {

    console.log(charts_data)
    // @TODO: Build a Bubble Chart using the sample data
    var x_values = charts_data.otu_ids;
    var y_values = charts_data.sample_values;
    var text_values = charts_data.otu_labels;
   
    var trace1 = {
      x: x_values,
      y: y_values,
      mode: 'markers',
      marker: {
        color: x_values,
        size: y_values,
      },
      text: text_values
    };

    var data1 = [trace1];

    var layout1 = {
      title: `Sample ${sample} Bubble Plot`,
      showlegend: false,
      xaxis: {
        title: 'OTU ID',
        showline: false
      },
      yaxis: {
        title: 'SAMPLE VALUES',
        showline: false
      }
    };
    
    Plotly.newPlot("bubble", data1, layout1);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    y_values.sort(function compareFunction(firstNum, secondNum) {
     return secondNum - firstNum;
   });
   var slice_y = y_values.slice(0, 10);


    var data2 = [{
      values: slice_y,
      labels: x_values,
      hovertext: text_values,
      type: 'pie'
    }];

    var layout2 = {
      title: `Sample ${sample} Pie Chart`,
      showlegend: true,
    };
    
    Plotly.newPlot("pie", data2, layout2);


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
