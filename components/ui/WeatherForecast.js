import React from 'react';
import { View, StyleSheet } from 'react-native';
import WeatherCard from './WeatherCard'; // Assuming your WeatherCard is correctly exported

const determineSunPosition = (current, sunriseTime, sunsetTime) => {
  // Convert the current, sunrise, and sunset times to Date objects
  const currentTimeDate = new Date();
  const sunriseDate = new Date();
  const sunsetDate = new Date();

  const [sunriseHour, sunriseMinute] = sunriseTime.split(':');
  const [sunsetHour, sunsetMinute] = sunsetTime.split(':');

  sunriseDate.setHours(parseInt(sunriseHour, 10), parseInt(sunriseMinute, 10));
  sunsetDate.setHours(parseInt(sunsetHour, 10), parseInt(sunsetMinute, 10));

  // Compare the current time to sunrise and sunset times and determine position
  let topContent, bottomContent, sunStatus;
  
  if (currentTimeDate >= sunriseDate && currentTimeDate < sunsetDate) {
    // It's between sunrise and sunset, so sunset is next
    topContent = sunsetTime;
    bottomContent = sunriseTime;
    sunStatus = "sunset";
  } else {
    // It's either past sunset or before sunrise, so sunrise is next
    topContent = sunriseTime;
    bottomContent = sunsetTime;
    sunStatus = "sunrise";
  }

  return { 
    topContent, 
    bottomContent, 
    sunStatus // 'sunrise' or 'sunset' indicating which event is on top
  };
};


const WeatherForecast = ({sunset,sunrise,relative_humidity,dow_point,rain}) => {
  // Fake data for demonstration purposes
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const { sunStatus, topContent, bottomContent } = determineSunPosition(currentTime, sunrise, sunset);
  const bottomSunStatus = sunStatus == 'sunrise'?`sunset: ${sunset}`:`sunrise: ${sunrise}`
  const dow_point_text = `current dow point is ${dow_point}°`
  const rain_text = `${rain}ml in current`

  return (
    <View style={styles.container}>
      <WeatherCard title={sunStatus} topContent={topContent} bottomContent={bottomSunStatus} />
      <WeatherCard title="Relative Humidity" topContent={relative_humidity+'%'} bottomContent={dow_point_text} />
      <WeatherCard title="Rain" topContent={rain_text} bottomContent={""} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Style for the parent container, flex could be used depending on layout structure
    flexDirection: 'row', // Assuming you want cards to be side by side
    flexWrap: 'wrap', // This will allow items to wrap to the next line
    justifyContent: 'space-between' // This can be adjusted based on desired spacing
  }
});

export default WeatherForecast;