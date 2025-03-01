import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import constants from "@/constants/data";
import axios from "axios";

const AddMachineForm = () => {
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

  interface Village {
    _id: string;
    village_name: string;
  }

  const [villages, setVillages] = useState<Village[]>([]);
  const [selectedVillages, setSelectedVillages] = useState<Village[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");

  // Machine fields
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

  const rentalUnits = ["Hour", "Day", "Week", "Month", "Year"];

  const getVillages = async () => {
    if (!selectedDistrict || !selectedTaluka) {
      setVillages([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${constants.base_url}/api/get-villages`, {
        district_name: selectedDistrict,
        taluka_name: selectedTaluka,
      });
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

  const handleSubmit = async () => {

    const payload = {
      ...formData,
      villages: selectedVillages.map((village) => village._id), // Include selected village IDs
    };

    console.log("Submitting machine:", payload);

    try {
      const response = await axios.post(`${constants.base_url}/api/add-machine`, payload);
      console.log("Machine added successfully:", response.data);
      // Reset form after successful submission
      setFormData({
        name: "",
        model: "",
        description: "",
        yearOfMfg: "",
        rentalStart: "",
        rentalEnd: "",
        operatingArea: "",
        rentalCost: "",
        rentalUnit: "",
        images: [],
        documents: [],
      });
      setSelectedVillages([]);
      setSelectedDistrict("");
      setSelectedTaluka("");
    } catch (error) {
      console.error("Error adding machine:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View className="flex-1 bg-white px-6 py-10">
        {/* Machine Details */}
        <Text className="text-primary-500 font-bold text-2xl mb-4">Add Machine</Text>

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

        {/* Machine Description */}
        <Text className="text-gray-700 font-rubik mb-2">Machine Description</Text>
        <TextInput
          className="mb-4 p-3 bg-gray-100 rounded-lg"
          placeholder="Enter machine description"
          multiline
          numberOfLines={3}
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
        />

        {/* Year of Manufacture */}
        <Text className="text-gray-700 font-rubik mb-2">Year of Manufacture</Text>
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
          onChangeText={(text) => setFormData({ ...formData, rentalCost: text })}
        />

        <Text className="text-gray-700 font-rubik mb-2">Rental Unit</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.rentalUnit}
            onValueChange={(itemValue) => setFormData({ ...formData, rentalUnit: itemValue })}
            style={styles.picker}
          >
            <Picker.Item label="Select rental unit" value="" />
            {rentalUnits.map((unit) => (
              <Picker.Item key={unit} label={unit} value={unit} />
            ))}
          </Picker>
        </View>

        {/* District Selection */}
        <Text className="text-gray-700 font-rubik mb-2">District</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedDistrict} onValueChange={setSelectedDistrict} style={styles.picker}>
            <Picker.Item label="Select district" value="" />
            {districts.map((district) => (
              <Picker.Item key={district} label={district} value={district} />
            ))}
          </Picker>
        </View>

        {/* Taluka Selection */}
        <Text className="text-gray-700 font-rubik mb-2">Taluka</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedTaluka} onValueChange={setSelectedTaluka} style={styles.picker}>
            <Picker.Item label="Select taluka" value="" />
            {talukas.map((taluka) => (
              <Picker.Item key={taluka} label={taluka} value={taluka} />
            ))}
          </Picker>
        </View>

        {/* Village Selection */}
        {loading ? (
          <Text className="text-gray-700 font-rubik mb-2">Loading villages...</Text>
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
                    selectedVillages.some((v) => v._id === item._id) && styles.selectedVillage,
                  ]}
                  onPress={() => toggleVillageSelection(item)}
                >
                  <Text style={styles.villageText}>{item.village_name}</Text>
                  {selectedVillages.some((v) => v._id === item._id) && (
                    <MaterialIcons name="check-circle" size={20} color="green" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        ) : null}

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-green-500 mt-6 p-3 rounded-lg items-center"
          onPress={handleSubmit}
        >
          <Text className="text-white font-bold">Add Machine</Text>
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
});

export default AddMachineForm;