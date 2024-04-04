export const defaultCities = [
  {
    name: "Hong Kong",
    latitude: 22.5,
    longitude: 114
  },
  {
    name: "Tokyo",
    latitude: 35.7,
    longitude: 139.6875
  },
  {
    name: "Berlin",
    latitude: 52.52,
    longitude: 13.4
  },
  {
    name: "London",
    latitude: 51.5,
    longitude: -0.127758
  },
  {
    name: "Paris",
    latitude: 48.856613,
    longitude: 2.352222
  },
  {
    name: "Moscow",
    latitude: 55.75,
    longitude: 37.625
  },
  {
    name: "Canberra",
    latitude: -35.280937,
    longitude: 149.130009
  },
  {
    name: "Ottawa",
    latitude: 45.421530,
    longitude: -75.697193
  },
  {
    name: "Brasília",
    latitude: -15.826691,
    longitude: -47.921820
  },
  {
    name: "New Delhi",
    latitude: 28.613939,
    longitude: 77.209023
  },
  {
    name: "Beijing",
    latitude: 39.904202,
    longitude: 116.407394
  },
];

export const locationNamesMap = defaultCities.reduce((map, city) => {
  const key = `${city.latitude},${city.longitude}`;
  map[key] = city.name;
  return map;
}, {});