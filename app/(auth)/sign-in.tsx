import { icons, images } from '@/assets/constants';
import CustomButton from '@/components/custom-button';
import InputField from '@/components/input-field';
import Oauth from '@/components/oauth';
import { logSessionDebug } from '@/lib/session';
import { useAuth, useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { signIn, setActive, isLoaded } = useSignIn();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/(root)/(tabs)/home');
    }
  }, [isSignedIn, router]);

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      logSessionDebug('SIGN_IN_ATTEMPT', 'Clerk not loaded yet');
      return;
    }

    try {
      logSessionDebug('SIGN_IN_START', { email: form.email });

      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      logSessionDebug('SIGN_IN_RESULT', {
        status: signInAttempt.status,
        createdSessionId: signInAttempt.createdSessionId,
        hasSession: !!signInAttempt.createdSessionId,
      });

      if (signInAttempt.status === 'complete') {
        try {
          if (signInAttempt.createdSessionId) {
            logSessionDebug('SET_ACTIVE_SESSION', {
              sessionId: signInAttempt.createdSessionId,
            });
            await setActive({ session: signInAttempt.createdSessionId });
          } else {
            logSessionDebug(
              'NO_SESSION_ID_FALLBACK',
              'Attempting to set active session without explicit ID'
            );
            await setActive({ session: signInAttempt.createdSessionId });
          }

          logSessionDebug('SESSION_SET_SUCCESS', 'Redirecting to home');
          router.replace('/(root)/(tabs)/home');
        } catch (sessionError) {
          logSessionDebug('SESSION_SET_ERROR', sessionError);
          router.replace('/(root)/(tabs)/home');
        }
      } else {
        logSessionDebug('SIGN_IN_INCOMPLETE', signInAttempt);
      }
    } catch (err) {
      logSessionDebug('SIGN_IN_ERROR', err);
    }
  }, [isLoaded, form.email, form.password, signIn, setActive, router]);

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
