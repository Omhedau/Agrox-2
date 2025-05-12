import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const CropRecommendation = () => {
  return (
    <View className="flex-1 items-center justify-center bg-blue-50 px-6">
      {/* Header with Animated Plant Icon */}
      <Ionicons
        name="leaf"
        size={72}
        color="#2E7D32"
        style={{ marginBottom: 16 }}
      />

      {/* Main Text */}
      <Text className="text-3xl font-bold text-gray-900 mt-2 text-center">
        Smart Crop Advisor
      </Text>
      <Text className="text-lg text-gray-600 text-center leading-6 mt-3 mb-6">
        AI-powered recommendations for healthier crops and better yields
      </Text>

      {/* Action Button */}
      <View className="w-full mt-4">
        <TouchableOpacity
          onPress={() => router.push("/(root)/(tabs)/(recommendation)/cropRecomendation")}
          className="bg-green-600 p-4 py-4 rounded-xl w-full shadow-md flex-row items-center justify-center space-x-2"
          activeOpacity={0.8}
        >
          <Ionicons name="analytics" size={24} color="white" />
          <Text className="text-white text-lg font-semibold text-center">
            Get Crop Recommendation
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CropRecommendation;
