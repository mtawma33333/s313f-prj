import React, { Component } from 'react';
import { Image } from 'react-native';
import { WeatherCode } from '../../model/weather';

function renderWeatherImage(code, width, height) {
  var image;
  switch (code) {
    case WeatherCode.clearSky:
      image = require('../../assets/images/sunny.png');
      break;
    case WeatherCode.mainlyClear:
      image = require('../../assets/images/sunny_s_cloudy.png');
      break;
    case WeatherCode.partlyCloudy:
    case WeatherCode.overcast:
      image = require('../../assets/images/partly_cloudy.png');
      break;
    case WeatherCode.fog:
    case WeatherCode.depositingRimeFog:
      image = require('../../assets/images/fog.png');
      break;
    case WeatherCode.lightDrizzle:
    case WeatherCode.moderateDrizzle:
    case WeatherCode.denseDrizzle:
    case WeatherCode.lightFreezingDrizzle:
    case WeatherCode.moderateOrDenseFreezingDrizzle:
      image = require('../../assets/images/rain_light.png');
      break;
    case WeatherCode.lightRain:
    case WeatherCode.moderateRain:
    case WeatherCode.heavyRain:
    case WeatherCode.lightFreezingRain:
    case WeatherCode.moderateOrHeavyFreezingRain:
      image = require('../../assets/images/rain.png');
      break;
    case WeatherCode.slightSnowfall:
    case WeatherCode.moderateSnowfall:
    case WeatherCode.heavySnowfall:
    case WeatherCode.snowGrains:
      image = require('../../assets/images/snow.png');
      break;
    case WeatherCode.slightRainShowers:
    case WeatherCode.moderateRainShowers:
    case WeatherCode.heavyRainShowers:
      image = require('../../assets/images/rain_s_cloudy.png');
      break;
    case WeatherCode.slightSnowShowers:
    case WeatherCode.heavySnowShowers:
      image = require('../../assets/images/snow.png');
      break;
    case WeatherCode.thunderstormSlightOrModerate:
    case WeatherCode.thunderstormStrong:
    case WeatherCode.thunderstormHeavy:
      image = require('../../assets/images/thunderstorms.png');
      break;
    default:
      // Default image if no match found
      image = require('../../assets/images/sunny.png');
      break;
  }
  const imageStyle = {
    width: width,
    height: height,
  };
  return <Image style={imageStyle} source={image} />;
}
module.exports = renderWeatherImage;
