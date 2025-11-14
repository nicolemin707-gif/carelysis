import React from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { router } from "expo-router";
import { useOnboarding } from "../../context/OnboardingContext";
import PrimaryButton from "../../components/PrimaryButton";
import GenderButton from "../../components/GenderButton";
import { COLORS, FONT_FAMILY } from "../../constants/theme";

const Step1Screen = () => {
  const { state, dispatch } = useOnboarding();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressStep, styles.activeStep]} />
          <View style={styles.progressStep} />
          <View style={styles.progressStep} />
          <View style={styles.progressStep} />
        </View>
        <Text style={styles.stepText}>Step 1 of 4</Text>
        <Text style={styles.title}>Tell us about yourself</Text>
        <Text style={styles.subtitle}>
          This information helps us create a personalized experience just for you.
        </Text>
        <View style={styles.form}>
          <View>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Jane Doe"
              value={state.fullName}
              onChangeText={(text) => dispatch({ type: "SET_FULL_NAME", payload: text })}
            />
          </View>
          <View>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={state.dateOfBirth}
              onChangeText={(text) => dispatch({ type: "SET_DATE_OF_BIRTH", payload: text })}
            />
          </View>
          <View>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderContainer}>
              <GenderButton
                label="Female"
                isSelected={state.gender === "Female"}
                onPress={() => dispatch({ type: "SET_GENDER", payload: "Female" })}
              />
              <GenderButton
                label="Male"
                isSelected={state.gender === "Male"}
                onPress={() => dispatch({ type: "SET_GENDER", payload: "Male" })}
              />
              <GenderButton
                label="Other"
                isSelected={state.gender === "Other"}
                onPress={() => dispatch({ type: "SET_GENDER", payload: "Other" })}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <PrimaryButton label="Continue" onPress={() => router.push("/step2")} />
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
  label: {
    fontFamily: FONT_FAMILY.display,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.textSlate700,
    marginBottom: 8,
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
  genderContainer: {
    flexDirection: "row",
    gap: 12,
  },
  footer: {
    paddingVertical: 20,
  },
});

export default Step1Screen;
