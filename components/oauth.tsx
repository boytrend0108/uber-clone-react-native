import { icons } from '@/assets/constants';
import React from 'react';
import { Image, Text, View } from 'react-native';
import CustomButton from './custom-button';

const OAuth = () => {
  const handleGoogleLogin = () => {
    // Handle Google login logic
  };

  return (
    <View className="w-full">
      <View className="flex flex-row items-center justify-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] w-full bg-general-200" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] w-full bg-general-200" />
      </View>

      <CustomButton
        title="Login with Google"
        onPress={handleGoogleLogin}
        className="mt-6"
        IconLeft={() => (
          <Image
            source={icons.google}
            className="w-6 h-6 mx-2"
            resizeMode="contain"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
      />
    </View>
  );
};

export default OAuth;
