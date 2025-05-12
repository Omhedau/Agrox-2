import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import constants from "@/constants/data";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import useUserStore from "@/store/userStore";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditMachineForm = () => {
  const { machine: machineString } = useLocalSearchParams();
  const machine = JSON.parse(machineString as string); // Parse the machine object from the params
  const { user } = useUserStore() as {
    user: { id: string; name: string; email: string };
  };

  const districts = ["Pune"];
  const talukas = [
    "Haveli",
    "Maval",
    "Mulshi",
    "Junnar",
    "Ambegaon",
    "Khed",
    "Shirur",
    "Daund",
    "Purandar",
    "Velhe",
    "Bhor",
    "Indapur",
    "Baramati",
  ];

  const categories: string[] = [
    "Tractor Implements",
    "Harvesting Machines",
    "Tillage Equipment",
    "Sowing and Planting Equipment",
    "Sprayers and Fertilizer Spreaders",
    "Irrigation Equipment",
    "Hay and Forage Equipment",
    "Land Leveling Equipment",
    "Threshing and Shelling Equipment",
    "Transport Equipment",
  ];

  interface Village {
    _id: string;
    village_name: string;
  }

  const [villages, setVillages] = useState<Village[]>([]);
  const [selectedVillages, setSelectedVillages] = useState<Village[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(machine.district || "");
  const [selectedTaluka, setSelectedTaluka] = useState(machine.taluka || "");
  const [fileType, setFileType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Machine fields
  const [formData, setFormData] = useState({
    name: machine.name || "",
    model: machine.model || "",
    description: machine.description || "",
    yearOfMfg: machine.yearOfMfg?.toString() || "",
    rentalStart: machine.rentalStart || "",
    rentalEnd: machine.rentalEnd || "",
    operatingArea: machine.operatingArea || "",
    rentalCost: machine.rentalCost?.$numberDecimal || "",
    rentalUnit: machine.rentalUnit || "",
    category: machine.category || "",
    images: machine.images || [] as string[],
    documents: machine.documents || [] as string[],
    availableStatus: machine.availableStatus || true,
  });

  const rentalUnits = ["hour", "day", "week", "month", "year"];

  // Pre-fill the form with machine data
  useEffect(() => {
    if (machine) {
      setFormData({
        name: machine.name || "",
        model: machine.model || "",
        description: machine.description || "",
        yearOfMfg: machine.yearOfMfg?.toString() || "",
        rentalStart: machine.rentalStart || "",
        rentalEnd: machine.rentalEnd || "",
        operatingArea: machine.operatingArea || "",
        rentalCost: machine.rentalCost?.$numberDecimal || "",
        rentalUnit: machine.rentalUnit || "",
        category: machine.category || "",
        images: machine.images || [],
        documents: machine.documents || [],
        availableStatus: machine.availableStatus || true,
      });
      setSelectedDistrict(machine.district || "");
      setSelectedTaluka(machine.taluka || "");
      setSelectedVillages(machine.operatingArea || []);
    }
  }, []);

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
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  const removeImage = (index: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: prevFormData.images.filter((_: string, i: number) => i !== index),
    }));
  };

  const handleImageClick = () => {
    // If an image is already selected, allow re-picking
    pickImage();
  };

  const getVillages = async () => {
    if (!selectedDistrict || !selectedTaluka) {
      setVillages([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${constants.base_url}/api/get-villages`,
        {
          district_name: selectedDistrict,
          taluka_name: selectedTaluka,
        }
      );
      setVillages(response.data.villages);
    } catch (error) {
      console.error("Error fetching villages:", error);
      setError("Failed to fetch villages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVillages();
    setSelectedVillages([]); // Reset selected villages when taluka/district changes
  }, [selectedDistrict, selectedTaluka]);

  const toggleVillageSelection = (village: Village) => {
    setSelectedVillages((prev) => {
      const isSelected = prev.find((v) => v._id === village._id);
      if (isSelected) {
        return prev.filter((v) => v._id !== village._id); // Remove if already selected
      }
      return [...prev, village]; // Add if not selected
    });
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.model ||
      !formData.description ||
      !formData.yearOfMfg ||
      !formData.rentalCost ||
      !formData.rentalUnit ||
      !selectedDistrict ||
      !selectedTaluka ||
      selectedVillages.length === 0
    ) {
      Alert.alert("Error", "Please fill all required fields.");
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Error", "Authentication token missing. Please sign in.");
        router.replace("/(auth)/sign-in");
        return;
      }

      let uploadedImageUrl: string | null = null;

      // Upload image if selected
      if (formData.images?.length > 0) {
        try {
          const imageUri = formData.images[0];
          const fileName = `machine-images/${Date.now()}.${fileType}`;

          const uploadResponse = await axios.post(
            `${constants.base_url}/api/image/upload`,
            { key: fileName, contentType: `image/${fileType}` }
          );

          if (!uploadResponse.data.uploadUrl) {
            throw new Error("Failed to retrieve pre-signed upload URL");
          }

          const { uploadUrl } = uploadResponse.data;

          // Fetch the image file and convert it to a blob
          const response = await fetch(imageUri);
          const blob = await response.blob();

          const imageResponse = await fetch(uploadUrl, {
            method: "PUT",
            headers: { "Content-Type": `image/${fileType}` },
            body: blob,
          });

          if (!imageResponse.ok) {
            throw new Error(
              `Failed to upload image: ${imageResponse.statusText}`
            );
          }

          // Extract the uploaded image URL
          uploadedImageUrl = uploadUrl.split("?")[0];
          console.log("Uploaded image URL:", uploadedImageUrl);
        } catch (uploadError) {
          console.error("Error uploading machine image:", uploadError);
          throw new Error("Machine image upload failed");
        }
      }

      const machineData = {
        ...formData,
        images: uploadedImageUrl ? [uploadedImageUrl] : formData.images,
        operatingArea: selectedVillages.map((village) => village._id), // Include selected village IDs
      };

      console.log("MachineData", machineData);

      // Send the machine data to the server for update
      const response = await axios.put(
        `${constants.base_url}/api/machine/${machine._id}`,
        machineData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        Alert.alert("Success", "Machine updated successfully");
        router.back(); // Navigate back after successful update
      } else {
        const errorMessage =
          response.data.message || "Failed to update machine. Please try again.";
        Alert.alert("Success", errorMessage);
         router.back(); // solve this error why this message is printing
      }
    } catch (error) {
      console.error("Error updating machine:", error);
      Alert.alert("Error", "Failed to update machine. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 bg-white px-6 py-10">
        {/* Machine Details */}
        <Text className="text-primary-500 font-bold text-2xl mb-4">
          Edit Machine
        </Text>
        <Text className="text-gray-700 font-rubik mb-2">Is the machine currently available?</Text>
       
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.availableStatus ? "yes" : "no"}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, availableStatus: itemValue === "yes" })
            }
            style={styles.picker}
          >
            <Picker.Item label="Yes" value="yes" />
            <Picker.Item label="No" value="no" />
          </Picker>
        </View>

        {/* Machine Name */}
        <Text className="text-gray-700 font-rubik mb-2">Machine Name</Text>
        <TextInput
          className="mb-4 p-3 bg-gray-100 rounded-lg"
          placeholder="Enter machine name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />

        {/* Machine Model */}
        <Text className="text-gray-700 font-rubik mb-2">Machine Model</Text>
        <TextInput
          className="mb-4 p-3 bg-gray-100 rounded-lg"
          placeholder="Enter machine model"
          value={formData.model}
          onChangeText={(text) => setFormData({ ...formData, model: text })}
        />

        {/* Machine Images */}
        <Text className="text-gray-700 font-rubik mb-2">Machine Images</Text>

        {formData.images.length > 0 ? (
          <View className="mb-6">
            {formData.images.map((imageUri: string, index: number) => (
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

        {/* Machine Category */}
        <Text className="text-gray-700 font-rubik mb-2">
          Machine Category
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.category}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, category: itemValue })
            }
            style={styles.picker}
          >
            <Picker.Item
              style={{ color: "grey" }}
              label="Select Machine Category"
              value=""
            />
            {categories.map((category) => (
              <Picker.Item
                style={{
                  color: formData.category === category ? "green" : "black",
                }}
                key={category}
                label={category}
                value={category}
              />
            ))}
          </Picker>
        </View>

        {/* Machine Description */}
        <Text className="text-gray-700 font-rubik mb-2">
          Machine Description
        </Text>
        <TextInput
          className="mb-4 p-3 bg-gray-100 rounded-lg"
          placeholder="Enter machine description"
          multiline
          numberOfLines={3}
          value={formData.description}
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
        />

        {/* Year of Manufacture */}
        <Text className="text-gray-700 font-rubik mb-2">
          Year of Manufacture
        </Text>
        <TextInput
          className="mb-4 p-3 bg-gray-100 rounded-lg"
          placeholder="Enter year of manufacture"
          value={formData.yearOfMfg}
          onChangeText={(text) => setFormData({ ...formData, yearOfMfg: text })}
        />

        {/* Rental Details */}
        <Text className="text-gray-700 font-rubik mb-2">Rental Cost</Text>
        <TextInput
          className="mb-4 p-3 bg-gray-100 rounded-lg"
          placeholder="Enter rental cost"
          keyboardType="numeric"
          value={formData.rentalCost}
          onChangeText={(text) =>
            setFormData({ ...formData, rentalCost: text })
          }
        />

        <Text className="text-gray-700 font-rubik mb-2">Rental Unit</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.rentalUnit}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, rentalUnit: itemValue })
            }
            style={styles.picker}
          >
            <Picker.Item
              style={{ color: "grey" }}
              label="Select rental unit"
              value=""
            />
            {rentalUnits.map((unit) => (
              <Picker.Item
                style={{
                  color: formData.rentalUnit === unit ? "green" : "black",
                }}
                key={unit}
                label={unit}
                value={unit}
              />
            ))}
          </Picker>
        </View>

        {/* District Selection */}
        <Text className="text-gray-700 font-rubik mb-2">District</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedDistrict}
            onValueChange={setSelectedDistrict}
            style={styles.picker}
          >
            <Picker.Item
              style={{ color: "grey" }}
              label="Select district"
              value=""
            />
            {districts.map((district) => (
              <Picker.Item
                style={{
                  color: selectedDistrict === district ? "green" : "black",
                }}
                key={district}
                label={district}
                value={district}
              />
            ))}
          </Picker>
        </View>

        {/* Taluka Selection */}
        <Text className="text-gray-700 font-rubik mb-2">Taluka</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedTaluka}
            onValueChange={setSelectedTaluka}
            style={styles.picker}
          >
            <Picker.Item
              style={{ color: "grey" }}
              label="Select taluka"
              value=""
            />
            {talukas.map((taluka) => (
              <Picker.Item
                style={{
                  color: selectedTaluka === taluka ? "green" : "black",
                }}
                key={taluka}
                label={taluka}
                value={taluka}
              />
            ))}
          </Picker>
        </View>

        {/* Village Selection */}
        {loading ? (
          <Text className="text-gray-700 font-rubik mb-2">
            Loading villages...
          </Text>
        ) : error ? (
          <Text className="text-red-500 font-rubik mb-2">{error}</Text>
        ) : villages.length > 0 ? (
          <View>
            <Text className="text-gray-700 font-rubik mb-2">Villages</Text>
            <FlatList
              data={villages}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.villageItem,
                    selectedVillages.some((v) => v._id === item._id) &&
                    styles.selectedVillage,
                  ]}
                  onPress={() => toggleVillageSelection(item)}
                >
                  <Text style={styles.villageText}>{item.village_name}</Text>
                  {selectedVillages.some((v) => v._id === item._id) && (
                    <MaterialIcons
                      name="check-circle"
                      size={20}
                      color="green"
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        ) : null}

        {/* Update Button */}
        <TouchableOpacity
          className="bg-blue-500 mt-6 p-3 rounded-lg items-center"
          onPress={handleUpdate}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold">Update Machine</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    backgroundColor: "#F7FAFC",
    marginBottom: 10,
  },
  picker: {
    width: "100%",
    height: 50,
    color: "#1A202C",
  },
  villageItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  villageText: {
    fontSize: 16,
    color: "#1A202C",
  },
  selectedVillage: {
    backgroundColor: "#E6FFFA",
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
});


export default EditMachineForm;