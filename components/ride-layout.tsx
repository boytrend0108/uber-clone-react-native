import { icons } from '@/assets/constants';
import { router } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const RideLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-blue-500">
        <View className="flex flex-col h-screen bg-blue-500">
          <View className="flex flex-row absolute z-10 top-16 item-center justify-start px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="h-10 w-10 bg-white rounded-full items-center justify-center">
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="h-6 w-6"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {children}
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
