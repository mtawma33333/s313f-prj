import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Text, Card, TouchableRipple } from 'react-native-paper';
import renderWeatherImage from '../weather/weatherImage';
import { useLocation } from '../../context/LocationContext';

export const LocationCard = ({
  location,
  latitude,
  longitude,
  time,
  weather_code,
  temperature,
  temperature_max,
  temperature_min,
}) => {
  const { setLocation } = useLocation();
  const d_time = new Date(time);
  var hr = d_time.getHours();
  var min = d_time.getMinutes();
  if (min < 10) {
      min = "0" + min;
  }
  const formattedTime = hr + ':' + min;
  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation prop

  // This function will be called when the card is pressed
  const handlePress = () => {
    // Here you update the context with the new location details
    console.log(`${latitude},${longitude}`)
    setLocation({ latitude, longitude, location });
    // And navigate to the Weather screen
    navigation.navigate('Weather');
  };
  return (
    <Card style={styles.card}>
      <TouchableRipple
        onPress={handlePress}
        rippleColor="rgba(0, 0, 0, .32)">
        <Card.Content style={styles.forecastItem}>
          <View style={styles.locationItemWeatherView}>
            <Text style={styles.text2}>{location}</Text>
            <Text style={styles.text3}>{formattedTime}</Text>
            {renderWeatherImage(weather_code, 50, 50)}
          </View>
          <View style={styles.locationItemDataView}>
            <Text style={[styles.text1, styles.temperature]}>
              {temperature}°
            </Text>
            <View style={styles.temperatureItem2}>
              <View style={styles.temperature}>
                <Text style={styles.text3}>max</Text>
                <Text style={styles.text3}>{temperature_max}°</Text>
              </View>
              <View style={styles.temperature}>
                <Text style={styles.text3}>min</Text>
                <Text style={styles.text3}>{temperature_min}°</Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </TouchableRipple>
    </Card>
  );
};

const styles = StyleSheet.create({
  forecastItem: {
    paddingTop: 14,
    paddingBottom: 12,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  locationItemWeatherView: {
    flexGrow: 1,
  },
  locationItemDataView: {
    flexDirection: 'colmun',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  text1: {
    fontSize: 36,
  },
  text2: {
    fontSize: 20,
  },
  text3: {
    fontSize: 16,
  },
  temperature: {
    justifyContent: 'center',
  },
  temperatureItem2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    margin: 10,
  },
});
