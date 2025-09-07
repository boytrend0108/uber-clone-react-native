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
      console.log('Starting Google OAuth flow...');

      // Create the redirect URL
      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: 'uber-clone',
        path: '/oauth',
      });
      console.log('OAuth redirect URL:', redirectUrl);

      const { createdSessionId, signIn, signUp, setActive, authSessionResult } =
        await startSSOFlow({
          strategy: 'oauth_google',
          redirectUrl,
        });

      console.log('OAuth flow result:', {
        createdSessionId,
        signIn: signIn
          ? {
              status: signIn.status,
              createdSessionId: signIn.createdSessionId,
              firstFactorVerification: {
                status: signIn.firstFactorVerification?.status,
                strategy: signIn.firstFactorVerification?.strategy,
              },
            }
          : null,
        signUp: signUp
          ? {
              status: signUp.status,
              createdSessionId: signUp.createdSessionId,
            }
          : null,
        authSessionResult: authSessionResult
          ? {
              type: authSessionResult.type,
            }
          : null,
      });

      // Check if user dismissed or cancelled the OAuth flow
      if (authSessionResult?.type === 'dismiss') {
        console.log('❌ User dismissed the OAuth popup');
        console.log(
          '💡 Try again: Make sure to complete the Google sign-in process'
        );
        return;
      }

      if (authSessionResult?.type === 'cancel') {
        console.log('❌ User cancelled the OAuth flow');
        return;
      }

      // Check for success type
      if (authSessionResult?.type === 'success') {
        console.log('✅ OAuth popup completed successfully');
      }

      // Priority 1: If we have a direct session, use it
      if (createdSessionId) {
        console.log('✅ Got createdSessionId, setting active session...');
        await setActive!({ session: createdSessionId });
        router.replace('/(root)/(tabs)/home');
        return;
      }

      // Priority 2: Handle completed sign-in
      if (signIn && signIn.status === 'complete' && signIn.createdSessionId) {
        console.log('✅ SignIn is complete, setting session...');
        await setActive!({ session: signIn.createdSessionId });
        router.replace('/(root)/(tabs)/home');
        return;
      }

      // Priority 3: Handle completed sign-up
      if (signUp && signUp.status === 'complete' && signUp.createdSessionId) {
        console.log('✅ SignUp is complete, setting session...');
        await setActive!({ session: signUp.createdSessionId });
        router.replace('/(root)/(tabs)/home');
        return;
      }

      // Check for specific statuses that might need attention
      if (signIn) {
        console.log('🔍 SignIn status details:', {
          status: signIn.status,
          identifier: signIn.identifier,
          supportedFirstFactors: signIn.supportedFirstFactors,
          firstFactorVerification: signIn.firstFactorVerification,
        });

        if (signIn.firstFactorVerification?.status === 'verified') {
          console.log(
            '🔄 Sign-in verification completed, but no session created yet'
          );
          console.log('This usually indicates a Clerk configuration issue');
        }
      }

      if (signUp) {
        console.log('🔍 SignUp status details:', {
          status: signUp.status,
          emailAddress: signUp.emailAddress,
          missingFields: signUp.missingFields,
          requiredFields: signUp.requiredFields,
        });
      }

      // If we get here, the OAuth flow was not successful
      console.log('⚠️ OAuth flow incomplete - no session created');

      // Run diagnosis
      const issueType = diagnoseOAuthIssue({
        createdSessionId,
        signIn,
        signUp,
        authSessionResult,
      });

      console.log('');
      console.log('🔧 Troubleshooting steps:');
      console.log('1. Make sure you complete the Google sign-in popup');
      console.log('2. Check your internet connection');
      console.log('3. Verify Clerk configuration in dashboard');
      console.log('4. Check if Google OAuth is properly configured in Clerk');
      console.log('');
    } catch (err: any) {
      console.error('❌ OAuth Error:', err);

      // Check for specific error types
      if (
        err.message?.includes('dismissed') ||
        err.message?.includes('cancelled')
      ) {
        console.log(
          '💡 OAuth was dismissed or cancelled by user - this is normal if you closed the popup'
        );
      } else if (
        err.message?.includes('network') ||
        err.message?.includes('fetch')
      ) {
        console.log(
          '💡 Network error during OAuth flow - check your internet connection'
        );
      } else {
        console.error('💡 Unexpected OAuth error occurred');
        console.error('Error details:', {
          message: err.message,
          code: err.code,
          status: err.status,
          name: err.name,
        });
      }
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
    </View>
  );
};

export default OAuth;
