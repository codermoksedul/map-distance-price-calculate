// JavaScript.js

// Set map options
var myLatLng = { lat: 38.3460, lng: -0.4907 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

// Create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

// Create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);

// Define calcRoute function
function calcRoute() {
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC // Change to METRIC for kilometers
    };

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            var distance = result.routes[0].legs[0].distance.value; // Distance in meters
            var distanceInKilometers = distance / 1000; // Convert meters to kilometers
            var costPerKilometer = 5; // Cost per kilometer
            var totalCost = distanceInKilometers * costPerKilometer; // Calculate total cost
            var durationCar = result.routes[0].legs[0].duration.text; // Duration by car

            const output = document.querySelector('#output');
            document.querySelector(".distance_output").innerHTML = result.routes[0].legs[0].distance.text;
            document.querySelector(".duration_output").innerHTML = result.routes[0].legs[0].duration.text;
            document.querySelector(".duration_output_car").innerHTML = durationCar;

            // Update the total cost output based on the calculated value
            document.querySelector(".totalcost_output").innerHTML = totalCost.toFixed(2);

            // Update the calculation output with the formula (km length * per km cost)
            document.querySelector(".calculation_output").innerHTML = distanceInKilometers.toFixed(2) + " km * $" + costPerKilometer.toFixed(2);

            // Display the "Book Now" button
            document.getElementById("bookNowButton").style.display = "block";

            // Display route on the map
            directionsDisplay.setDirections(result);
        } else {
            // Delete route from map
            directionsDisplay.setDirections({ routes: [] });
            // Center map in London
            map.setCenter(myLatLng);

            // Hide the "Book Now" button in case of an error
            document.getElementById("bookNowButton").style.display = "none";

            // Show error message
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Please select your location.</div>";
        }
    });
}



// Create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
