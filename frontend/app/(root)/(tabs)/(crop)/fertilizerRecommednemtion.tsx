import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import constants from "@/constants/data";
import axios from "axios";

const FertilizerRecommendationForm = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorous: "",
    potassium: "",
    crop: "",
  });
  const [result, setResult] = useState<string | null>(null); // Store the API response
  const [loading, setLoading] = useState(false); // Track loading state

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    setResult(null); // Reset result

    try {
      const response = await axios.post(
        `${constants.bass_url}/fertilizer-predict`,
        {
          nitrogen: Number.parseFloat(formData.nitrogen),
          phosphorous: Number.parseFloat(formData.phosphorous),
          potassium: Number.parseFloat(formData.potassium),
          cropname: formData.crop, // Ensure the key matches the API's expected input
        }
      );

      // Set the result from the API response
      if (response.data.success) {
        setResult(response.data.recommendation);
      } else {
        setResult("Failed to get a recommendation. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching fertilizer recommendation:", error);
      setResult("An error occurred. Please check your inputs and try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <LinearGradient colors={["#1E3C72", "#2A5298"]} className="flex-1">
      <ScrollView className="flex-1 px-6 pt-10">
        {/* Header */}
        <Text className="text-4xl font-extrabold text-white text-center">
          🌱 Fertilizer Recommendation
        </Text>
        <Text className="text-lg text-gray-200 text-center mt-2">
          Enter details to get the best fertilizer recommendation.
        </Text>

        {/* Form Container */}
        <View className="bg-white/10 p-6 mb-16 rounded-3xl shadow-lg backdrop-blur-lg mt-6 border border-white/20">
          {[
            { label: "Nitrogen (N)", key: "nitrogen" as const },
            { label: "Phosphorous (P)", key: "phosphorous" as const },
            { label: "Potassium (K)", key: "potassium" as const },
          ].map((field) => (
            <View key={field.key} className="mb-4">
              <Text className="text-white text-lg mb-1">{field.label}</Text>
              <TextInput
                className="bg-white/20 p-4 rounded-lg text-lg text-white border border-white/30 shadow-md"
                placeholder={`Enter ${field.label}`}
                placeholderTextColor="white"
                keyboardType="numeric"
                value={formData[field.key]}
                onChangeText={(value) => handleInputChange(field.key, value)}
              />
            </View>
          ))}

          {/* Crop Selection */}
          <View className="mb-6">
            <Text className="text-white text-lg mb-1">
              Crop You Want to Grow
            </Text>
            <View className="bg-white/20 rounded-lg border border-white/30 shadow-md">
              <Picker
                selectedValue={formData.crop}
                onValueChange={(value) => handleInputChange("crop", value)}
                style={{ color: "white" }}
              >
                <Picker.Item label="Select Crop" value="" />
                <Picker.Item label="mango" value="mango" />
                <Picker.Item label="rice" value="rice" />
                <Picker.Item label="orange" value="orange" />
                <Picker.Item label="apple" value="apple" />
              </Picker>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-[#FF8C00] py-4 rounded-lg shadow-lg"
            disabled={loading} // Disable button while loading
          >
            <Text className="text-white text-lg font-semibold text-center">
              {loading ? "🌾 Loading..." : "🌾 Get Recommendation"}
            </Text>
          </TouchableOpacity>

          {/* Display Result */}
          {result && (
            <View className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
              <Text className="text-white text-lg font-semibold mb-2">
                Recommendation:
              </Text>
              <Text className="text-white text-base">
                {result.replace(/<br\/?>/g, "\n")}{" "}
                {/* Replace <br> tags with newlines */}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default FertilizerRecommendationForm;
