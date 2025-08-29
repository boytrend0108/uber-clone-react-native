import { icons } from '@/assets/constants';
import { mockDrivers } from '@/assets/mocks/drivers';
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from '@/lib/map';
import { useDriverStore, useLocationStore } from '@/store';
import { MarkerData } from '@/types/type';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';

const Map = () => {
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const { selectedDriver, setSelectedDriver, setDrivers } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    const initializeDrivers = async () => {
      if (!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({
        data: mockDrivers,
        userLatitude,
        userLongitude,
      });

      // If we have destination coordinates, calculate times and prices
      if (destinationLatitude && destinationLongitude) {
        console.log('Calculating driver times and prices...');
        const driversWithTimes = await calculateDriverTimes({
          markers: newMarkers,
          userLatitude,
          userLongitude,
          destinationLatitude,
          destinationLongitude,
        });

        if (driversWithTimes) {
          setMarkers(driversWithTimes);
          setDrivers(driversWithTimes);
        } else {
          setMarkers(newMarkers);
          setDrivers(newMarkers);
        }
      } else {
        setMarkers(newMarkers);
        setDrivers(newMarkers);
      }
    };

    initializeDrivers();
  }, [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);

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
      followsUserLocation={true}
      userInterfaceStyle="light"
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}

      {destinationLatitude && destinationLongitude && (
        <Marker
          key="destination"
          coordinate={{
            latitude: destinationLatitude,
            longitude: destinationLongitude,
          }}
          title="Destination"
          image={icons.pin}
        />
      )}

      <MapViewDirections
        origin={{ latitude: userLatitude!, longitude: userLongitude! }}
        destination={{
          latitude: destinationLatitude!,
          longitude: destinationLongitude!,
        }}
        apikey={process.env.EXPO_PUBLIC_GOOGLE_PLACE_API_KEY!}
        strokeColor="blue"
        strokeWidth={3}
      />
    </MapView>
  );
};

export default Map;
