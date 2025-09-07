import { icons } from '@/assets/constants';
import { diagnoseOAuthIssue } from '@/lib/session';
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
      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: 'uber-clone',
        path: '/oauth',
      });

      const { createdSessionId, signIn, signUp, setActive, authSessionResult } =
        await startSSOFlow({
          strategy: 'oauth_google',
          redirectUrl,
        });

      if (authSessionResult?.type === 'dismiss') {
        return;
      }

      if (authSessionResult?.type === 'cancel') {
        return;
      }

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.replace('/(root)/(tabs)/home');
        return;
      }

      if (signIn && signIn.status === 'complete' && signIn.createdSessionId) {
        await setActive!({ session: signIn.createdSessionId });
        router.replace('/(root)/(tabs)/home');
        return;
      }

      if (signUp && signUp.status === 'complete' && signUp.createdSessionId) {
        await setActive!({ session: signUp.createdSessionId });
        router.replace('/(root)/(tabs)/home');
        return;
      }

      diagnoseOAuthIssue({
        createdSessionId,
        signIn,
        signUp,
        authSessionResult,
      });
    } catch {
      // Handle OAuth errors silently or with user-friendly messages
    }
  }, [startSSOFlow]);

  const handleGithubLogin = useCallback(async () => {
    try {
      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: 'uber-clone',
        path: '/oauth',
      });

      const { createdSessionId, signIn, signUp, setActive, authSessionResult } =
        await startSSOFlow({
          strategy: 'oauth_github',
          redirectUrl,
        });

      if (authSessionResult?.type === 'dismiss') {
        return;
      }

      if (authSessionResult?.type === 'cancel') {
        return;
      }

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.replace('/(root)/(tabs)/home');
        return;
      }

      if (signIn && signIn.status === 'complete' && signIn.createdSessionId) {
        await setActive!({ session: signIn.createdSessionId });
        router.replace('/(root)/(tabs)/home');
        return;
      }

      if (signUp && signUp.status === 'complete' && signUp.createdSessionId) {
        await setActive!({ session: signUp.createdSessionId });
        router.replace('/(root)/(tabs)/home');
        return;
      }

      diagnoseOAuthIssue({
        createdSessionId,
        signIn,
        signUp,
        authSessionResult,
      });
    } catch {
      // Handle OAuth errors silently or with user-friendly messages
    }
  }, [startSSOFlow]);

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

      <CustomButton
        title="Login with GitHub"
        onPress={handleGithubLogin}
        className="mt-6"
        IconLeft={() => (
          <Image
            source={icons.star}
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
