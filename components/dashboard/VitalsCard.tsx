import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { vitals } from "@/constants/data";
import {
  COLORS,
  FONT_FAMILY,
  FONT_WEIGHT,
  BORDER_RADIUS,
} from "@/constants/theme";

const VitalsCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="monitor-heart" size={24} color={COLORS.primary} />
          <Text style={styles.title}>Vitals</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.vitalsGrid}>
        {vitals.map((vital, index) => (
          <View
            key={index}
            style={[
              styles.vitalCard,
              vital.label === "Blood Pressure" && styles.fullWidthCard,
            ]}
          >
            <Text style={styles.vitalLabel}>{vital.label}</Text>
            <Text style={styles.vitalValue}>{vital.value}</Text>
            {vital.change && (
              <View style={styles.vitalChangeContainer}>
                <MaterialIcons
                  name={
                    vital.changeType === "positive"
                      ? "arrow-upward"
                      : "arrow-downward"
                  }
                  size={18}
                  color={
                    vital.changeType === "positive" ? COLORS.green : COLORS.red
                  }
                />
                <Text
                  style={[
                    styles.vitalChange,
                    {
                      color:
                        vital.changeType === "positive"
                          ? COLORS.green
                          : COLORS.red,
                    },
                  ]}
                >
                  {vital.change.replace("+", "").replace("-", "")}
                </Text>
              </View>
            )}
            {vital.unit && (
              <Text style={styles.vitalUnit}>{vital.unit}</Text>
            )}
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
  vitalsGrid: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  vitalCard: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: BORDER_RADIUS.lg,
    flex: 1,
    minWidth: "45%",
  },
  fullWidthCard: {
    minWidth: "100%",
  },
  vitalLabel: {
    fontFamily: FONT_FAMILY.display,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: 16,
    color: COLORS.textSlate500,
  },
  vitalValue: {
    fontFamily: FONT_FAMILY.display,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: 24,
    color: COLORS.textSlate900,
    marginTop: 4,
  },
  vitalChangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  vitalChange: {
    fontFamily: FONT_FAMILY.display,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: 16,
  },
  vitalUnit: {
    fontFamily: FONT_FAMILY.display,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: 16,
    color: COLORS.textSlate500,
    marginTop: 4,
  },
});

export default VitalsCard;
