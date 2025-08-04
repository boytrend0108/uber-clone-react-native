import { onboarding } from '@/assets/constants';
import CustomButton from '@/components/custom-button';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Swiper from 'react-native-swiper';

const Onboarding = () => {
  const swiperRef = React.useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => router.replace('/(auth)/sign-up')}
        className="w-full flex items-end justify-end p-5"
      >
        <Text className="text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#e2e8f0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286ff] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item, index) => (
          <View key={index} className="flex items-center justify-end p-4">
            <Image
              source={item.image}
              className="w-full h-[300px] rounded-lg"
              resizeMode="contain"
            />
            <View className="flex items-center justify-center mt-10 w-full">
              <Text className="text-3xl font-JakartaBold mx-10 text-center">
                {item.title}
              </Text>
              <Text className="text-lg font-JakartaSemiBold text-[#858585] text-center mx-10 mt-2">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? 'Get Started' : 'Next'}
        className="w-11/12 mt-10"
        onPress={() => {
          if (isLastSlide) {
            router.replace('/(auth)/sign-up');
          } else {
            swiperRef.current?.scrollBy(1);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default Onboarding;
