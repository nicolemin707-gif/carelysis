import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { insight } from "@/constants/data";
import {
  COLORS,
  FONT_FAMILY,
  FONT_WEIGHT,
  BORDER_RADIUS,
} from "@/constants/theme";

const InsightCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="auto-awesome" size={24} color={COLORS.primary} />
        <Text style={styles.title}>{insight.title}</Text>
      </View>
      <Text style={styles.message}>{insight.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryLight,
    padding: 16,
    borderRadius: BORDER_RADIUS.lg,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontFamily: FONT_FAMILY.display,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: 18,
    color: COLORS.textSlate900,
  },
  message: {
    marginTop: 8,
    fontFamily: FONT_FAMILY.display,
    fontWeight: FONT_WEIGHT.regular,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textSlate800,
  },
});

export default InsightCard;
