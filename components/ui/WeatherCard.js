import * as React from 'react';
import { Card, Title, Divider } from 'react-native-paper';
import { View, StyleSheet, Dimensions } from 'react-native';

const WeatherCard = ({ title, topContent, bottomContent }) => {
  return (
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{title}</Title>
          <Divider />
          <View style={styles.contentSection}>
            <Title style={styles.top}>{topContent}</Title>
            <Title style={styles.bottom}>{bottomContent}</Title>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 2,
    minWidth: 120, // Occupies half of the container width
    flexGrow: 1
  },
  card: {
    // Any additional styling for the card
    // e.g. shadow properties, margin, etc.
    minHeight: 150,
  },
  contentSection: {
    // Style for the section that holds the content
    justifyContent: 'space-between',
    // padding, margin, etc.
  },
  title: {
    // Style for the title text
    // fontSize, margin, textAlign, etc.
    fontSize: 14,
    color: '#B0B5BF',
  },
  top: {
    fontSize: 16,
  },
  bottom: {
    color: '#B0B5BF',
    fontSize: 12,

  },
});

export default WeatherCard;
