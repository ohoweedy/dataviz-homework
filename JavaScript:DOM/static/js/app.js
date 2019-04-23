// from data.js
var tableData = data;

// Table body reference
var tbody = d3.select("tbody");

// Loop through tableData and console.log each alien sighting
tableData.forEach(function(alienSightings) {
    console.log(alienSightings);
  });

// Using d3 to append one table row `tr` for each alien sighting object
tableData.forEach(function(alienSightings) {
    console.log(alienSightings);
    var row = tbody.append("tr");
  });

// Using `Object.entries` to console.log each alien sighting value
data.forEach(function(alienSightings) {
    console.log(alienSightings);
    var row = tbody.append("tr");
  
    Object.entries(alienSightings).forEach(function([key, value]) {
      console.log(key, value);
    });
  });

// Using d3 to append 1 cell per alien sighting value (date, city, state, country, shape, duration, comments)
data.forEach(function(alienSightings) {
  console.log(alienSightings);
  var row = tbody.append("tr");

  Object.entries(alienSightings).forEach(function([key, value]) {
    console.log(key, value);
    // Append a cell to the row for each value
    // in the alien sighting object
    var cell = tbody.append("td");
  });
});

// Using d3 to update each cell's text with
// alien sighting values (date, city, state, country, shape, duration, comments)
data.forEach(function(alienSightings) {
  console.log(alienSightings);
  var row = tbody.append("tr");
  Object.entries(alienSightings).forEach(function([key, value]) {
    console.log(key, value);
    // Append a cell to the row for each value
    // in the alien sightings object
    var cell = tbody.append("td");
    cell.text(value);
  });
});

// Filter based on date input:

// // Getting a reference to the button on the page with the id property set to `filter-btn`
// var date_button = d3.select("#filter-btn");

// // Getting a reference to the input element on the page with the id property set to 'datetime'
// var inputField = d3.select("#datetime");

// d3.event.preventDefault();

// // This function is triggered when the button is clicked
// function handleClick() {
//   console.log("date has been entered and table filtered by date");

//   // We can use d3 to see the object that dispatched the event
//   console.log(d3.event.target);
// }

// // We can use the `on` function in d3 to attach an event to the handler function
// date_button.on("click", handleClick);

// // You can also define the click handler inline
// date_button.on("click", function() {
//   console.log("filter by date");
//   console.log(d3.event.target);
// });

// // Event handlers are just normal functions that can do anything you want

// date_button.on("click", function() {
//   d3.select(".giphy-me").html("<img src='https://gph.to/2Krfn0w' alt='giphy'>");
// });

// // Input fields can trigger a change event when new text is entered.
// inputField.on("change", function() {
//   var newDate = d3.event.target.value;
//   console.log(newDate);
// });

// Select the submit button
var submit = d3.select("#filter-btn");

submit.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  console.log(inputValue);
  console.log(tableData);

  var filteredData = tableData.filter(x => x.datetime === inputValue);

  console.log(filteredData);

  d3.select("tbody>tr").text(inputValue);

});

  // BONUS: Calculate summary statistics for the age field of the filtered data

  // First, create an array with just the age values
  // var dates = filteredData.map(x => x.datetime);

  // Next, use math.js to calculate the mean, median, mode, var, and std of the ages
  // var mean = math.mean(ages);
  // var median = math.median(ages);
  // var mode = math.mode(ages);
  // var variance = math.var(ages);
  // var standardDeviation = math.std(ages);

  // Finally, add the summary stats to the `ul` tag
//   d3.select(".summary")
//     .append("li").text(`Mean: ${mean}`)
//     .append("li").text(`Median: ${median}`)
//     .append("li").text(`Mode: ${mode}`)
//     .append("li").text(`Variance: ${variance}`)
//     .append("li").text(`Standard Deviation: ${standardDeviation}`);
// });