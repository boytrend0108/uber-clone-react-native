import { icons } from '@/assets/constants';
import Map from '@/components/map';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Keyboard, Text, TouchableOpacity, View } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const RideLayout = ({
  children,
  title,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-blue-500">
        <View className="flex flex-col h-screen bg-blue-500">
          <View className="flex flex-row absolute z-10 top-16 item-center justify-center px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="h-10 w-10 bg-white rounded-full items-center justify-center">
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="h-6 w-6"
                />
              </View>
            </TouchableOpacity>

            <Text className="ml-5 mt-1 text-xl font-JakartaBold">
              {title || 'Go Back'}
            </Text>
          </View>
        </View>
      </View>

      <Map />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['45%', '80%']}
        index={isKeyboardVisible ? 2 : 0}
        // style={{ flex: 1 }} // maybe it can fix view
      >
        <BottomSheetView style={{ flex: 1, padding: 20 }}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
