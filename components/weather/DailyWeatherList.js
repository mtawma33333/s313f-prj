import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ForecastItem from './weatherItem'

const DailyWeatherList = ({ data, Pfunc }) => {
  const renderItem = ({ item }) => (
    <ForecastItem
      day={item.date}
      weather_code={item.weatherCode}
      temperature_min={item.minTemperature}
      temperature_max={item.maxTemperature}
      Pfunc={Pfunc}
    />
  );
  const keyExtractor = (item, index) => String(index);
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal={false}
    />  
  );
}

export default DailyWeatherList;