function createMap(geoJson) {
  let map = L.map('map').setView([0, 0], 1);
  L.geoJSON(geoJson,{
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);
  function onEachFeature(feature, layer) {
    let popupContent =`${feature.properties.GEO_ID}
    <br>${feature.properties.STATE}
    <br>${feature.properties.COUNTY}
    <br>${feature.properties.NAME}
    <br>${feature.properties.LSAD}
    <br>${feature.properties.CENSUSAREA}`;
    if (feature.properties && feature.properties.popupContent) {
      popupContent += feature.properties.popupContent;
    }
    layer.bindPopup(popupContent);
  }
  function getColor(value) {
    return value > 50000 ? 'MediumSpringGreen':
      value > 10000  ? 'Red':
        value > 5000  ? 'MediumOrchid':
          value > 1000  ? 'LawnGreen':
            value > 500  ? 'DeepPink':
              value > 100  ? 'Orange':
                'SeaShell';
  }
  function style(feature) {
    return {
      fillColor: getColor(feature.properties.CENSUSAREA)
    };
  }
}
fetch('gz_2010_us_050_00_5m.json', {method: 'get'})
  .then(response => response.json())
  .then(Map => {
    createMap(Map)
  })
  .catch(err => console.log(err))