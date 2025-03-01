import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import images from "@/constants/images";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import useUserStore from "@/store/userStore";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import constants from "@/constants/data";

const SignUp = () => {
  const { mobile } = useLocalSearchParams();
  const mobileNumber = Array.isArray(mobile) ? mobile[0] : mobile;
  interface Village {
    village_name: string;
  }

  const [villages, setVillages] = useState<Village[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: mobileNumber || "",
    gender: "Male",
    lang: "English",
    village: { village_name: "" },
  });

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

  const { signUp } = useUserStore() as { signUp: (userDetails: any) => void };

  const handleSubmit = () => {
    const fullName = `${formData.firstName} ${formData.lastName}`;
    const { firstName, lastName, ...rest } = formData;
    const userDetails = { ...rest, name: fullName };

    signUp(userDetails);
  };

  const getVillages = async () => {
    if (!selectedDistrict || !selectedTaluka) {
      setVillages([]); // Reset villages if district or taluka is not selected
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
      const data = response.data;
      setVillages(data.villages);
    } catch (error) {
      console.error("Error fetching villages:", error);
      setError("Failed to fetch villages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVillages();
  }, [selectedDistrict, selectedTaluka]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 bg-white px-6 py-10">
        {/* Logo */}
        <View className="items-center mt-10">
          <Image source={images.logo} className="w-20 h-20 mb-6" />
        </View>

        <View className="items-center mb-6">
          <Text className="text-2xl font-rubik-bold text-primary-500">
            Sign up and join us
          </Text>
        </View>

        {/* Form Fields */}
        <View>
          {/* First Name Input */}
          <Text className="text-gray-700 font-rubik mb-2">First Name</Text>
          <TextInput
            className="border font-rubik border-gray-300 rounded-lg px-4 py-3 mb-4 text-gray-800"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChangeText={(text) =>
              setFormData({ ...formData, firstName: text })
            }
          />

          {/* Last Name Input */}
          <Text className="text-gray-700 font-rubik mb-2">Last Name</Text>
          <TextInput
            className="border font-rubik border-gray-300 rounded-lg px-4 py-3 mb-4 text-gray-800"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChangeText={(text) =>
              setFormData({ ...formData, lastName: text })
            }
          />

          {/* Mobile Input */}
          <Text className="text-gray-700 font-rubik mb-2">User Mobile</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-gray-400 font-rubik-semi-bold"
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
            value={formData.mobile}
            editable={false}
          />

          {/* Gender Selection */}
          <Text className="text-gray-700 font-rubik mb-2">Gender</Text>
          <View className="flex-row justify-between mb-4">
            {["Male", "Female", "Other"].map((g) => (
              <TouchableOpacity
                key={g}
                className={`flex-1 items-center py-3 border ${
                  formData.gender === g
                    ? "border-primary-500 bg-primary-100"
                    : "border-gray-300"
                } rounded-lg mx-1`}
                onPress={() => setFormData({ ...formData, gender: g })}
              >
                <Text
                  className={`font-rubik-medium ${
                    formData.gender === g ? "text-primary-500" : "text-gray-600"
                  }`}
                >
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Language Selection */}
          <Text className="text-gray-700 font-rubik mb-2">Language</Text>
          <View className="flex-row justify-between mb-6">
            {["English", "मराठी", "हिंदी"].map((lang) => (
              <TouchableOpacity
                key={lang}
                className={`flex-1 items-center py-3 border ${
                  formData.lang === lang
                    ? "border-primary-500 bg-primary-100"
                    : "border-gray-300"
                } rounded-lg mx-1`}
                onPress={() => setFormData({ ...formData, lang: lang })}
              >
                <Text
                  className={`font-rubik-medium ${
                    formData.lang === lang
                      ? "text-primary-500"
                      : "text-gray-600"
                  }`}
                >
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* District Selection */}
          <Text className="text-gray-700 font-rubik mb-2">
            District{" "}
            <Text style={styles.requiredStar} className="text-lg">
              *
            </Text>
          </Text>
          <View
            className="border border-gray-300 rounded-lg mb-4 overflow-hidden"
            style={styles.pickerContainer}
          >
            <Picker
              selectedValue={selectedDistrict}
              onValueChange={(value) => setSelectedDistrict(value as string)}
              style={styles.picker}
              dropdownIconColor="#4A5568"
              mode="dropdown"
            >
              <Picker.Item
                style={{ color: "#A0AEC0" }}
                label="Select district"
                value=""
              />
              {districts.map((district) => (
                <Picker.Item
                  key={district}
                  label={district}
                  value={district}
                  color={selectedDistrict === district ? "green" : "black"}
                />
              ))}
            </Picker>
            <View style={styles.dropdownIcon}>
              <MaterialIcons name="arrow-drop-down" size={24} color="#4A5568" />
            </View>
          </View>

          {/* Taluka Selection */}
          <Text className="text-gray-700 font-rubik mb-2">
            Taluka{" "}
            <Text style={styles.requiredStar} className="text-lg">
              *
            </Text>
          </Text>
          <View
            className="border border-gray-300 rounded-lg mb-4 overflow-hidden"
            style={styles.pickerContainer}
          >
            <Picker
              selectedValue={selectedTaluka}
              onValueChange={(value) => setSelectedTaluka(value as string)}
              style={styles.picker}
              dropdownIconColor="#4A5568"
              mode="dropdown"
            >
              <Picker.Item
                style={{ color: "#A0AEC0" }}
                label="Select taluka"
                value=""
              />
              {talukas.map((taluka) => (
                <Picker.Item
                  key={taluka}
                  label={taluka}
                  value={taluka}
                  color={selectedTaluka === taluka ? "green" : "black"}
                />
              ))}
            </Picker>
            <View style={styles.dropdownIcon}>
              <MaterialIcons name="arrow-drop-down" size={24} color="#4A5568" />
            </View>
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
              <Text className="text-gray-700 font-rubik mb-2">
                Village{" "}
                <Text style={styles.requiredStar} className="text-lg">
                  *
                </Text>
              </Text>
              <View
                className="border border-gray-300 rounded-lg mb-4 overflow-hidden"
                style={styles.pickerContainer}
              >
                <Picker
                  selectedValue={formData.village.village_name}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      village: { village_name: value },
                    })
                  }
                  style={styles.picker}
                  dropdownIconColor="#4A5568"
                  mode="dropdown"
                >
                  <Picker.Item
                    style={{ color: "#A0AEC0" }}
                    label="Select village"
                    value=""
                  />
                  {villages.map((village) => (
                    <Picker.Item
                      key={village.village_name}
                      label={village.village_name}
                      value={village.village_name}
                      color={
                        formData.village.village_name === village.village_name
                          ? "green"
                          : "black"
                      }
                    />
                  ))}
                </Picker>
                <View style={styles.dropdownIcon}>
                  <MaterialIcons
                    name="arrow-drop-down"
                    size={24}
                    color="#4A5568"
                  />
                </View>
              </View>
            </View>
          ) : null}

          {/* Save Button */}
          <TouchableOpacity
            className="w-full h-12 bg-primary-500 rounded-full flex items-center justify-center"
            onPress={handleSubmit}
          >
            <Text className="text-white font-rubik-semibold text-lg">Save</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text className="text-center text-gray-500 text-xs mt-6">
          © Farmease 2025
        </Text>
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
  requiredStar: {
    color: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
});

export default SignUp;
