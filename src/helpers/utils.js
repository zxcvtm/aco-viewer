export const getRandomPoints = (nPoints) => {
  let points = [];
  for(let i=0; i<nPoints; i++){
    let lat = -33 - Math.floor((Math.random() * 15) + 37)*0.01;
    let lng = -70 - Math.floor((Math.random() * 18) + 56)*0.01;
    points.push({lat: lat, lng: lng})
  }
  return points;
};

export const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2-lat1);  // deg2rad below
  let dLon = deg2rad(lon2-lon1);
  let a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  ;
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = R * c; // Distance in km
  return d;
};

export const deg2rad = (deg) => {
  return deg * (Math.PI/180)
};

export const getAdyacencyGraph = (points) => {
  let graph = [];
  for(let i = 0; i< points.length; i++) {
    let row   = [];
    for(let j = 0; j< points.length; j++){
      let p1 = points[i];
      let p2 = points[j];
      let distance = getDistanceFromLatLonInKm(p1.lat, p1.lng, p2.lat, p2.lng);
      row.push(distance)
    }
    graph.push(row)
  }
  return graph;
};