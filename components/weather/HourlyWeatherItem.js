import React from 'react';
import { View, StyleSheet} from 'react-native';
import { Text, Card } from 'react-native-paper';
import renderWeatherImage from './weatherImage'


const HourlyWeatherItem = ({ time, temperature, weather_code }) => {
  // Format the time to display only the hour if necessary
  const formattedTime = new Date(time).getHours() + ":00";
  const formattedTemperature = Number(temperature).toFixed(1);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.container}>
      <Text style={styles.timeText}>{formattedTime}</Text>
      <Text style={styles.temperatureText}>{`${formattedTemperature}°C`}</Text>
      {renderWeatherImage(weather_code, 35, 35)}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flex: 1
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  temperatureText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff8c00', // Choose a color that represents temperature
  },  
  card: {
    margin: 4,
  },
});

export default HourlyWeatherItem;