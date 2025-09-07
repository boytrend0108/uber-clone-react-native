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

    if (isLoaded) {
      if (validateSessionState(isLoaded, isSignedIn, sessionId)) {
        setRedirectTarget('/(root)/(tabs)/home');
      } else {
        setRedirectTarget('/(auth)/onboarding');
      }
    }
  }, [isSignedIn, isLoaded, sessionId]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (redirectTarget) {
    return <Redirect href={redirectTarget as any} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Home;
