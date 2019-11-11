/*jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", event => {

  const db = firebase.database();


  // Añadir cada elemento de la base de datos como un botón
  var element = document.getElementById("opciones");

  var modalLatitude = 0;
  var modalLongitude = 0;

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
  var location = document.getElementById("location");
  var cartaImagen = document.getElementById("carta-imagen");
  var textoDropdown = document.getElementById("dropdownMenuButton");
  db.ref("city").on('value', function(snap) {

    snap.forEach(function(childNodes) {

      if (event.target.id == childNodes.val().name) {
        textoDropdown.innerHTML = childNodes.val().name;
        humedad.innerHTML = "Humedad: " + childNodes.val().humidity + "%";
        temperatura.innerHTML = "Temperatura: " + childNodes.val().temperature + " °C";
        cartaImagen.innerHTML = '<img src="" id="imagen">';
        var imagen = document.getElementById("imagen");
        imagen.src = childNodes.val().icon;
        longitudActual = childNodes.val().longitude;
        latitudActual = childNodes.val().latitude;
        var uluru = {
          lat: childNodes.val().latitude,
          lng: childNodes.val().longitude
        };
        var map = new google.maps.Map(
          document.getElementById('map'), {
            zoom: 4,
            center: uluru,
            styles: nightModeMapStyles
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



function placeMarker(location,map) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
}

const nightModeMapStyles = [{
    elementType: 'geometry',
    stylers: [{
      color: '#242f3e'
    }]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{
      color: '#242f3e'
    }]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#746855'
    }]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#d59563'
    }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#d59563'
    }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{
      color: '#263c3f'
    }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#6b9a76'
    }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{
      color: '#38414e'
    }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{
      color: '#212a37'
    }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#9ca5b3'
    }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{
      color: '#746855'
    }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{
      color: '#1f2835'
    }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#f3d19c'
    }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{
      color: '#2f3948'
    }]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#d59563'
    }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{
      color: '#17263c'
    }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#515c6d'
    }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{
      color: '#17263c'
    }]
  }
];

var latitudActual = 0;

var longitudActual = 0;

var markersArray = [];

function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
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
      center: uluru,
      styles: nightModeMapStyles
    });
  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng,map);
  });



  var map2 = new google.maps.Map(
    document.getElementById('modalMap'), {
      zoom: 4,
      center: uluru,
      styles: nightModeMapStyles
    });

  google.maps.event.addListener(map2, 'click', function(event) {
    placeMarker2(event.latLng);
  });


  function placeMarker2(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map2
    });
    clearOverlays();
    markersArray.push(marker);
  }

}




function addCity() {
  const db = firebase.database();
  var isInDb = 0;
  var x = document.getElementsByClassName("datoCiudad");
  var y = 1;
  var z = 1;
  for (i = 0; i < x.length; i++) {
    if (x[i].value == "") y = 0;
    if (isNaN(x[0].value) || isNaN(x[3].value)) z = 0;
  }

  if (markersArray.length == 0 || y == 0) {
    alert("Rellene todos los campos");
  } else {
    if (z == 0) {
      alert("Humedad y temperatura deben de ser numeros");
    } else {
      db.ref("city").on('value', function(snap) {

        snap.forEach(function(childNodes) {
          if (x[2].value == childNodes.val().name ||
            (markersArray[0].getPosition().lat() == childNodes.val().latitude && markersArray[0].getPosition().lng() == childNodes.val().longitude)) {
            isInDb = 1;
          }

        });

      });

      if (isInDb) {
        alert("Esta ciudad ya ha sido agredada anteriormente");
      } else {
        var ref = db.ref("city");
        ref.child(x[2].value).set({
          humidity: x[0].value,
          icon: x[1].value,
          latitude: markersArray[0].getPosition().lat(),
          longitude: markersArray[0].getPosition().lng(),
          name: x[2].value,
          temperature: parseFloat(x[3].value)
        });

        for (i = 0; i < x.length; i++) {
          x[i].value = "";
        }
        clearOverlays();
        alert("Ciudad agregada con exito");
      }
    }
  }
}


function editCity() {
  var nombre = document.getElementById("dropdownMenuButton").innerHTML;
  const db = firebase.database();
  var x = document.getElementsByClassName("datoCiudad");
  var y = 1;
  var z = 1;
  for (i = 0; i < x.length; i++) {
    if (x[i].value == "") y = 0;
    if (isNaN(x[0].value) || isNaN(x[3].value)) z = 0;
  }

  if (markersArray.length == 0 || y == 0) {
    alert("Rellene todos los campos");
  } else {
    if (z == 0) {
      alert("Humedad y temperatura deben de ser numeros");
    } else {
      var ref = db.ref("city");
      ref.child(nombre).update({
        humidity: parseFloat(x[0].value),
        icon: x[1].value,
        latitude: markersArray[0].getPosition().lat(),
        longitude: markersArray[0].getPosition().lng(),
        name: x[2].value,
        temperature: parseFloat(x[3].value)
      });

      for (i = 0; i < x.length; i++) {
        x[i].value = "";
      }
      clearOverlays();
      alert("Ciudad editada con exito");
    }
  }

}



function setAdd() {
  boton = document.getElementById("botonModal");
  boton.innerHTML = "Añadir";
  boton.setAttribute("onclick","addCity()");
}

function setEdit() {
  boton = document.getElementById("botonModal");
  boton.innerHTML = "Editar";
  boton.setAttribute("onclick","editCity()");
}
