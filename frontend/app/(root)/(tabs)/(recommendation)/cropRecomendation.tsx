import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

interface FormData {
  nitrogen: string;
  phosphorous: string;
  potassium: string;
  temperature: string;
  humidity: string;
  pH: string;
  rainfall: string;
}

const CropPredictionForm: React.FC = () => {
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

  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (Object.values(formData).some((value) => value === "")) {
      setPrediction("Please fill in all fields");
      return;
    }

    setLoading(true);
    setPrediction(null);

    try {
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
        setPrediction("Prediction failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setPrediction("An error occurred. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#f5f7fa", "#c3cfe2"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            padding: 24,
            paddingTop: 48,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ alignItems: "center", marginBottom: 32 }}>
            <Ionicons name="leaf" size={48} color="#4CAF50" />
            <Text style={styles.title}>Crop Recommendation</Text>
            <Text style={styles.subtitle}>
              Enter your soil and weather conditions to get the best crop
              suggestion
            </Text>
          </View>

          <View style={styles.formContainer}>
            {(
              [
                { label: "Nitrogen (N)", key: "nitrogen", icon: "flask" },
                { label: "Phosphorous (P)", key: "phosphorous", icon: "flask" },
                { label: "Potassium (K)", key: "potassium", icon: "flask" },
                {
                  label: "Temperature (°C)",
                  key: "temperature",
                  icon: "thermometer",
                },
                { label: "Humidity (%)", key: "humidity", icon: "water" },
                { label: "pH Level", key: "pH", icon: "speedometer" },
                { label: "Rainfall (mm)", key: "rainfall", icon: "rainy" },
              ] as const
            ).map((field) => (
              <View key={field.key} style={styles.inputContainer}>
                <View style={styles.labelContainer}>
                  <Ionicons
                    name={field.icon}
                    size={18}
                    color="#666"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.label}>{field.label}</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter ${field.label.split(" ")[0]}`}
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={formData[field.key]}
                  onChangeText={(value) => handleInputChange(field.key, value)}
                />
              </View>
            ))}

            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.button, loading && { backgroundColor: "#81C784" }]}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Ionicons name="analytics" size={20} color="white" />
                  <Text style={styles.buttonText}>Get Recommendation</Text>
                </>
              )}
            </TouchableOpacity>

            {prediction && (
              <View style={styles.resultContainer}>
                <View style={styles.resultHeader}>
                  <Ionicons name="sparkles" size={20} color="#FFC107" />
                  <Text style={styles.resultTitle}>Recommended Crop</Text>
                </View>
                <Text style={styles.resultText}>{prediction}</Text>
              </View>
            )}
          </View>

          <View className="h-20" />
          
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginTop: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 24,
    maxWidth: "80%",
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#444",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 18,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  resultContainer: {
    marginTop: 24,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  resultText: {
    fontSize: 20,
    color: "#4CAF50",
    fontWeight: "700",
  },
});

export default CropPredictionForm;
