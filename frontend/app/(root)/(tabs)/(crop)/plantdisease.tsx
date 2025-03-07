import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import constants from "@/constants/data";

const PlantDiseasePredictionForm = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileUri, setFileUri] = useState<string | null>(null); // Store the file URI
  const [prediction, setPrediction] = useState<string | null>(null); // Store the API response
  const [loading, setLoading] = useState(false); // Track loading state

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (result.canceled || !result.assets.length) return;

    setSelectedFile(result.assets[0].name);
    setFileUri(result.assets[0].uri); // Store the file URI
  };

  const handleSubmit = async () => {
    if (!fileUri) {
      alert("Please upload an image of the plant leaf.");
      return;
    }

    setLoading(true); // Start loading
    setPrediction(null); // Reset prediction

    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append("file", {
        uri: fileUri,
        name: selectedFile,
        type: "image/jpeg", // Adjust the type based on the file
      } as any);

      // Make the API call
      const response = await axios.post(
        `${constants.bass_url}/disease-predict`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Set the prediction from the API response
      if (response.data.success) {
        setPrediction(response.data.prediction);
      } else {
        setPrediction("Failed to get a prediction. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching disease prediction:", error);
      setPrediction("An error occurred. Please check your file and try again.");
    } finally {
      setLoading(false); // Stop loading
    }
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
            disabled={loading || !selectedFile} // Disable if no file is selected
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-lg font-semibold text-center">
                🔍 Predict Disease
              </Text>
            )}
          </TouchableOpacity>

          {/* Display Prediction */}
          {prediction && (
            <View className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
              <Text className="text-white text-lg font-semibold mb-2">
                Prediction:
              </Text>
              <Text className="text-white text-base">
                {prediction
                  .replace(/<b>/g, "") // Remove <b> tags
                  .replace(/<\/b>/g, "") // Remove </b> tags
                  .replace(/<br\/?>/g, "\n")}{" "}
                {/* Replace <br> tags with newlines */}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default PlantDiseasePredictionForm;
