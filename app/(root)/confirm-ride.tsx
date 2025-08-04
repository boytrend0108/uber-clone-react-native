import CustomButton from '@/components/custom-button';
import DriverCard from '@/components/driver-card';
import RideLayout from '@/components/ride-layout';
import { useDriverStore } from '@/store';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, View } from 'react-native';

const ConfirmRide = () => {
  const { selectedDriver, setSelectedDriver, drivers } = useDriverStore();
  return (
    <RideLayout title="Choose a driver">
      <FlatList
        data={drivers}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(+item.id)}
          />
        )}
        // ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push('/(root)/book-ride')}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
