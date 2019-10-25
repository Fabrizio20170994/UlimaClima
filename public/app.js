/*jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", event => {

  const db = firebase.database();


// Añadir cada elemento de la base de datos como un botón
  var element = document.getElementById("opciones");

  db.ref("city").on('value', function(snap) {
    document.getElementById("opciones").innerHTML = "";
    snap.forEach(function(childNodes) {

      var para = document.createElement("a");


      para.innerHTML = childNodes.val().name;
      para.setAttribute("class", "dropdown-item btn");
      para.setAttribute("onclick", "showInfo(event)");
      para.setAttribute("id", childNodes.val().name);
      element.appendChild(para);
      //This loop iterates over children of user_id
      //childNodes.key is key of the children of userid such as (20170710)
      //childNodes.val().name;
      //childNodes.val().time;
      //childNodes.val().rest_time;
      //childNodes.val().interval_time;

    });
  });
});

function showInfo(event) {
  const db = firebase.database();
  var humedad = document.getElementById("humedad");
  var temperatura = document.getElementById("temperatura");
  var imagen = document.getElementById("imagen");
  var location = document.getElementById("location");
  db.ref("city").on('value', function(snap) {

    snap.forEach(function(childNodes) {

      if (event.target.id == childNodes.val().name) {
        humedad.innerHTML = "Humedad: " + childNodes.val().humidity + "%";
        temperatura.innerHTML = "Temperatura: " + childNodes.val().temperature + " C";
        imagen.src = childNodes.val().icon;
        var uluru = {
          lat: childNodes.val().latitude,
          lng: childNodes.val().longitude
        };
        var map = new google.maps.Map(
          document.getElementById('map'), {
            zoom: 4,
            center: uluru
          });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
        map.panTo(center);


      }
      //This loop iterates over children of user_id
      //childNodes.key is key of the children of userid such as (20170710)
      //childNodes.val().name;
      //childNodes.val().time;
      //childNodes.val().rest_time;
      //childNodes.val().interval_time;

    });
  });

}

function initMap() {
  // The location of Uluru
  var uluru = {
    lat: -12.084734,
    lng: 76.971024
  };
  // The map, centered at Uluru
  var map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
  google.maps.event.addListener(map, 'click', function(event) {
  placeMarker(event.latLng);
});
}

function addCity() {
  var x = document.getElementsByClassName("datoCiudad");
  const db = firebase.database();
  var ref = db.ref("city");
ref.child(x[4].value).set({
    humidity: x[0].value,
    icon: x[1].value,
    latitude: parseFloat(x[2].value),
    longitude: parseFloat(x[3].value),
    name: x[4].value,
    temperature: parseFloat(x[5].value)
});
for (var i = 0;i<x.length;i++){
  x[i].value = "";
}
getElementById("modalLoginForm").fadeOut('slow');
}
