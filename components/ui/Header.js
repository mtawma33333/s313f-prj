import react from 'react';
import {
  Button,
  Card,
} from 'react-native-paper';
import { Text, View, StyleSheet, Image } from 'react-native';
import theme from '../../constants/theme'

const Header = ({location,temperature,weather, highestTemp, lowestTemp}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.h2}>{location}</Text>
      <Text style={styles.h1}>{temperature}°</Text>
      <Text style={styles.h3}>{weather}</Text>
      <Text style={styles.h3}>最高{highestTemp}°    最低{lowestTemp}°</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingTop:50,
    color: theme.colors.textPrimary,
    justifyContent: 'center',
  },
  h1: {
    fontSize: 48,
    textAlign: 'center',

  },
  h2: {
    fontSize: 36,
    textAlign: 'center',
  },
  h3: {
    fontSize: 18,
    textAlign: 'center',

  }
})

export default Header;