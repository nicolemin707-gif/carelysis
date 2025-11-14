import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { COLORS, FONT_FAMILY } from "../constants/theme";

interface UnitToggleProps {
  units: string[];
  selectedUnit: string;
  onSelectUnit: (unit: string) => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ units, selectedUnit, onSelectUnit }) => {
  return (
    <View style={styles.container}>
      {units.map((unit) => (
        <TouchableOpacity
          key={unit}
          style={[styles.button, selectedUnit === unit && styles.selectedButton]}
          onPress={() => onSelectUnit(unit)}
        >
          <Text style={[styles.buttonText, selectedUnit === unit && styles.selectedButtonText]}>{unit}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLORS.bgSlate100,
    borderRadius: 999,
    padding: 4,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  selectedButton: {
    backgroundColor: COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  buttonText: {
    color: COLORS.textSlate500,
    fontFamily: FONT_FAMILY.display,
    fontSize: 14,
  },
  selectedButtonText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});

export default UnitToggle;
