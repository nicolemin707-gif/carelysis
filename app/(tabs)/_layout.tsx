import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
