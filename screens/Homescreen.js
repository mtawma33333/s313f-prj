import * as React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { List, Searchbar, TouchableRipple } from 'react-native-paper';
import LocationList from '../components/ui/locationList';
import { LocationCard } from '../components/ui/locationCard';
import { defaultCities } from '../constants/city';
import { useLocation } from '../context/LocationContext';
import * as Location from 'expo-location';

import theme from '../constants/theme';

const fetchWeatherForWatchList = async (watchList) => {
  // Combine all latitudes and longitudes
  const latitudes = watchList.map((location) => location.latitude).join(',');
  const longitudes = watchList.map((location) => location.longitude).join(',');

  // Construct the API endpoint
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitudes}&longitude=${longitudes}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
  console.log('apiUrl: ', apiUrl);
  try {
    // Fetch the weather data
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return formatWeatherData(data); // return the parsed JSON data
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

const formatWeatherData = (
  jsonData,
  cities = defaultCities,
  locationTolerance = 0.1
) => {
  // Ensure jsonData is always an array and handle if it's not an expected object
  const jsonDataArray = Array.isArray(jsonData) ? jsonData : [jsonData];

  return jsonDataArray.map((item) => {
    if (
      !item.current ||
      !item.daily ||
      !Array.isArray(item.daily.temperature_2m_max)
    ) {
      // Handle unexpected data format
      throw new Error('Invalid weather data format');
    }

    const { latitude, longitude, current, daily } = item;

    // Find the closest city within the tolerance range
    const locationMatch = cities.find(
      (city) =>
        Math.abs(city.latitude - latitude) <= locationTolerance &&
        Math.abs(city.longitude - longitude) <= locationTolerance
    );

    // Use the city name if a match is found, otherwise default to the item's timezone
    const locationName = locationMatch ? locationMatch.name : item.timezone;

    const formattedData = {
      location: locationName,
      latitude,
      longitude,
      time: current.time,
      weather_code: current.weather_code,
      temperature: current.temperature_2m,
      temperature_max: daily.temperature_2m_max[0], // Default to the first element as today's max temp
      temperature_min: daily.temperature_2m_min[0], // Default to the first element as today's min temp
    };

    // Ensure that all required fields have valid values
    for (const [key, value] of Object.entries(formattedData)) {
      if (value === undefined) {
        throw new Error(`Missing value for ${key}`);
      }
    }

    return formattedData;
  });
};

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentWatchList, setWatchList] = React.useState([]);
  const [formatedWeather, setFormatedWeather] = React.useState([]);
  const [current, setCurrent] = React.useState({
    latitude: null,
    longitude: null,
    time: '',
    weather_code: '',
    temperature: '',
    temperature_max: '',
    temperature_min: '',
  });
  console.log(current)
  const { setLocation } = useLocation();
  const { location } = useLocation();
  console.log(location)
  // Update search query
  const onChangeSearch = (query) => setSearchQuery(query);

  // Execute the search
  const searchCities = () => {
    return searchQuery
      ? defaultCities.filter((city) =>
          city.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];
  };

  // Add to watch list
  const addToWatchList = (city) => {
    console.log(city);
    setWatchList((currentWatchList) => {
      // Avoid duplicates
      if (!currentWatchList.some((item) => item.name === city.name)) {
        return [...currentWatchList, city];
      }
      return currentWatchList;
    });
  };
  // Search results based on the search query
  const searchResults = searchCities();

  React.useEffect(() => {
    // Fetch weather data when the watch list changes
    if (currentWatchList.length > 0) {
      fetchWeatherForWatchList(currentWatchList)
        .then(setFormatedWeather)
        .catch((error) =>
          console.error('Fetching weather data failed:', error)
        );
    }
  }, [currentWatchList]);
  
  const getUserLocation = async () => {
    // First, request the permission to access location
    let { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    // If permission is granted, get the current location
    let location = await Location.getCurrentPositionAsync({});
    const lon = location.coords.longitude;
    const lat = location.coords.latitude;
    setLocation({ latitude: lat, longitude: lon });
    fetchWeather(lat,lon)
  };

  const fetchWeather = async (latitude, longitude) => {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

    try {
      let response = await fetch(apiUrl);
      let data = await response.json();

      if (data && data.current && data.daily) {
        setCurrent({
          latitude,
          longitude,
          time: data.current.time,
          weather_code: data.current.weather_code,
          temperature: data.current.temperature_2m,
          temperature_max: data.daily.temperature_2m_max[0],
          temperature_min: data.daily.temperature_2m_min[0],
        });
      }
    } catch (error) {
      console.error('Error fetching the weather:', error);
    }
  };
  React.useEffect(() => {
    getUserLocation();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Searchbar
        placeholder="Search for a city"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableRipple
            onPress={() => addToWatchList(item)}
            rippleColor="rgba(0, 0, 0, .32)">
            <List.Item
              title={item.name}
              titleStyle={styles.listItem}
              style={styles.listItem}
            />
          </TouchableRipple>
        )}
      />
      <LocationCard
        location={'current location'}
        latitude={current.latitude}
        longitude={current.longitude}
        time={current.time}
        weather_code={current.weather_code}
        temperature={current.temperature}
        temperature_max={current.temperature_max}
        temperature_min={current.temperature_min}
      />
      <LocationList data={formatedWeather} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
  },
  searchbar: {
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 15,
  },
  listItem: {
    backgroundColor: 'white',
    color: 'black',
  },
});

export default HomeScreen;
