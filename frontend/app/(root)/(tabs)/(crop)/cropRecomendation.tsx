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

const CropPredictionForm = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorous: "",
    potassium: "",
    pH: "",
    rainfall: "",
    state: "",
    city: "",
  });

  // Fix: Define the key as keyof formData to ensure type safety
  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  return (
    <LinearGradient colors={["#1E3C72", "#2A5298"]} className="flex-1">
      <ScrollView className="flex-1 px-6 pt-10">
        {/* Header */}
        <Text className="text-4xl font-extrabold text-white text-center">
          🌾 Crop Predictor
        </Text>
        <Text className="text-lg text-gray-200 text-center mt-2">
          Enter details to get the best crop recommendation.
        </Text>

        {/* Form Container */}
        <View className="bg-white/10 p-6 mb-16 rounded-3xl shadow-lg backdrop-blur-lg mt-6 border border-white/20">
          {[
            { label: "Nitrogen", key: "nitrogen" as const },
            { label: "Phosphorous", key: "phosphorous" as const },
            { label: "Potassium", key: "potassium" as const },
            { label: "pH Level", key: "pH" as const },
            { label: "Rainfall (mm)", key: "rainfall" as const },
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

          {/* State Picker */}
          <View className="mb-4">
            <Text className="text-white text-lg mb-1">State</Text>
            <View className="bg-white/20 rounded-lg border border-white/30 shadow-md">
              <Picker
                selectedValue={formData.state}
                onValueChange={(value) => handleInputChange("state", value)}
                style={{ color: "white" }}
              >
                <Picker.Item label="Select State" value="" />
                <Picker.Item label="State 1" value="state1" />
                <Picker.Item label="State 2" value="state2" />
              </Picker>
            </View>
          </View>

          {/* City Picker */}
          <View className="mb-6">
            <Text className="text-white text-lg mb-1">City</Text>
            <View className="bg-white/20 rounded-lg border border-white/30 shadow-md">
              <Picker
                selectedValue={formData.city}
                onValueChange={(value) => handleInputChange("city", value)}
                style={{ color: "white" }}
              >
                <Picker.Item label="Select City" value="" />
                <Picker.Item label="City 1" value="city1" />
                <Picker.Item label="City 2" value="city2" />
              </Picker>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-[#FF8C00] py-4 rounded-lg shadow-lg"
          >
            <Text className="text-white text-lg font-semibold text-center">
              🚜 Predict Crop
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default CropPredictionForm;
