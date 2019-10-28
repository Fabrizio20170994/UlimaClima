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
        var uluru = {
          lat: childNodes.val().latitude,
          lng: childNodes.val().longitude
        };
        var map = new google.maps.Map(
          document.getElementById('map'), {
            zoom: 4,
            center: uluru,
            styles: [{
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
            ]
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
      center: uluru,
      styles: [{
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
      ]
    });
  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });

  function placeMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }
  var map2 = new google.maps.Map(
    document.getElementById('modalMap'), {
      zoom: 4,
      center: uluru,
      styles: [{
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
      ]
    });

  google.maps.event.addListener(map2, 'click', function(event) {
    placeMarker2(event.latLng);
  });

  function placeMarker2(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map2
    });
  }


  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
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
  for (var i = 0; i < x.length; i++) {
    x[i].value = "";
  }
  getElementById("modalLoginForm").fadeOut('slow');
}
