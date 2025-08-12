import { calculateRegion } from '@/lib/map';
import { useLocationStore } from '@/store';
import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const Map = () => {
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
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
