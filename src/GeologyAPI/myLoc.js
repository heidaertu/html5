var TokyoCoords = {
    latitude: 35.42,
    longitude: 139.46
};

var ShanghaiCoords = {
    latitude: 31.12,
    longitude: 121.38
};

var map;
var watchId = null;

window.onload = getMyLocation;

function getMyLocation() {
    if (navigator.geolocation) {
     //   navigator.geolocation.getCurrentPosition(displayLocation, displayError);

        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;

        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;

    } else {
        alert("Oops, no geolocation support.");
    }
}

function watchLocation() {
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
}

function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var div = document.getElementById("location");
    div.innerHTML = "You are at Latitude : " + latitude + ", longtitude: " + longitude;
    div.innerHTML += " (with " + position.coords.accuracy + " meters accuracy)";

    var km = computeDistance(position.coords, TokyoCoords);
    var distance = document.getElementById("distance");
    distance.innerHTML = "Distance between our house & Tokyo: " + km + " km <br>";

    km = computeDistance(position.coords, ShanghaiCoords);
    distance = document.getElementById("distance");
    distance.innerHTML += "Distance between our house & Shanghai: " + km + " km <br>";

   // showMap(position.coords);

}

function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };

    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage += " " + error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return radians;
}

function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);

    var Radius = 6371;
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads)
    + Math.cos(startLatRads) * Math.cos(destLatRads)
    * Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function showMap(coords) {
    var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
    var mapOptions = {
        zoom: 10,
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);
}