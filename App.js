import * as React from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import {
  Card,
  Title,
  Paragraph,
  List,
  PaperProvider,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './screens/Homescreen'
import WeatherScreen from './screens/WeatherScreen'
import { LocationProvider } from './context/LocationContext';
import theme from './constants/theme'

const Tab = createMaterialBottomTabNavigator();


function MyTabs() {
  return (
    <LocationProvider>
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={theme.colors.secondary}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Weather"
        component={WeatherScreen}
        options={{
          tabBarLabel: 'Weather',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cloud" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
    </LocationProvider>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </PaperProvider>
  );
}