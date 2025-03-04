import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";

const PlantDiseasePredictionForm = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (result.canceled || !result.assets.length) return;

    setSelectedFile(result.assets[0].name);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      alert("Please upload an image of the plant leaf.");
      return;
    }
    console.log("Submitting document for disease detection:", selectedFile);
  };

  return (
    <LinearGradient colors={["#1E3C72", "#2A5298"]} className="flex-1">
      <ScrollView className="flex-1 px-6 pt-10">
        {/* Header */}
        <Text className="text-4xl font-extrabold text-white text-center">
          🌱 Plant Disease Prediction
        </Text>
        <Text className="text-lg text-gray-200 text-center mt-2">
          Upload an image file to check for plant diseases.
        </Text>

        {/* Form Container */}
        <View className="bg-white/10 p-6 rounded-3xl shadow-lg backdrop-blur-lg mt-6 border border-white/20">
          {/* File Upload */}
          <View className="mb-6">
            <Text className="text-white text-lg mb-2">Upload Plant Image</Text>
            <TouchableOpacity
              onPress={pickDocument}
              className="bg-white/20 p-4 rounded-lg border border-white/30 shadow-md flex items-center justify-center"
            >
              <Text className="text-white text-lg">📄 Select File</Text>
            </TouchableOpacity>
          </View>

          {/* File Name Preview */}
          {selectedFile && (
            <View className="mb-6">
              <Text className="text-white text-lg mb-2">Selected File:</Text>
              <Text className="text-white bg-white/20 p-2 rounded-lg text-center">
                {selectedFile}
              </Text>
            </View>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-[#FF8C00] py-4 rounded-lg shadow-lg"
          >
            <Text className="text-white text-lg font-semibold text-center">
              🔍 Predict Disease
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default PlantDiseasePredictionForm;
