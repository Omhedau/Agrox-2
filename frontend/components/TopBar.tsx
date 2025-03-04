import React from "react";
import { View, Text, TouchableOpacity,Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useUserStore from "@/store/userStore";
import constants from "@/constants/images";
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
    <View style={{backgroundColor: "#e6e6fa"}} className="flex-row justify-between items-center px-4 py-3">
      {/* Menu Button */}
      <View className="p-2 rounded-full shadow shadow-black bg-indigo-300">
        <Image source={constants.logo} style={{ width: 30, height: 30 }} />
      </View>

      <View className="flex-1 items-center">
        <Text className="text-2xl font-rubik-bold shadow shadow-amber-300 text-gray-800 font-bold">
          FarmEase
        </Text>
      </View>

      {/* Notification and Dark Mode Toggle */}
      <View className="flex-row items-center space-x-4">
        <TouchableOpacity className="p-2" onPress={() => console.log("Notification")}>
          <Ionicons name="notifications-outline" size={26} color="#1f2937" />
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity
          onPress={() => router.push("/(root)/profile")}
          className="w-10 h-10 bg-indigo-300 p-2 rounded-full justify-center items-center shadow-md ml-3"
        >
          <Text className="text-indigo-800 font-bold text-md">
            {getInitials(user.name)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;
