import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { LocationCard } from './locationCard';
const LocationList = ({ data }) => {
  const renderItem = ({ item }) => (
    <LocationCard
      location={item.location}
      latitude={item.latitude}
      longitude={item.longitude}
      time={item.time}
      weather_code={item.weather_code}
      temperature={item.temperature}
      temperature_max={item.temperature_max}
      temperature_min={item.temperature_min}
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

export default LocationList;