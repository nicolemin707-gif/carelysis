import { Text, View, Button } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome to your Health Companion!</Text>
      <Button title="Go to My Vitals" onPress={() => router.push('/vitals')} />
    </View>
  );
}
