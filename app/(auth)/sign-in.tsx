import { icons, images } from '@/assets/constants';
import CustomButton from '@/components/custom-button';
import InputField from '@/components/input-field';
import Oauth from '@/components/oauth';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px] bg-white">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="absolute bottom-5 left-5  text-black text-2xl font-JakartaSemiBold">
            Welcome👋
          </Text>
        </View>

        <View className="flex-1 items-center justify-center p-4">
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
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />

          <Oauth />

          <Link href="/sign-up" className="mt-10 text-lg text-general-200">
            <Text>Don&apos;t have an account?</Text>
            <Text className="text-blue-500"> Sign up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
