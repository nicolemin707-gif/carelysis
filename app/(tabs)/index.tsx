import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Header from "@/components/dashboard/Header";
import InsightCard from "@/components/dashboard/InsightCard";
import VitalsCard from "@/components/dashboard/VitalsCard";
import SymptomsCard from "@/components/dashboard/SymptomsCard";
import MedicationsCard from "@/components/dashboard/MedicationsCard";
import FloatingActionButton from "@/components/dashboard/FloatingActionButton";
import { COLORS, FONT_FAMILY, FONT_WEIGHT } from "@/constants/theme";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Header />
        <Text style={styles.date}>Tuesday, October 26</Text>
        <InsightCard />
        <View style={styles.cardsContainer}>
          <VitalsCard />
          <SymptomsCard />
          <MedicationsCard />
        </View>
      </ScrollView>
      <FloatingActionButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 100, // To avoid being hidden by the tab bar and FAB
  },
  date: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    fontFamily: FONT_FAMILY.display,
    fontWeight: FONT_WEIGHT.regular,
    fontSize: 16,
    color: COLORS.textSlate500,
  },
  cardsContainer: {
    gap: 20,
    marginTop: 20,
  },
});
