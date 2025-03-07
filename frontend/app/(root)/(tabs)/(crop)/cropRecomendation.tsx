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
import axios from "axios";
import constants from "@/constants/data";

// Define a mapping of states to their cities
const stateCityMap = {
  Maharashtra: ["Pune", "Mumbai", "Nagpur", "Nashik"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior"],
};

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

  const [cities, setCities] = useState<string[]>([]); // Store cities based on selected state
  const [prediction, setPrediction] = useState<string | null>(null); // Store the API response
  const [loading, setLoading] = useState(false); // Track loading state

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Update cities when the state changes
    if (key === "state") {
      setCities(stateCityMap[value as keyof typeof stateCityMap] || []);
      setFormData((prev) => ({ ...prev, city: "" })); // Reset city when state changes
    }
  };

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    setPrediction(null); // Reset prediction

    try {
      const response = await axios.post(`${constants.bass_url}/crop-predict`, {
        nitrogen: Number.parseFloat(formData.nitrogen),
        phosphorous: Number.parseFloat(formData.phosphorous),
        potassium: Number.parseFloat(formData.potassium),
        ph: Number.parseFloat(formData.pH), // Ensure the key matches the API's expected input
        rainfall: Number.parseFloat(formData.rainfall),
        city: formData.city,
      });

      // Set the prediction from the API response
      if (response.data.success) {
        setPrediction(response.data.prediction);
      } else {
        setPrediction("Failed to get a prediction. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching crop prediction:", error);
      setPrediction(
        "An error occurred. Please check your inputs and try again."
      );
    } finally {
      setLoading(false); // Stop loading
    }
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
                <Picker.Item label="Maharashtra" value="Maharashtra" />
                <Picker.Item label="Madhya Pradesh" value="Madhya Pradesh" />
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
                enabled={!!formData.state} // Disable city picker until a state is selected
              >
                <Picker.Item label="Select City" value="" />
                {cities.map((city) => (
                  <Picker.Item key={city} label={city} value={city} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-[#FF8C00] py-4 rounded-lg shadow-lg"
            disabled={loading || !formData.state || !formData.city} // Disable if no state or city is selected
          >
            <Text className="text-white text-lg font-semibold text-center">
              {loading ? "🚜 Predicting..." : "🚜 Predict Crop"}
            </Text>
          </TouchableOpacity>

          {/* Display Prediction */}
          {prediction && (
            <View className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
              <Text className="text-white text-lg font-semibold mb-2">
                Recommended Crop:
              </Text>
              <Text className="text-white text-base capitalize">
                {prediction}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default CropPredictionForm;
