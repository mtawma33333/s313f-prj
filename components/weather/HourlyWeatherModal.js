import React from 'react';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import renderWeatherImage from './weatherImage';
import { getWeatherConditionString } from '../../model/weather';

const HourlyWeatherItem = ({ time, temperature, weather_code }) => {
  // Format the time to display only the hour if necessary
  const formattedTime = new Date(time).getHours() + ':00';
  const formattedTemperature = Number(temperature).toFixed(1);

  return (
    <View style={styles.forecastItem}>
      <View style={styles.forecastItemDayView}>
        <Text style={styles.dayText}>{formattedTime}</Text>
        <Text style={styles.weatherText}>
          {getWeatherConditionString(weather_code)}
        </Text>
      </View>
      <View style={styles.forecastItemDataView}>
        {renderWeatherImage(weather_code, 35, 35)}
        <Text style={styles.forecastItemTempHigh}>{formattedTemperature}°</Text>
      </View>
    </View>
  );
};

const HourlyWeatherModal = ({ data }) => {
  const renderItem = ({ item }) => (
    <HourlyWeatherItem
      time={item.time}
      temperature={item.temperature}
      weather_code={item.weatherCode}
    />
  );
  const dateTimeString = data[0].time.split('T')[0];
  const keyExtractor = (item, index) => String(index);
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.tilte}>{dateTimeString}</Text>
        <Divider/>
        <ScrollView>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            horizontal={false}
          />
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

export default HourlyWeatherModal;

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
  forecastItemTempHigh: {
    textAlign: 'right',
    marginLeft: 16,
    width: 60,
    fontSize: 16,
  },
  card: {
    maxHeight: '100%',
  },
  tilte: {
    fontSize: 20,
    fontStyle: 'bold',
    marginBottom: 10,
  }
});
