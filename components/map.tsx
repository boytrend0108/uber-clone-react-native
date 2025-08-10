import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';

const Map = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);
  console.log('expo-location:', location);
  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{ width: '100%', height: '100%', borderRadius: '40px' }}
      initialRegion={region}
      tintColor="black"
      showsPointsOfInterest={false}
      showsUserLocation={true}
      userInterfaceStyle="light"
    />
  );
};

export default Map;
