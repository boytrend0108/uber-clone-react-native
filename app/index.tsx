import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-get-random-values';

const Home = () => {
  const { isSignedIn, isLoaded } = useAuth();

  console.log('Auth state:', { isSignedIn, isLoaded });

  // Wait for Clerk to load before checking authentication state
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href={'/(root)/(tabs)/home'} />;
  }

  return <Redirect href="/(auth)/onboarding" />;
};

export default Home;
