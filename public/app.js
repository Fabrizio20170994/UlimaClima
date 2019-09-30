/*jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", event => {

  const db = firebase.database();

  /*
  db.ref('city').on('value',(snap)=>{

      console.log(snap.val());
      var para = document.createElement("a");
      var node = document.createTextNode(childNodes.val().name);
      para.appendChild(node);
      element.appendChild(para);
    });
  */
  var element = document.getElementById("opciones");

  db.ref("city").on('value', function(snap) {

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
        humedad.innerHTML = "Humedad: " + childNodes.val().humidity;
        temperatura.innerHTML = "Temperatura: " + childNodes.val().temperature;
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
}
