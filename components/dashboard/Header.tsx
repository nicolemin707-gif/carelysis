import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { user } from "@/constants/data";
import { COLORS, FONT_FAMILY, FONT_WEIGHT } from "@/constants/theme";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        <Text style={styles.greeting}>Good morning, {user.name}</Text>
      </View>
      <TouchableOpacity>
        <MaterialIcons name="notifications" size={24} color={COLORS.textSlate900} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  greeting: {
    fontFamily: FONT_FAMILY.display,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.textSlate900,
  },
});

export default Header;
