import { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { auth } from '../utils/firebase';
import { router } from 'expo-router';

export default function RootLayout() {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace('/(tabs)/home');
      } else {
        router.replace('/(auth)/sign-in');
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
