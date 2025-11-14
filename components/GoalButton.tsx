import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS, FONT_FAMILY } from "../constants/theme";

interface GoalButtonProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const GoalButton: React.FC<GoalButtonProps> = ({ label, isSelected, onPress }) => {
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
    borderRadius: 999,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedButton: {
    backgroundColor: COLORS.bgBlue100,
    borderColor: COLORS.primary,
  },
  unselectedButton: {
    backgroundColor: "transparent",
    borderColor: COLORS.borderSlate300,
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

export default GoalButton;
