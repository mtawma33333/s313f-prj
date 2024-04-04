import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Chip,
  IconButton,
  Paragraph,
  Text,
  TouchableRipple,
} from 'react-native-paper';

const renderWeatherImage = require('./weatherImage');
import { getWeatherConditionString } from '../../model/weather';

function ForecastItem({ day, weather_code, temperature_min, temperature_max, Pfunc }) {
  const formattedTemperatureMax = Number(temperature_max).toFixed(1);
  const formattedTemperatureMin = Number(temperature_min).toFixed(1);
  return (
    <TouchableRipple
      onPress={() => Pfunc({day})}
      rippleColor="rgba(0, 0, 0, .32)">
      <View style={styles.forecastItem}>
        <View style={styles.forecastItemDayView}>
          <Text style={styles.dayText}>{day}</Text>
          <Text style={styles.weatherText}>
            {getWeatherConditionString(weather_code)}
          </Text>
        </View>
        <View style={styles.forecastItemDataView}>
          {renderWeatherImage(weather_code, 35, 35)}
          <Text style={styles.forecastItemTempLow}>
            {formattedTemperatureMin}°
          </Text>
          <Text style={styles.forecastItemTempHigh}>
            {formattedTemperatureMax}°
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
}

export default ForecastItem;

const styles = StyleSheet.create({
  forecastItem: {
    paddingTop: 14,
    paddingBottom: 12,
    flexDirection: 'row',
  },
  forecastItemDayView: {
    flex: 1,
  },
  forecastItemDataView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dayText: {
    fontSize: 16,
  },
  weatherText: {
    fontSize: 16,
    color: '#B0B5BF',
  },
  forecastItemTempLow: {
    textAlign: 'right',
    marginLeft: 16,
    width: 60,
    color: '#B0B5BF',
    fontSize: 16,
  },
  forecastItemTempHigh: {
    textAlign: 'right',
    marginLeft: 16,
    width: 60,
    fontSize: 16,
  },
});
