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

  // If user is already signed in, redirect to home
  useEffect(() => {
    if (isSignedIn) {
      console.log('User already signed in, redirecting to home...');
      router.replace('/(root)/(tabs)/home');
    }
  }, [isSignedIn, router]);

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      logSessionDebug('SIGN_IN_ATTEMPT', 'Clerk not loaded yet');
      console.log('Clerk not loaded yet, please wait...');
      return;
    }

    try {
      logSessionDebug('SIGN_IN_START', { email: form.email });
      console.log('Starting sign-in process...');

      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      logSessionDebug('SIGN_IN_RESULT', {
        status: signInAttempt.status,
        createdSessionId: signInAttempt.createdSessionId,
        hasSession: !!signInAttempt.createdSessionId,
      });

      console.log('Sign-in attempt result:', {
        status: signInAttempt.status,
        createdSessionId: signInAttempt.createdSessionId,
      });

      if (signInAttempt.status === 'complete') {
        // Try to set the session - handle both cases where createdSessionId exists or not
        try {
          if (signInAttempt.createdSessionId) {
            logSessionDebug('SET_ACTIVE_SESSION', {
              sessionId: signInAttempt.createdSessionId,
            });
            console.log(
              'Setting active session with ID:',
              signInAttempt.createdSessionId
            );
            await setActive({ session: signInAttempt.createdSessionId });
          } else {
            logSessionDebug(
              'NO_SESSION_ID_FALLBACK',
              'Attempting to set active session without explicit ID'
            );
            console.log(
              'No createdSessionId, attempting to set active session with the attempt object...'
            );
            // Sometimes Clerk doesn't return a sessionId but the session is still valid
            await setActive({ session: signInAttempt.createdSessionId });
          }

          logSessionDebug('SESSION_SET_SUCCESS', 'Redirecting to home');
          console.log('Session set successfully, redirecting to home...');
          router.replace('/(root)/(tabs)/home');
        } catch (sessionError) {
          logSessionDebug('SESSION_SET_ERROR', sessionError);
          console.error('Error setting active session:', sessionError);

          // If setting session fails, try to redirect anyway and let the app handle it
          console.log('Session set failed, but attempting redirect...');
          router.replace('/(root)/(tabs)/home');
        }
      } else {
        logSessionDebug('SIGN_IN_INCOMPLETE', signInAttempt);
        console.error(
          'Sign-in not complete:',
          JSON.stringify(signInAttempt, null, 2)
        );
      }
    } catch (err) {
      logSessionDebug('SIGN_IN_ERROR', err);
      console.error('Sign-in error:', JSON.stringify(err, null, 2));
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
