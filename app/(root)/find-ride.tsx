import RideLayout from '@/components/ride-layout';
import { useLocationStore } from '@/store';
import React from 'react';
import { Text, View } from 'react-native';

const FindRide = () => {
  const { userAddress, destinationAddress } = useLocationStore();
  return (
    <RideLayout>
      <View>
        <Text>You are here: {userAddress}</Text>
        <Text>Destination: {destinationAddress}</Text>
      </View>
    </RideLayout>
  );
};

export default FindRide;
