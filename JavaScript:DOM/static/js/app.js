// from data.js
var tableData = data;

// Table body reference
var tbody = d3.select("tbody");

// Using d3 to update each cell's text with
// alien sighting values (date, city, state, country, shape, duration, comments)
function Build_Table(alien_input){
  alien_input.forEach(function(tableData) {
  console.log(tableData);
  var row = tbody.append("tr");
  Object.entries(tableData).forEach(function([key, value]) {
    console.log(key, value);
    // Append a cell to the row for each value
    // in the alien sightings object
    var cell = row.append("td");
    cell.text(value);
  });
});
};

Build_Table(tableData);

// Filter by date input

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

  var date_filter = tableData.filter(x => x.datetime === inputValue);

  console.log(date_filter);

  d3.select('#ufo-table tbody').html(' ')

  Build_Table(date_filter);
});
