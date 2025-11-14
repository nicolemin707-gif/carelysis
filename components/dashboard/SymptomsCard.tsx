import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { symptoms } from "@/constants/data";
import {
  COLORS,
  FONT_FAMILY,
  FONT_WEIGHT,
  BORDER_RADIUS,
} from "@/constants/theme";

const SymptomsCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="emoticon-sad-outline" size={24} color={COLORS.primary} />
          <Text style={styles.title}>Symptoms</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.symptomCount}>
        {symptoms.length} symptoms logged today.
      </Text>
      <View style={styles.symptomsContainer}>
        {symptoms.map((symptom, index) => (
          <View key={index} style={styles.symptomChip}>
            <MaterialCommunityIcons
              name={symptom.icon}
              size={16}
              color={COLORS.textSlate800}
            />
            <Text style={styles.symptomName}>{symptom.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: BORDER_RADIUS.lg,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontFamily: FONT_FAMILY.display,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: 22,
    color: COLORS.textSlate900,
  },
  viewAll: {
    fontFamily: FONT_FAMILY.display,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  symptomCount: {
    fontFamily: FONT_FAMILY.display,
    fontWeight: FONT_WEIGHT.regular,
    fontSize: 16,
    color: COLORS.textSlate500,
    marginTop: 8,
  },
  symptomsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },
  symptomChip: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.full,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  symptomName: {
    fontFamily: FONT_FAMILY.display,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: 14,
    color: COLORS.textSlate800,
  },
});

export default SymptomsCard;
