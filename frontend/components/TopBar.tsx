import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useUserStore from "@/store/userStore";

const TopBar = () => {
  const router = useRouter();
  
  const { user, isDarkMode, toggleDarkMode } = useUserStore() as {
      user: { name: string, [key: string]: any };
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
    <View className="flex-row justify-between items-center px-4 py-3 bg-white">
      {/* Menu Button */}
      <TouchableOpacity className="p-2">
        <Ionicons name="menu" size={24} color="#1f2937" />
      </TouchableOpacity>

      {/* Notification and Dark Mode Toggle */}
      <View className="flex-row items-center space-x-4">
        <TouchableOpacity className="p-2" onPress={() => console.log("Notification")}>
          <Ionicons name="notifications-outline" size={26} color="#1f2937" />
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity
          onPress={() => router.push("/(root)/profile")}
          className="w-9 h-9 bg-indigo-300 p-2 rounded-full justify-center items-center shadow-md ml-3"
        >
          <Text className="text-indigo-800 font-semibold text-xs">
            {getInitials(user.name)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;
