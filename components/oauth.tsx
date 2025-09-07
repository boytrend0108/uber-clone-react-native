import { icons } from '@/assets/constants';
import { useOAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import CustomButton from './custom-button';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  useWarmUpBrowser();

  const handleGoogleLogin = useCallback(async () => {
    try {
      console.log('Starting Google OAuth flow...');

      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      console.log('OAuth flow result:', {
        hasCreatedSessionId: !!createdSessionId,
        hasSignIn: !!signIn,
        hasSignUp: !!signUp,
        signInStatus: signIn?.status,
        signUpStatus: signUp?.status,
      });

      if (createdSessionId) {
        console.log('Got createdSessionId, setting active session...');
        await setActive!({ session: createdSessionId });

        // Add a small delay to ensure session is properly set
        setTimeout(() => {
          router.replace('/(root)/(tabs)/home');
        }, 100);
        return;
      }

      // Handle sign-in completion
      if (signIn && signIn.status === 'complete') {
        console.log('SignIn is complete, setting session...');
        if (signIn.createdSessionId) {
          await setActive!({ session: signIn.createdSessionId });

          setTimeout(() => {
            router.replace('/(root)/(tabs)/home');
          }, 100);
          return;
        }
      }

      // Handle sign-up completion
      if (signUp && signUp.status === 'complete') {
        console.log('SignUp is complete, setting session...');
        if (signUp.createdSessionId) {
          await setActive!({ session: signUp.createdSessionId });

          setTimeout(() => {
            router.replace('/(root)/(tabs)/home');
          }, 100);
          return;
        }
      }

      // If we get here, something went wrong
      console.log('OAuth flow incomplete, no session created');
    } catch (err: any) {
      console.error('OAuth Error:', err);
      console.error('OAuth Error Details:', JSON.stringify(err, null, 2));
    }
  }, [startOAuthFlow]);

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
