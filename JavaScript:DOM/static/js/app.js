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
  var dateinputElement = d3.select("#datetime");
  var cityinputElement = d3.select("#city");
  var stateinputElement = d3.select("#state");
  var countryinputElement = d3.select("#country");
  var shapeinputElement = d3.select("#shape");

  // Get the value property of the input element
  var dateinputValue = dateinputElement.property("value");
  var cityinputValue = cityinputElement.property("value");
  var stateinputValue = stateinputElement.property("value");
  var countryinputValue = countryinputElement.property("value");
  var shapeinputValue = shapeinputElement.property("value");
/*
  console.log(dateinputValue);
  console.log(cityinputValue);
  console.log(stateinputValue);
  console.log(countryinputValue);
  console.log(shapeinputValue);

  console.log(tableData);
*/
  var data_filter = tableData.filter(x => {
    /*
    console.log(x.datetime === dateinputValue);
    console.log(x.city === cityinputValue);
    console.log(x.state === stateinputValue);
    console.log(x.country === countryinputValue);
    console.log(x.shape === shapeinputValue);
    */
    let datebool = true;
    let citybool = true;
    let statebool = true;
    let countrybool = true;
    let shapebool = true;

    console.log("date, city value:")
    console.log(dateinputValue, cityinputValue)
    console.log(typeof(dateinputValue), typeof(cityinputValue))

    if(x.datetime === dateinputValue){
      datebool = true;
    } else if(!dateinputValue) {
      datebool = true;
    } else {
      datebool = false;
    }
    
    if(x.city === cityinputValue){
      citybool = true;
    } else if(!cityinputValue){
      citybool = true;
    }else {
      citybool = false;
    }

    if(x.state === stateinputValue){
      statebool = true;
    } else if(!stateinputValue){
      statebool = true;
    }else {
      statebool = false;
    }

    if(x.country === countryinputValue){
      countrybool = true;
    } else if(!countryinputValue){
      countrybool = true;
    }else {
      countrybool = false;
    }

    if(x.shape === shapeinputValue){
      shapebool = true;
    } else if(!shapeinputValue){
      shapebool = true;
    }else {
      shapebool = false;
    }

    return (datebool && citybool && statebool && countrybool && shapebool)


    // if(dateinputValue == "undefined" || dateinputValue == "") {
    //   return x.datetime === dateinputValue
    // }
    // else if 

  });
  
  //console.log(data_filter);

  d3.select('#ufo-table tbody').html(' ')

  Build_Table(data_filter);
});



// Notes:

// var date_filter = tableData.filter(x => {
  // if(inputValue == "undefined" || inputValue == "")
  
  // x.datetime === inputValue;
  // x.city === someinputValue;
// });

// return  x.datetime === dateinputValue && x.city === cityinputValue && x.state === stateinputValue && x.country === countryinputValue && x.shape === shapeinputValue;
