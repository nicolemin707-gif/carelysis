import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS, FONT_FAMILY } from "../constants/theme";

interface GenderButtonProps {
  label: "Female" | "Male" | "Other";
  isSelected: boolean;
  onPress: () => void;
}

const GenderButton: React.FC<GenderButtonProps> = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected ? styles.selectedButton : styles.unselectedButton]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, isSelected ? styles.selectedButtonText : styles.unselectedButtonText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  selectedButton: {
    backgroundColor: COLORS.bgBlue100,
  },
  unselectedButton: {
    backgroundColor: COLORS.bgSlate100,
  },
  buttonText: {
    fontFamily: FONT_FAMILY.display,
    fontSize: 16,
  },
  selectedButtonText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  unselectedButtonText: {
    color: COLORS.textSlate700,
    fontWeight: "500",
  },
});

export default GenderButton;
