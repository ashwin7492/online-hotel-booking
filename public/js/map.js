const mapElement = document.getElementById("map");

const latitude = Number(mapElement.dataset.latitude);
const longitude = Number(mapElement.dataset.longitude);
const mapToken = mapElement.dataset.mapToken;
const title = mapElement.dataset.title;

const map = L.map("map").setView([latitude, longitude], 15);

const isRetina = L.Browser.retina;

const baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${mapToken}`;

const retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${mapToken}`;

L.tileLayer(isRetina ? retinaUrl : baseUrl, {
  maxZoom: 20,

  attribution:
    'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a>',
}).addTo(map);

L.marker([latitude, longitude])
  .addTo(map)
  .bindPopup(
    `
        <b>${title}</b><br>
        Latitude: ${latitude}<br>
        Longitude: ${longitude}
    `,
  )
  .openPopup();
