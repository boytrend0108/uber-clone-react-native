import { icons } from '@/assets/constants';
import CustomButton from '@/components/custom-button';
import GoogleTextInput from '@/components/google-text-input';
import RideLayout from '@/components/ride-layout';
import { useLocationStore } from '@/store';
import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setUserLocation,
    setDestinationLocation,
  } = useLocationStore();
  return (
    <RideLayout title="Ride">
      <View className="py-5">
        <Text className="font-JakartaBold text-lg mb-3">From</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>

      <View className="py-5">
        <Text className="font-JakartaBold text-lg mb-3">To</Text>

        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>

      <CustomButton
        title="Find Ride"
        className="mt-5 mb-10"
        onPress={() => router.push('/(root)/confirm-ride')}
      />
    </RideLayout>
  );
};

export default FindRide;
