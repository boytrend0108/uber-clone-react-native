import { icons, images } from '@/assets/constants';
import InputField from '@/components/input-field';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px] bg-white">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="absolute bottom-5 left-5  text-black text-2xl font-JakartaSemiBold">
            Create Your Account
          </Text>
        </View>

        <View className="flex-1 items-center justify-center p-4">
          <InputField
            label="Name"
            labelStyle="text-black"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />

          <InputField
            label="Email"
            labelStyle="text-black"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />

          <InputField
            label="Password"
            labelStyle="text-black"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            secureTextEntry
            onChangeText={(text) => setForm({ ...form, password: text })}
            secureTextEntry
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
