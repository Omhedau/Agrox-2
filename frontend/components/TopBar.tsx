import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useUserStore from "@/store/userStore";
import constants from "@/constants/images";

const TopBar = () => {
  const router = useRouter();

  const { user, isDarkMode, toggleDarkMode } = useUserStore() as {
    user: { name: string; profileImage?: string };
    isDarkMode: boolean;
    toggleDarkMode: () => void;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  if (!user) return null;

  return (
    <View style={styles.topBarContainer}>
      {/* Logo and Title */}
      <View style={styles.logoTitleContainer}>
        <View style={styles.logoContainer}>
          <Image source={constants.logo} style={styles.logo} />
        </View>
        <Text style={styles.title}>FarmEase</Text>
      </View>

      {/* Notification and Profile */}
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => console.log("Notification")}
        >
          <Ionicons
            name="notifications-outline"
            size={26}
            color={isDarkMode ? "#fff" : "#1f2937"}
          />
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity
          onPress={() => router.push("/(root)/profile")}
          style={styles.profileButton}
        >
          {user?.profileImage ? (
            <Image
              source={{ uri: user.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <Text style={styles.profileText}>{getInitials(user.name)}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBarContainer: {
    backgroundColor: "#E3F2FD", // Faint blue background
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#BBDEFB", // Subtle divider line at the bottom
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 4,
  },
  logoTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10, // Space between logo and title
  },
  logoContainer: {
    backgroundColor: "#fff", // White background for the logo container
    borderRadius: 25,
    padding: 6,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  logo: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F2937", // Dark gray for better readability
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16, // Space between icons
  },
  iconButton: {
    padding: 8,
  },
  profileButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BBDEFB", // Matching border color with the theme
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  profileText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4F83CC", // Matching profile initials with theme
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default TopBar;
