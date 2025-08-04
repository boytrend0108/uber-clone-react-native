import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right', // This creates a slide effect from right to left
        gestureEnabled: true, // Enables swipe back gesture
        gestureDirection: 'horizontal', // Direction of the swipe gesture
      }}
    >
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
}
