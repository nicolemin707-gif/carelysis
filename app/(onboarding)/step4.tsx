import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { router } from "expo-router";
import { useOnboarding } from "../../context/OnboardingContext";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import { COLORS, FONT_FAMILY } from "../../constants/theme";

const Step4Screen = () => {
  const { state } = useOnboarding();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressStep, styles.activeStep]} />
          <View style={[styles.progressStep, styles.activeStep]} />
          <View style={[styles.progressStep, styles.activeStep]} />
          <View style={[styles.progressStep, styles.activeStep]} />
        </View>
        <Text style={styles.stepText}>Step 4 of 4</Text>
        <Text style={styles.title}>Ready to go?</Text>
        <Text style={styles.subtitle}>
          Please review your information below before we create your personalized health plan.
        </Text>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Full Name</Text>
            <Text style={styles.summaryValue}>{state.fullName}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date of Birth</Text>
            <Text style={styles.summaryValue}>{state.dateOfBirth}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Metrics</Text>
            <Text style={styles.summaryValue}>{`${state.height}cm / ${state.weight}kg`}</Text>
          </View>
          <View>
            <Text style={styles.summaryLabel}>Health Goals</Text>
            <View style={styles.goalsWrapper}>
              {state.goals.map((goal) => (
                <View key={goal} style={styles.goalChip}>
                  <Text style={styles.goalChipText}>{goal}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <PrimaryButton label="Confirm & Finish Setup" onPress={() => router.replace("/(tabs)")} />
        <SecondaryButton label="Edit Information" onPress={() => router.replace("/step1")} />
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
      summaryContainer: {
        backgroundColor: COLORS.bgSlate50,
        borderRadius: 12,
        padding: 24,
        gap: 16,
      },
      summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      summaryLabel: {
        fontFamily: FONT_FAMILY.display,
        fontSize: 16,
        color: COLORS.textSlate500,
      },
      summaryValue: {
        fontFamily: FONT_FAMILY.display,
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.textSlate800,
      },
      goalsWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 8,
      },
      goalChip: {
        backgroundColor: COLORS.bgBlue100,
        borderRadius: 999,
        paddingVertical: 6,
        paddingHorizontal: 12,
      },
      goalChipText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "500",
      },
      footer: {
        paddingVertical: 20,
        gap: 12,
      },
});

export default Step4Screen;
