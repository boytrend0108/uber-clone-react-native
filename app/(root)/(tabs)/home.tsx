import { icons, images } from '@/assets/constants';
import GoogleTextInput from '@/components/google-text-input';
import Map from '@/components/map';
import RideCart from '@/components/ride-cart';
import { useFetch } from '@/lib/fetch';
import { useLocationStore } from '@/store';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const loading = false; // Simulating loading state
  const { user } = useUser();
  const [isScreenFocused, setIsScreenFocused] = useState(true);
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const { data: recentRides, isLoading } = useFetch(`/(api)/ride/${user?.id}`);
  const { signOut } = useAuth();

  const [hasPermissions, setHasPermissions] = useState(false);

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        setHasPermissions(true);

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });

        const address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          address: `${address[0].name}, ${address[0].region}`,
        });
      } else {
        setHasPermissions(false);
      }
    };

    requestLocation();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsScreenFocused(true);

      return () => {
        setIsScreenFocused(false);
      };
    }, [])
  );

  const handleSignOut = () => {
    signOut();

    router.replace('/(auth)/sign-in');
  };

  const handleDestinationPress = (location: {
    longitude: number;
    latitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push('/(root)/find-ride');
  };

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRides}
        renderItem={({ item }) => <RideCart ride={item} />}
        keyExtractor={(item) => item.ride_id}
        keyboardShouldPersistTaps="handled"
        className="px-5"
        contentContainerStyle={{ paddingBottom: 150 }}
        ListEmptyComponent={() => (
          <View className="flex-1 h-screen items-center justify-center">
            {!loading ? (
              <>
                <Image source={images.noResult} className="w-40 h-40 mb-2" />
                <Text className="text-gray-500">No recent rides found.</Text>
              </>
            ) : (
              <ActivityIndicator size="large" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center  justify-between my-5">
              <View>
                <Text className="text-xl font-JakartaExtraBold text-gray-800">
                  Wellcome{', '}
                  {user?.firstName ||
                    user?.emailAddresses[0]?.emailAddress.split('@')[0] ||
                    'Guest'}{' '}
                  👋
                </Text>
              </View>

              <TouchableOpacity onPress={handleSignOut}>
                <Image
                  source={icons.out}
                  className="w-8 h-8 bg-white p-2 rounded-full"
                />
              </TouchableOpacity>
            </View>

            <>
              <GoogleTextInput
                icon={icons.search}
                containerStyle="bg-white shadow-md shadow-neutral-300"
                handlePress={handleDestinationPress}
              />

              <>
                <Text className="text-gray-500 mb-3 mt-5 font-JakartaBold">
                  Your current location
                </Text>

                <View className="flex flex-row items-center bg-transparent h-[300px]">
                  {isScreenFocused && <Map />}
                </View>

                <Text className="text-gray-500 mb-3 mt-5 font-JakartaBold">
                  Recent Rides
                </Text>
              </>
            </>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
