export const WeatherCode = {
  clearSky: 0,
  mainlyClear: 1,
  partlyCloudy: 2,
  overcast: 3,
  fog: 45,
  depositingRimeFog: 48,
  lightDrizzle: 51,
  moderateDrizzle: 53,
  denseDrizzle: 55,
  lightFreezingDrizzle: 56,
  moderateOrDenseFreezingDrizzle: 57,
  lightRain: 61,
  moderateRain: 63,
  heavyRain: 65,
  lightFreezingRain: 66,
  moderateOrHeavyFreezingRain: 67,
  slightSnowfall: 71,
  moderateSnowfall: 73,
  heavySnowfall: 75,
  snowGrains: 77,
  slightRainShowers: 80,
  moderateRainShowers: 81,
  heavyRainShowers: 82,
  slightSnowShowers: 85,
  heavySnowShowers: 86,
  thunderstormSlightOrModerate: 95,
  thunderstormStrong: 96,
  thunderstormHeavy: 99,
};

export function getWeatherConditionString(code) {
  switch (code) {
    case WeatherCode.clearSky:
      return 'Clear Sky';
    case WeatherCode.mainlyClear:
      return 'Mainly Clear';
    case WeatherCode.partlyCloudy:
      return 'Partly Cloudy';
    case WeatherCode.overcast:
      return 'Overcast';
    case WeatherCode.fog:
      return 'Fog';
    case WeatherCode.depositingRimeFog:
      return 'Depositing Rime Fog';
    case WeatherCode.lightDrizzle:
      return 'Light Drizzle';
    case WeatherCode.moderateDrizzle:
      return 'Moderate Drizzle';
    case WeatherCode.denseDrizzle:
      return 'Dense Drizzle';
    case WeatherCode.lightFreezingDrizzle:
      return 'Light Freezing Drizzle';
    case WeatherCode.moderateOrDenseFreezingDrizzle:
      return 'Moderate or Dense Freezing Drizzle';
    case WeatherCode.lightRain:
      return 'Light Rain';
    case WeatherCode.moderateRain:
      return 'Moderate Rain';
    case WeatherCode.heavyRain:
      return 'Heavy Rain';
    case WeatherCode.lightFreezingRain:
      return 'Light Freezing Rain';
    case WeatherCode.moderateOrHeavyFreezingRain:
      return 'Moderate or Heavy Freezing Rain';
    case WeatherCode.slightSnowfall:
      return 'Slight Snowfall';
    case WeatherCode.moderateSnowfall:
      return 'Moderate Snowfall';
    case WeatherCode.heavySnowfall:
      return 'Heavy Snowfall';
    case WeatherCode.snowGrains:
      return 'Snow Grains';
    case WeatherCode.slightRainShowers:
      return 'Slight Rain Showers';
    case WeatherCode.moderateRainShowers:
      return 'Moderate Rain Showers';
    case WeatherCode.heavyRainShowers:
      return 'Heavy Rain Showers';
    case WeatherCode.slightSnowShowers:
      return 'Slight Snow Showers';
    case WeatherCode.heavySnowShowers:
      return 'Heavy Snow Showers';
    case WeatherCode.thunderstormSlightOrModerate:
      return 'Thunderstorm (Slight or Moderate)';
    case WeatherCode.thunderstormStrong:
      return 'Thunderstorm (Strong)';
    case WeatherCode.thunderstormHeavy:
      return 'Thunderstorm (Heavy)';
    default:
      return 'Unknown Weather Condition';
  }
}