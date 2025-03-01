import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Ecom = () => {
  return (
    <View className="flex-1 items-center justify-center bg-blue-50 px-6">
      {/* Shower Icon */}
      <Ionicons name="rainy-outline" size={80} color="#4f46e5" className="mb-6" />

      {/* "Coming Soon" Text */}
      <Text className="text-3xl font-bold text-blue-900 mb-4 text-center">
        Coming Soon 
      </Text>

      {/* Subtext */}
      <Text className="text-base text-gray-600 text-center leading-6">
        Something amazing is in the works. Stay tuned!
      </Text>
    </View>
  );
};

export default Ecom;
