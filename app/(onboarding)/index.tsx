import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { router } from "expo-router";
import PrimaryButton from "../../components/PrimaryButton";
import { COLORS } from "../../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";

const WelcomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <MaterialIcons name="health-and-safety" size={60} color={COLORS.primary} />
        <Text style={styles.title}>Welcome to Your Personal Health Companion</Text>
        <Text style={styles.subtitle}>
          Let's set up your profile to personalize your health journey. It'll only take a couple of minutes.
        </Text>
      </View>
      <View style={styles.footer}>
        <PrimaryButton label="Get Started" onPress={() => router.push("/step1")} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    padding: 16,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.textSlate900,
    marginTop: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSlate600,
    marginTop: 12,
    textAlign: "center",
  },
  footer: {
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
