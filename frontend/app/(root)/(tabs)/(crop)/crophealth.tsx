import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const CropHealth = () => {
  return (
    <View className="flex-1 items-center justify-center bg-blue-50 px-6">
      {/* Header with Icon */}
      <Ionicons name="leaf-outline" size={64} color="#4F46E5" />

      {/* Main Text */}
      <Text className="text-2xl font-bold text-gray-900 mt-4">
        Crop Health Services
      </Text>
      <Text className="text-lg text-gray-600 text-center leading-6 mt-2">
        Get expert recommendations for crops, fertilizers, and disease prevention.
      </Text>

      {/* Emoji for Visual Appeal */}
      <Text className="text-5xl mt-4">🌿🚜</Text>

      {/* Action Buttons */}
      <View className="w-full  mt-6 space-y-4">
        <TouchableOpacity
          onPress={() => router.push("/(root)/(tabs)/(crop)/cropRecomendation")}
          className="bg-indigo-600 mt-2 p-4  py-4 rounded-xl w-full shadow-md"
        >
          <Text className="text-white text-lg font-semibold text-center">
            🌱 Crop Recommendation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(root)/(tabs)/(crop)/fertilizerRecommednemtion")}
          className="bg-indigo-500 py-4  mt-2 rounded-xl w-full shadow-md"
        >
          <Text className="text-white text-lg  font-semibold text-center">
            🌾 Fertilizer Recommendation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(root)/(tabs)/(crop)/plantdisease")}
          className="bg-indigo-400 py-4 mt-2 rounded-xl w-full shadow-md"
        >
          <Text className="text-white text-lg font-semibold text-center">
            🦠 Plant Disease Prediction
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CropHealth;
