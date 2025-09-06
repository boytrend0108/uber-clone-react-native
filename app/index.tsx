import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-get-random-values';

const Home = () => {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    console.log('Auth state changed:', { isSignedIn, isLoaded });
  }, [isSignedIn, isLoaded]);

  // Wait for Clerk to load before checking authentication state
  if (!isLoaded) {
    console.log('Clerk is loading...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isSignedIn) {
    console.log('...............redirecting to home................');
    return <Redirect href={'/(root)/(tabs)/home'} />;
  }

  console.log('...............redirecting to onboarding................');
  return <Redirect href="/(auth)/onboarding" />;
};

export default Home;
