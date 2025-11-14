import { View, Text, Button } from 'react-native';
import { auth } from '../../utils/firebase';
import { router } from 'expo-router';

export default function Home() {
  const handleSignOut = async () => {
    await auth.signOut();
    router.replace('/(auth)/sign-in');
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}
