import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

// Define the structure for the form data
interface FormData {
  nitrogen: string;
  phosphorous: string;
  potassium: string;
  temperature: string;
  humidity: string;
  pH: string;
  rainfall: string;
}

const CropPredictionForm = () => {
  const [formData, setFormData] = useState<FormData>({
    nitrogen: "",
    phosphorous: "",
    potassium: "",
    temperature: "",
    humidity: "",
    pH: "",
    rainfall: "",
  });

  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle input changes
  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Check for missing fields
    if (Object.values(formData).some((value) => value === "")) {
      setPrediction("Please fill in all the fields.");
      return;
    }

    setLoading(true);
    setPrediction(null);

    try {
      // Make a POST request to the backend API
      const response = await axios.post(
        "https://cropapi-kn6k.onrender.com/crop-predict",
        {
          nitrogen: parseFloat(formData.nitrogen),
          phosphorous: parseFloat(formData.phosphorous),
          potassium: parseFloat(formData.potassium),
          temperature: parseFloat(formData.temperature),
          humidity: parseFloat(formData.humidity),
          ph: parseFloat(formData.pH),
          rainfall: parseFloat(formData.rainfall),
        }
      );

      if (response.data.success) {
        setPrediction(response.data.prediction);
      } else {
        setPrediction("Failed to get a prediction. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching crop prediction:", error);
      setPrediction("An error occurred. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#1E3C72", "#2A5298"]} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: 16, paddingTop: 40 }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          🌾 Crop Predictor
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "gray",
            textAlign: "center",
            marginTop: 8,
          }}
        >
          Enter details to get the best crop recommendation.
        </Text>

        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: 20,
            marginTop: 20,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 6,
          }}
        >
          {[
            { label: "Nitrogen", key: "nitrogen" },
            { label: "Phosphorous", key: "phosphorous" },
            { label: "Potassium", key: "potassium" },
            { label: "Temperature (°C)", key: "temperature" },
            { label: "Humidity (%)", key: "humidity" },
            { label: "pH Level", key: "pH" },
            { label: "Rainfall (mm)", key: "rainfall" },
          ].map((field) => (
            <View key={field.key} style={{ marginBottom: 20 }}>
              <Text style={{ color: "white", fontSize: 18, marginBottom: 8 }}>
                {field.label}
              </Text>
              <TextInput
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  padding: 12,
                  borderRadius: 10,
                  color: "white",
                  fontSize: 16,
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  borderWidth: 1,
                }}
                placeholder={`Enter ${field.label}`}
                placeholderTextColor="white"
                keyboardType="numeric"
                value={formData[field.key as keyof FormData]}
                onChangeText={(value: string) =>
                  handleInputChange(field.key as keyof FormData, value)
                }
              />
            </View>
          ))}

          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: "#FF8C00",
              paddingVertical: 12,
              borderRadius: 10,
              alignItems: "center",
              marginTop: 20,
            }}
            disabled={loading}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              {loading ? "🚜 Predicting..." : "🚜 Predict Crop"}
            </Text>
          </TouchableOpacity>

          {loading && (
            <ActivityIndicator
              size="large"
              color="#FF8C00"
              style={{ marginTop: 20 }}
            />
          )}

          {prediction && (
            <View
              style={{
                marginTop: 20,
                padding: 16,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 10,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                Recommended Crop:
              </Text>
              <Text style={{ color: "white", fontSize: 16, marginTop: 8 }}>
                {prediction}
              </Text>
            </View>
          )}
        </View>
        {/* Add space at the bottom */}
        <View className="h-20" />
      </ScrollView>
    </LinearGradient>
  );
};

export default CropPredictionForm;