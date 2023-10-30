
// let mapToken="<%= process.env.MAP_TOKEN %>"
// console.log(mapToken)
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/mapbox/streets-v12', // style URL
center:listing.geometry.coordinates, // starting position [lng, lat][78.2571,21.7752]
zoom: 9 // starting zoom
});
// console.log(coordinates)
// Create a default Marker and add it to the map.
const marker =new mapboxgl.Marker({color:"red"})
.setLngLat(listing.geometry.coordinates) //listings geometry coordinates
.setPopup(new mapboxgl.Popup({offset:25}).setHTML(`<h4>${listing.location}</h4> <P>Exact location will be provided after booking`)
.setMaxWidth("300px"))
.addTo(map);












