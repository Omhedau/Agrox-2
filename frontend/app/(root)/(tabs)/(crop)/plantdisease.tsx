import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import constants from "@/constants/data";

const { width } = Dimensions.get("window");

const PlantDiseasePredictionForm = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      copyToCacheDirectory: true,
    });

    if (result.canceled || !result.assets.length) return;

    setSelectedFile(result.assets[0].name);
    setFileUri(result.assets[0].uri);
    setPreviewImage(result.assets[0].uri);
    setPrediction(null);
  };

  const handleSubmit = async () => {
    if (!fileUri) {
      alert("Please upload an image of the plant leaf.");
      return;
    }

    setLoading(true);
    setPrediction(null);

    try {
      const formData = new FormData();
      formData.append("file", {
        uri: fileUri,
        name: selectedFile,
        type: "image/jpeg",
      } as any);

      const response = await axios.post(
        `${constants.bass_url}/disease-predict`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setPrediction(response.data.prediction);
      } else {
        setPrediction("Failed to get a prediction. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setPrediction("An error occurred. Please check your file and try again.");
    } finally {
      setLoading(false);
    }
  };

  const cleanPredictionText = (text: string) => {
    return text
      .replace(/<b>/g, "")
      .replace(/<\/b>/g, "")
      .replace(/<br\/?>/g, "\n");
  };

  return (
    <LinearGradient colors={["#f5f7fa", "#c3cfe2"]} style={styles.gradient}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.mainContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Ionicons name="leaf" size={48} color="#4F83CC99" />
            <Text style={styles.title}>Plant Health Scanner</Text>
            <Text style={styles.subtitle}>
              Upload an image of your plant leaf for disease detection
            </Text>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            {/* File Upload Section */}
            <View style={styles.uploadSection}>
              <Text style={styles.sectionTitle}>Plant Image</Text>

              {previewImage ? (
                <View style={styles.imagePreviewContainer}>
                  <Image
                    source={{ uri: previewImage }}
                    style={styles.imagePreview}
                    resizeMode="contain"
                  />
                  <TouchableOpacity
                    onPress={pickDocument}
                    style={styles.changePhotoButton}
                  >
                    <Text style={styles.changePhotoText}>Change Photo</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={pickDocument}
                  style={styles.uploadButton}
                >
                  <Ionicons name="camera" size={32} color="#4F83CC99" />
                  <Text style={styles.uploadButtonText}>
                    Select Plant Photo
                  </Text>
                  <Text style={styles.uploadHint}>JPG or PNG, max 5MB</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                styles.submitButton,
                (!selectedFile || loading) && styles.disabledButton,
              ]}
              disabled={!selectedFile || loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Ionicons name="search" size={20} color="white" />
                  <Text style={styles.submitButtonText}>
                    Analyze Plant Health
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* Results Section */}
            {prediction && (
              <View style={styles.resultsContainer}>
                <View style={styles.resultsHeader}>
                  <Ionicons name="medical" size={24} color="#4F83CCE6" />
                  <Text style={styles.resultsTitle}>Diagnosis Results</Text>
                </View>
                <Text style={styles.resultsText}>
                  {cleanPredictionText(prediction)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  mainContainer: {
    width: width * 0.9,
    maxWidth: 500,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
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
  uploadSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginBottom: 12,
  },
  uploadButton: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
  },
  uploadHint: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
  imagePreviewContainer: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  changePhotoButton: {
    padding: 8,
    borderRadius: 8,
  },
  changePhotoText: {
    color: "#4F83CCE6",
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#4F83CCE6",
    padding: 18,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  disabledButton: {
    backgroundColor: "#4F83CC99",
    opacity: 0.7,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  resultsContainer: {
    marginTop: 24,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  resultsText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
});

export default PlantDiseasePredictionForm;
