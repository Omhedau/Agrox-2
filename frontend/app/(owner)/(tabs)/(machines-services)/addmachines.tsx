import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";

const AddMachineForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    description: "",
    yearOfMfg: "",
    rentalStart: "",
    rentalEnd: "",
    operatingArea: "",
    rentalCost: "",
    rentalUnit: "",
    images: [] as string[],
    documents: [] as string[],
  });

  const [fileType, setFileType] = useState("");

  const rentalUnits = ["Hour", "Day", "Week", "Month", "Year"];

  const pickImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*", // Allow all image types
      });

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setFileType(file.name.split(".").pop() || ""); // Get file extension or default to empty string

        setFormData((prevFormData) => ({
          ...prevFormData,
          images: [file.uri], // Store the image URI
        }));
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: prevFormData.images.filter((_, i) => i !== index),
    }));
  };

  const handleImageClick = () => {
    // If an image is already selected, allow re-picking
    pickImage();
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 bg-white px-6 py-10">
        <View className="flex-row justify-center items-center mb-4">
          <Text className="text-primary-500 font-bold text-2xl mr-2">
            Add Machine
          </Text>
          <Ionicons name="add-circle-outline" size={28} color="#4CAF50" />
        </View>
        <View className="space-y-4">
          <Text className="text-primary-500 mb-2">Machine Details</Text>
          <TextInput
            className="mb-6 p-4 bg-gray-200 px-3 rounded-2xl"
            placeholder="Machine Name"
            value={formData.name}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, name: text }))
            }
            style={{
              color: "black",
              boxShadow: "inset 5px 5px 10px rgba(0, 0, 0, 0.1)",
            }}
          />

          <Text className="text-primary-500 mb-2">Machine Model</Text>
          <TextInput
            className="mb-6 p-4 bg-gray-200 px-3 rounded-2xl"
            placeholder="Machine Model"
            value={formData.model}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, model: text }))
            }
            style={{
              color: "black",
              boxShadow: "inset 5px 5px 10px rgba(0, 0, 0, 0.1)",
            }}
          />

          <Text className="text-primary-500 mb-2">Machine Description</Text>
          <TextInput
            className="mb-6 p-4 bg-gray-200 px-3 rounded-2xl"
            placeholder="Machine Description"
            multiline
            numberOfLines={3}
            value={formData.description}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, description: text }))
            }
            style={{
              color: "black",
              height: 100,
              textAlignVertical: "top",
              boxShadow: "inset 5px 5px 10px rgba(0, 0, 0, 0.1)",
            }}
          />

          <Text className="text-primary-500 mb-2">Machine images</Text>

          {formData.images.length > 0 ? (
            <View className="mb-6">
              {formData.images.map((imageUri, index) => (
                <View key={index} className="mb-4 relative">
                  <TouchableOpacity onPress={handleImageClick}>
                    <Image
                      source={{ uri: imageUri }}
                      style={{ width: "100%", height: 200, borderRadius: 10 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => removeImage(index)}
                    style={styles.removeIcon}
                  >
                    <Ionicons name="close-circle" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <TouchableOpacity
              className="bg-gray-200 p-4 rounded-2xl mb-6 items-center flex-row justify-center"
              onPress={pickImage}
            >
              <Ionicons
                name="cloud-upload-outline"
                size={24}
                color="gray"
                style={{ marginRight: 8 }}
              />
              <Text className="text-gray-500">Add Images</Text>
            </TouchableOpacity>
          )}

          <Text className="text-primary-500 mb-2">Year of Manufacture</Text>
          <TextInput
            className="mb-6 p-4 bg-gray-200 px-3 rounded-2xl"
            placeholder=" 2023-12-31"
            value={formData.yearOfMfg}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, yearOfMfg: text }))
            }
            style={{
              color: "black",
              boxShadow: "inset 5px 5px 10px rgba(0, 0, 0, 0.1)",
            }}
          />

          <Text className="text-primary-500 mb-2">Rental Unit</Text>
          <View
            className="border border-gray-300 rounded-lg mb-4 overflow-hidden"
            style={styles.pickerContainer}
          >
            <Picker
              selectedValue={formData.rentalUnit}
              onValueChange={(itemValue) =>
                setFormData({ ...formData, rentalUnit: itemValue as string })
              }
              style={styles.picker}
              dropdownIconColor="#4A5568"
              mode="dropdown"
            >
              <Picker.Item
                style={{ color: "#A0AEC0", height: 50 }}
                label="Select rental unit"
                value=""
              />
              {rentalUnits.map((unit) => (
                <Picker.Item
                  key={unit}
                  label={unit}
                  value={unit}
                  color={formData.rentalUnit === unit ? "green" : "black"}
                />
              ))}
            </Picker>
            <View style={styles.dropdownIcon}>
              <MaterialIcons name="arrow-drop-down" size={24} color="#4A5568" />
            </View>
          </View>

          <Text className="text-primary-500 mb-2">Rental Cost</Text>
          <TextInput
            className="mb-6 p-4 bg-gray-200 px-3 rounded-2xl"
            placeholder=" rental cost"
            keyboardType="number-pad"
            value={formData.rentalCost}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, rentalCost: text }))
            }
            style={{
              color: "black",
              boxShadow: "inset 5px 5px 10px rgba(0, 0, 0, 0.1)",
            }}
          />

          <TouchableOpacity
            className="bg-green-500 mt-10 p-3 rounded-lg items-center"
            onPress={handleSubmit}
          >
            <Text className="text-white font-bold">Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    position: "relative",
    backgroundColor: "#F7FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
  },
  picker: {
    width: "100%",
    height: 50,
    color: "#1A202C",
  },
  dropdownIcon: {
    position: "absolute",
    right: 10,
    top: 12,
    pointerEvents: "none",
  },
  removeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 4,
  },
  requiredStar: {
    color: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
});

export default AddMachineForm;
