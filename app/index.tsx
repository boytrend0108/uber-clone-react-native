import { logSessionDebug, validateSessionState } from '@/lib/session';
import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-get-random-values';

const Home = () => {
  const { isSignedIn, isLoaded, sessionId } = useAuth();
  const [redirectTarget, setRedirectTarget] = useState<string | null>(null);

  useEffect(() => {
    logSessionDebug('AUTH_STATE_CHANGE', {
      isSignedIn,
      isLoaded,
      sessionId: sessionId || 'No session',
    });
    console.log('Auth state changed:', {
      isSignedIn,
      isLoaded,
      sessionId: sessionId || 'No session',
    });

    // Only set redirect target when Clerk is fully loaded
    if (isLoaded) {
      if (validateSessionState(isLoaded, isSignedIn, sessionId)) {
        console.log(
          'User is signed in with session:',
          sessionId,
          '...redirecting to home...'
        );
        setRedirectTarget('/(root)/(tabs)/home');
      } else {
        console.log(
          'User not signed in or no session, redirecting to onboarding...'
        );
        setRedirectTarget('/(auth)/onboarding');
      }
    }
  }, [isSignedIn, isLoaded, sessionId]);

  // Wait for Clerk to load before checking authentication state
  if (!isLoaded) {
    console.log('Clerk is loading...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Only redirect when we have a clear target
  if (redirectTarget) {
    return <Redirect href={redirectTarget as any} />;
  }

  // Fallback loading state
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Home;
