import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { COLORS, FONT_FAMILY } from "../constants/theme";

interface PrimaryButtonProps {
  onPress: () => void;
  label: string;
  style?: ViewStyle;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ onPress, label, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONT_FAMILY.display,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PrimaryButton;
