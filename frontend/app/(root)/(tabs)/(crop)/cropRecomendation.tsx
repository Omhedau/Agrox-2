import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

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

  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Find the Best Crop for Your Farm</Text>
      <Text style={styles.subtitle}>
        Enter the required parameters to get the best crop prediction
      </Text>

      {[
        "Nitrogen",
        "Phosphorous",
        "Potassium",
        "pH level",
        "Rainfall (in mm)",
      ].map((label) => (
        <View key={label} style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter ${label.toLowerCase()}`}
            placeholderTextColor="#B0B0C3"
            keyboardType="numeric"
            onChangeText={(value) =>
              handleInputChange(label.toLowerCase().split(" ")[0], value)
            }
          />
        </View>
      ))}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>State</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.state}
            style={styles.picker}
            onValueChange={(value) => handleInputChange("state", value)}
          >
            <Picker.Item label="Select State" value="" />
            <Picker.Item label="State 1" value="state1" />
            <Picker.Item label="State 2" value="state2" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>City</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.city}
            style={styles.picker}
            onValueChange={(value) => handleInputChange("city", value)}
          >
            <Picker.Item label="Select City" value="" />
            <Picker.Item label="City 1" value="city1" />
            <Picker.Item label="City 2" value="city2" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Predict</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  pickerContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 3,
  },
  picker: {
    width: "100%",
    color: "#333",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#4A90E2",
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#4A90E2",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CropPredictionForm;
