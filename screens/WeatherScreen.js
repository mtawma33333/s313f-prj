import * as React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Modal, Text, Divider } from 'react-native-paper';

import Header from '../components/ui/Header';
import HourlyWeatherList from '../components/weather/HourlyWeatherList';
import DailyWeatherList from '../components/weather/DailyWeatherList';
import HourlyWeatherModal from '../components/weather/HourlyWeatherModal';
import WeatherForecast from '../components/ui/WeatherForecast';
import { getWeatherConditionString } from '../model/weather';
import { useLocation } from '../context/LocationContext';
import theme from '../constants/theme';

const WeatherScreen = () => {
  const { location } = useLocation();
  const [visible, setVisible] = React.useState(false);
  const [selectedDayHourlyData, setSelectedDayHourlyData] = React.useState([]);
  const [forecastData, setForecastData] = React.useState({
    latitude: null,
    longitude: null,
    current: {},
    hourly: [],
    daily: [],
  });
  const [locationName, setLocationName] = React.useState('');
  const [analysis, setAnalysis] = React.useState({
    weatherSummary: '',
    weatherCodeChange: '',
  });

  const showModal = ({ day }) => {
    // Filter hourly data for the selected day
    const filteredHourlyData = forecastData.hourly.filter((item) =>
      item.time.startsWith(day)
    );

    setSelectedDayHourlyData(filteredHourlyData);
    setVisible(true);
    console.log('Modal opened for day:', day);
  };
  const hideModal = () => {
    setVisible(false);
    console.log('hideModal');
  };
  const containerStyle = {};

  const formatApiResponseToWeatherData = (apiResponse) => {
    const { current, hourly, daily, latitude, longitude } = apiResponse;

    return {
      latitude: latitude,
      longitude: longitude,
      current: {
        time: current.time,
        temperature: current.temperature_2m,
        weatherCode: current.weather_code,
        relative_humidity: current.relative_humidity_2m,
        rain: current.rain,
      },
      hourly: hourly.time.map((time, index) => ({
        time: time,
        temperature: hourly.temperature_2m[index],
        weatherCode: hourly.weather_code[index],
        dew_point: hourly.dew_point_2m[index],
      })),
      daily: daily.time.map((time, index) => ({
        date: time,
        maxTemperature: daily.temperature_2m_max[index],
        minTemperature: daily.temperature_2m_min[index],
        weatherCode: daily.weather_code[index],
        sunrise: daily.sunrise[index],
        sunset: daily.sunset[index],
      })),
    };
  };

  function analyzeWeatherPattern(forecastData) {
    // Assuming the daily array is sorted with the first element being the current day
    const today = forecastData.daily[0];
    const tomorrow = forecastData.daily[1];
    let weatherSummary = '';
    // Compare today's weather with tomorrow's weather
    if (forecastData.daily && forecastData.daily.length > 0) {
      const temperatureChange = today.maxTemperature - tomorrow.maxTemperature;
      let temperatureComparison = 'similar to';
      if (Math.abs(temperatureChange) >= 5) {
        temperatureComparison =
          temperatureChange > 0 ? 'cooler than' : 'warmer than';
      }

      weatherSummary = `Today's maximum temperature is ${today.maxTemperature}° and it is ${temperatureComparison} tomorrow's forecast of ${tomorrow.maxTemperature}°.`;
    } else {
      weatherSummary = 'loading';
    }

    // Check for a weather code change in the next 24 hours from hourly data
    let weatherCodeChange = null;
    for (let i = 0; i < 24; i++) {
      if (forecastData.hourly[i] && forecastData.hourly[i + 1]) {
        if (
          forecastData.hourly[i].weatherCode !==
          forecastData.hourly[i + 1].weatherCode
        ) {
          const currentTime = forecastData.hourly[i].time.split('T')[1];
          const nextTime = forecastData.hourly[i + 1].time.split('T')[1];
          const currentWeather = getWeatherConditionString(
            forecastData.hourly[i].weatherCode
          );
          const nextWeather = getWeatherConditionString(
            forecastData.hourly[i + 1].weatherCode
          );
          weatherCodeChange = `Weather is changing from ${currentWeather} to ${nextWeather} between ${currentTime} and ${nextTime}.`;
          break;
        }
      }
    }

    if (!weatherCodeChange) {
      weatherCodeChange =
        'No significant weather changes expected in the next 24 hours.';
    }

    return {
      weatherSummary,
      weatherCodeChange,
    };
  }

  async function fetchAndFormatWeatherData(latitude, longitude) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,rain,weather_code&hourly=temperature_2m,dew_point_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const apiResponse = await response.json();
      return formatApiResponseToWeatherData(apiResponse);
    } catch (error) {
      console.error('Could not fetch weather data: ', error);
    }
  }
  async function getLocationNameByCoordinates(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=geocodejson`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }

      const data = await response.json();
      console.log(data);
      const features = data.features;

      if (features && features.length > 0) {
        // Accessing the first feature's properties
        const properties = features[0].properties.geocoding;

        // "admin" structure can vary, so it's important to check each level's presence
        const admin = properties.admin;
        let locationName;
        if (admin) {
          // Now including level7 in the hierarchy of administrative levels
          locationName =
            admin.level7 ||
            admin.level6 ||
            admin.level5 ||
            admin.level4 ||
            admin.level3;
        } else {
          // Fallback to district, city or state when no admin levels are present
          locationName =
            properties.district || properties.city || properties.state;
        }

        return locationName;
      }

      throw new Error('No features in the response');
    } catch (error) {
      console.error('Error occurred fetching location name:', error);
      return null;
    }
  }
  React.useEffect(() => {
    fetchAndFormatWeatherData(location.latitude, location.longitude)
      .then((formattedWeatherData) => {
        // Your weather screen can now use formattedWeatherData which includes current, hourly, and daily weather.
        setForecastData(formattedWeatherData);
      })
      .catch((error) => {
        console.error('Error fetching or formatting weather data: ', error);
      });

    getLocationNameByCoordinates(location.latitude, location.longitude)
      .then((locationName) => setLocationName(locationName))
      .catch((error) => console.error(error));
  }, []);

  React.useEffect(() => {
    setAnalysis(analyzeWeatherPattern(forecastData));
  }, [forecastData]);
  console.log(locationName);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        <Header
          location={
            location.location === 'current location'
              ? locationName
              : location.location
          }
          temperature={forecastData.current.temperature}
          weather={getWeatherConditionString(forecastData.current.weatherCode)}
          highestTemp={
            forecastData.daily.length > 0
              ? forecastData.daily[0].maxTemperature
              : undefined
          }
          lowestTemp={
            forecastData.daily.length > 0
              ? forecastData.daily[0].minTemperature
              : undefined
          }
        />

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.analysis}>{analysis.weatherSummary}</Text>
            <Text style={styles.analysis}>{analysis.weatherCodeChange}</Text>
            <Divider />
            <HourlyWeatherList data={forecastData.hourly} />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Weather Forecast" />
          <Card.Content>
            <DailyWeatherList data={forecastData.daily} Pfunc={showModal} />
          </Card.Content>
        </Card>
        {forecastData.daily.length > 0 && forecastData.hourly.length > 0 && (
          <>
            <WeatherForecast
              sunrise={forecastData.daily[0].sunrise.split('T')[1]}
              sunset={forecastData.daily[0].sunset.split('T')[1]}
              relative_humidity={forecastData.current.relative_humidity}
              dow_point={forecastData.hourly[0].dew_point} // Assuming to take the first hour's data for dew point
              rain={forecastData.current.rain}
            />
          </>
        )}
      </ScrollView>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
        style={styles.model}>
        <HourlyWeatherModal data={selectedDayHourlyData} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    height: '100%',
  },
  content: {
    padding: 4,
  },
  card: {
    margin: 4,
  },
  model: {
    marginTop: '30%',
  },
  analysis: {
    color: '#B0B5BF',
    marginVertical: 5,
  },
});

export default WeatherScreen;
