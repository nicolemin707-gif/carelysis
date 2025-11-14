import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { router } from "expo-router";
import { useOnboarding } from "../../context/OnboardingContext";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import GoalButton from "../../components/GoalButton";
import { COLORS, FONT_FAMILY } from "../../constants/theme";

const goals = [
  "Weight Loss",
  "Better Sleep",
  "Manage Stress",
  "Improve Fitness",
  "Eat Healthier",
  "Track a Condition",
];

const Step3Screen = () => {
  const { state, dispatch } = useOnboarding();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressStep, styles.activeStep]} />
          <View style={[styles.progressStep, styles.activeStep]} />
          <View style={[styles.progressStep, styles.activeStep]} />
          <View style={styles.progressStep} />
        </View>
        <Text style={styles.stepText}>Step 3 of 4</Text>
        <Text style={styles.title}>What are your health goals?</Text>
        <Text style={styles.subtitle}>
          Select one or more. This will help us tailor your experience.
        </Text>
        <View style={styles.goalsContainer}>
          {goals.map((goal) => (
            <GoalButton
              key={goal}
              label={goal}
              isSelected={state.goals.includes(goal)}
              onPress={() => dispatch({ type: "TOGGLE_GOAL", payload: goal })}
            />
          ))}
        </View>
      </View>
      <View style={styles.footer}>
        <PrimaryButton label="Continue" onPress={() => router.push("/step4")} />
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
      goalsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
      },
      footer: {
        paddingVertical: 20,
        gap: 12,
      },
});

export default Step3Screen;
