import { icons, images } from '@/assets/constants';
import CustomButton from '@/components/custom-button';
import InputField from '@/components/input-field';
import Oauth from '@/components/oauth';
import { fetchAPI } from '@/lib/fetch';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import Modal from 'react-native-modal';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [verificationStatus, setVerificationStatus] = React.useState<
    'pending' | 'verified' | 'failed'
  >('failed');

  const [code, setCode] = React.useState('');
  const [error, setError] = useState<string | null>(null);

  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setVerificationStatus('pending');
    } catch (err: any) {
      setVerificationStatus('failed');
      Alert.alert('Error', err.errors[0]?.longMessage || 'An error occurred');
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await fetchAPI('/(api)/user', {
          method: 'POST',
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        });

        await setActive({ session: signUpAttempt.createdSessionId });

        setVerificationStatus('verified');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      setError(err.errors[0]?.longMessage || 'An error occurred');
    }
  };

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

          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
          />

          <Oauth />

          <Link href="/sign-in" className="mt-10 text-lg text-general-200">
            <Text>Already have an account?</Text>
            <Text className="text-blue-500"> Login</Text>
          </Link>
        </View>

        <Modal
          isVisible={verificationStatus === 'pending'}
          className="mx-4"
          onBackdropPress={() => setVerificationStatus('failed')}
        >
          <View className="bg-white py-9 px-7 rounded-2xl min-h-[300px]">
            <Text className="text-center text-3xl mb-5 font-JakartaExtraBold">
              Verification
            </Text>

            <Text className="text-center text-base text-gray-400 mt-2 font-JakartaExtraBold">
              We send a verification code to {form.email}. Please check your
              inbox and enter the code below to verify your account.
            </Text>

            <InputField
              label="Verification Code"
              labelStyle="text-black"
              placeholder="Enter your verification code"
              icon={icons.lock}
              value={code}
              onChangeText={(text) => setCode(text)}
              keyboardType="numeric"
            />

            {error && (
              <Text className="text-red-500 text-center mt-2">{error}</Text>
            )}

            <CustomButton
              title="Verify"
              onPress={onVerifyPress}
              className="mt-5 bg-success-500"
            />
          </View>
        </Modal>

        <Modal isVisible={verificationStatus === 'verified'} className="mx-4">
          <View className="bg-white py-9 px-7 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto mb-5"
            />

            <Text className="text-center text-3xl mb-5 font-JakartaExtraBold">
              Verified
            </Text>

            <Text className="text-center text-base text-gray-400 mt-2 font-JakartaExtraBold">
              You have successfully verified your email address.
            </Text>

            <CustomButton
              title="Browse Home"
              onPress={() => router.push('/(root)/(tabs)/home')}
              className="mt-5"
            />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
