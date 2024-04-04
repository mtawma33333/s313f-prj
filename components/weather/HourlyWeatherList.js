import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import HourlyWeatherItem from './HourlyWeatherItem'; // Make sure to create and import this component

const HourlyWeatherList = ({ data }) => {
  const currentTime = new Date();
  const oneDayAheadTime = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000); // Time 24 hours ahead

  // Filter data to only include the next 24 hours
  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.time);
    return itemDate >= currentTime && itemDate <= oneDayAheadTime;
  });
  const renderItem = ({ item }) => (
    <HourlyWeatherItem
      time={item.time}
      temperature={item.temperature}
      weather_code={item.weatherCode}
    />
  );

  const keyExtractor = (item, index) => String(index);

  return (
    <View>
    <FlatList
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal={true} // enables horizontal scrolling
      showsHorizontalScrollIndicator={true} // shows scrollbar, set to false if you want to hide it
      style={styles.list}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    // styles for your list
  },
});

export default HourlyWeatherList;