import { icons } from '@/assets/constants';
import { formatDate, formatTime } from '@/lib/utils';
import { Ride } from '@/types/type';
import React from 'react';
import { Image, Text, View } from 'react-native';

const RideCart = ({
  ride: {
    origin_address,
    destination_address,
    origin_latitude,
    origin_longitude,
    driver,
    fare_price,
    destination_latitude,
    destination_longitude,
    created_at,
    ride_time,
    payment_status,
  },
}: {
  ride: Ride;
}) => {
  // Convert coordinates to numbers (handle both string and number types)
  const originLat =
    typeof origin_latitude === 'string'
      ? parseFloat(origin_latitude)
      : origin_latitude;
  const originLng =
    typeof origin_longitude === 'string'
      ? parseFloat(origin_longitude)
      : origin_longitude;
  const destLat =
    typeof destination_latitude === 'string'
      ? parseFloat(destination_latitude)
      : destination_latitude;
  const destLng =
    typeof destination_longitude === 'string'
      ? parseFloat(destination_longitude)
      : destination_longitude;

  // Check if coordinates are valid
  const hasValidCoordinates =
    !isNaN(originLat) &&
    !isNaN(originLng) &&
    !isNaN(destLat) &&
    !isNaN(destLng);

  const mapUrl = hasValidCoordinates
    ? `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:${(originLng + destLng) / 2},${(originLat + destLat) / 2}&zoom=13&marker=lonlat:${originLng},${originLat};type:material;color:%23ff3421;size:large;icon:circle|lonlat:${destLng},${destLat};type:material;color:%233b82f6;size:large;icon:circle&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`
    : null;

  return (
    <View className="flex gap-2  bg-white rounded-lg shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]  mb-3 p-4">
      <View className="flex flex-row justify-center items-center">
        <View className="flex flex-row justify-center items-center p-3">
          <View className="flex flex-col justify-center items-center">
            {hasValidCoordinates && mapUrl ? (
              <Image
                source={{ uri: mapUrl }}
                className="w-[80px] h-[90px] rounded-lg border border-gray-300"
                onError={(error) => console.log('Image load error:', error)}
                onLoad={() => console.log('Image loaded successfully')}
              />
            ) : (
              <View className="w-[80px] h-[90px] rounded-lg border border-gray-300 bg-gray-100 flex justify-center items-center">
                <Text className="text-xs text-gray-500 text-center">
                  No Map Data
                </Text>
              </View>
            )}
          </View>
        </View>

        <View className="flex-1 mx-3">
          <View className="flex flex-row items-center ">
            <Image source={icons.to} className="w-4 h-4 mr-1" />
            <Text className="text-md font-semibold mb-1">
              {origin_address || 'Unknown origin'}
            </Text>
          </View>

          <View className="flex flex-row items-center">
            <Image source={icons.point} className="w-4 h-4 mr-1 mb-2" />
            <Text className="text-sm text-gray-600 mb-2">
              {destination_address || 'Unknown destination'}
            </Text>
          </View>

          {driver && (
            <Text className="text-sm text-gray-700">
              Driver: {driver.first_name} {driver.last_name}
            </Text>
          )}
          {fare_price && (
            <Text className="text-md font-bold text-green-600">
              ${fare_price}
            </Text>
          )}
        </View>
      </View>

      <View className="flex flex-row items-center justify-between">
        <Text>Date & Time</Text>

        <View className="flex flex-row ">
          <Text className="font-JakartaMedium text-gray-500">
            {formatDate(created_at)},
          </Text>
          <Text className="font-JakartaMedium text-gray-500">
            {formatTime(ride_time)}
          </Text>
        </View>
      </View>

      <View className="flex flex-row items-center justify-between">
        <Text>Payment Status</Text>

        <View className="flex flex-row ">
          <Text
            className={`font-JakartaMedium ${payment_status === 'paid' ? 'text-green-500' : 'text-red-500'} capitalize`}
          >
            {payment_status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RideCart;
