import { icons } from '@/assets/constants';
import { useSSO } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';
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
  const { startSSOFlow } = useSSO();

  useWarmUpBrowser();

  const handleGoogleLogin = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: 'oauth_google',
          // For web, defaults to current path
          // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
          // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
          redirectUrl: AuthSession.makeRedirectUri({
            scheme: 'uber-clone',
            // path: 'oauth-native-callback',
          }),
        });

      if (createdSessionId) {
        await setActive!({
          session: createdSessionId,
        });

        // Navigate to root to trigger auth state re-evaluation
        router.replace('/(root)/(tabs)/home');
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next stepss
        console.log('No createdSessionId - checking signIn/signUp objects');

        if (signIn) {
          console.log('SignIn status:', signIn.status);
          console.log('SignIn first factor:', signIn.firstFactorVerification);
        }

        if (signUp) {
          console.log('SignUp status:', signUp.status);
          console.log('SignUp verifications:', signUp.verifications);
        }
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

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
