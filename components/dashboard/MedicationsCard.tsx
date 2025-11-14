import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { medications } from "@/constants/data";
import {
  COLORS,
  FONT_FAMILY,
  FONT_WEIGHT,
  BORDER_RADIUS,
} from "@/constants/theme";

const MedicationsCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="pill" size={24} color={COLORS.primary} />
          <Text style={styles.title}>Medications & Supplements</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.medicationsList}>
        {medications.map((med, index) => (
          <View key={index} style={styles.medicationItem}>
            <View style={styles.medicationInfo}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={med.icon}
                  size={24}
                  color={COLORS.primary}
                />
              </View>
              <View>
                <Text style={styles.medicationName}>{med.name}</Text>
                <Text style={styles.medicationTime}>{med.time}</Text>
              </View>
            </View>
            <View style={styles.statusContainer}>
              <MaterialCommunityIcons
                name={
                  med.status === "Taken"
                    ? "check-circle"
                    : "hourglass-top"
                }
                size={16}
                color={
                  med.status === "Taken" ? COLORS.green : COLORS.orange
                }
              />
              <Text
                style={[
                  styles.medicationStatus,
                  {
                    color:
                      med.status === "Taken"
                        ? COLORS.green
                        : COLORS.orange,
                  },
                ]}
              >
                {med.status}
              </Text>
            </View>
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
    fontSize: 20,
    color: COLORS.textSlate900,
  },
  viewAll: {
    fontFamily: FONT_FAMILY.display,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  medicationsList: {
    marginTop: 16,
    gap: 12,
  },
  medicationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  medicationInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  medicationName: {
    fontFamily: FONT_FAMILY.display,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: 16,
    color: COLORS.textSlate900,
  },
  medicationTime: {
    fontFamily: FONT_FAMILY.display,
    fontWeight: FONT_WEIGHT.regular,
    fontSize: 14,
    color: COLORS.textSlate500,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  medicationStatus: {
    fontFamily: FONT_FAMILY.display,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: 14,
  },
});

export default MedicationsCard;
