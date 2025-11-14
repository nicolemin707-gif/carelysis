import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { COLORS, FONT_FAMILY } from "../constants/theme";

interface SecondaryButtonProps {
  onPress: () => void;
  label: string;
  style?: ViewStyle;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ onPress, label, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: "transparent",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.textSlate500,
    fontFamily: FONT_FAMILY.display,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SecondaryButton;
