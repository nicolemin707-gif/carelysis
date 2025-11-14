import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView, Linking } from "react-native";
import { router } from "expo-router";
import { useOnboarding } from "../../context/OnboardingContext";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import UnitToggle from "../../components/UnitToggle";
import { COLORS, FONT_FAMILY } from "../../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";

const Step2Screen = () => {
  const { state, dispatch } = useOnboarding();
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressStep, styles.activeStep]} />
          <View style={[styles.progressStep, styles.activeStep]} />
          <View style={styles.progressStep} />
          <View style={styles.progressStep} />
        </View>
        <Text style={styles.stepText}>Step 2 of 4</Text>
        <Text style={styles.title}>Your Physical Metrics</Text>
        <Text style={styles.subtitle}>
          This helps us calculate things like your BMI and calorie needs.
        </Text>
        <View style={styles.form}>
          <View>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Height</Text>
              <UnitToggle
                units={["cm", "ft/in"]}
                selectedUnit={heightUnit}
                onSelectUnit={setHeightUnit}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="175"
              keyboardType="numeric"
              value={state.height}
              onChangeText={(text) => dispatch({ type: "SET_HEIGHT", payload: text })}
            />
          </View>
          <View>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Weight</Text>
              <UnitToggle
                units={["kg", "lbs"]}
                selectedUnit={weightUnit}
                onSelectUnit={setWeightUnit}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="70"
              keyboardType="numeric"
              value={state.weight}
              onChangeText={(text) => dispatch({ type: "SET_WEIGHT", payload: text })}
            />
          </View>
          <View style={styles.infoBox}>
            <MaterialIcons name="info" size={20} color={COLORS.textSlate500} />
            <Text style={styles.infoText}>
              Your data is encrypted and stored securely. We respect your privacy.{" "}
              <Text style={styles.link} onPress={() => Linking.openURL("https://example.com")}>
                Learn more
              </Text>
              .
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <PrimaryButton label="Continue" onPress={() => router.push("/step3")} />
        <SecondaryButton label="Back" onPress={() => router.back()} />
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
      },
      progressContainer: {
        flexDirection: "row",
        gap: 8,
        marginVertical: 20,
      },
      progressStep: {
        flex: 1,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.bgBlue100,
      },
      activeStep: {
        backgroundColor: COLORS.primary,
      },
      stepText: {
        textAlign: "center",
        color: COLORS.primary,
        fontWeight: "600",
        marginBottom: 24,
      },
      title: {
        fontFamily: FONT_FAMILY.display,
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.textSlate900,
      },
      subtitle: {
        fontFamily: FONT_FAMILY.display,
        fontSize: 16,
        color: COLORS.textSlate600,
        marginTop: 8,
        marginBottom: 32,
      },
      form: {
        gap: 24,
      },
      labelContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
      },
      label: {
        fontFamily: FONT_FAMILY.display,
        fontSize: 14,
        fontWeight: "500",
        color: COLORS.textSlate700,
      },
      input: {
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.borderSlate300,
        backgroundColor: COLORS.bgSlate50,
        paddingHorizontal: 16,
        fontSize: 16,
        color: COLORS.textSlate900,
      },
      infoBox: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 8,
        paddingTop: 8,
      },
      infoText: {
        flex: 1,
        fontFamily: FONT_FAMILY.display,
        fontSize: 12,
        color: COLORS.textSlate500,
      },
      link: {
        color: COLORS.primary,
        fontWeight: "600",
        textDecorationLine: "underline",
      },
      footer: {
        paddingVertical: 20,
        gap: 12,
      },
});

export default Step2Screen;
