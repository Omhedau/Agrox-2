import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FontAwesome5 } from "@expo/vector-icons"; // Import specific icon library

const SelectGender = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const { language } = useLanguage(); // Get the current language from context

  // Translations Object
  const translations = {
    en: {
      selectGender: "Select Your Gender",
      male: "Male",
      female: "Female",
      other: "Other",
      next: "Next",
      selectedGender: "Selected Gender:",
    },
    hi: {
      selectGender: "अपना लिंग चुनें",
      male: "पुरुष",
      female: "महिला",
      other: "अन्य",
      next: "आगे",
      selectedGender: "चयनित लिंग:",
    },
    mr: {
      selectGender: "तुमचा लिंग निवडा",
      male: "पुरुष",
      female: "स्त्री",
      other: "इतर",
      next: "पुढे",
      selectedGender: "निवडलेले लिंग:",
    },
  };
  

  // Select translations for the current language
  const t = translations[language] || translations.en;

  // Gender Options with Icons
  const genders = [
    { id: "male", label: t.male, icon: "male" },
    { id: "female", label: t.female, icon: "female" },
    { id: "other", label: t.other, icon: "genderless" },
  ];

  return (
    <View className="flex-1 bg-white px-6 justify-center items-center">
      {/* Top Illustration */}
      <FontAwesome5 name="venus-mars" size={80} color="#4CAF50" className="mb-6" />

      {/* Title */}
      <Text className="text-gray-700 text-lg font-medium mb-8">{t.selectGender}</Text>

      {/* Gender Buttons */}
      {genders.map((gender) => (
        <TouchableOpacity
          key={gender.id}
          onPress={() => setSelectedGender(gender.id)}
          className={`flex-row justify-between items-center w-full border-2 rounded-xl px-4 py-3 mb-4 ${
            selectedGender === gender.id ? "border-green-500" : "border-gray-300"
          }`}
        >
          {/* Gender Text */}
          <Text
            className={`text-gray-700 text-base ${
              selectedGender === gender.id ? "font-bold text-green-600" : ""
            }`}
          >
            {gender.label}
          </Text>

          {/* Gender Icon */}
          <View
            className={`w-10 h-10 rounded-full items-center justify-center ${
              selectedGender === gender.id ? "bg-green-100" : "bg-gray-200"
            }`}
          >
            <FontAwesome5
              name={gender.icon}
              size={24}
              color={selectedGender === gender.id ? "#4CAF50" : "#6B7280"}
            />
          </View>
        </TouchableOpacity>
      ))}

      {/* Next Button */}
      <TouchableOpacity
        onPress={() => alert(`${t.selectedGender} ${selectedGender}`)}
        className="w-full h-12 bg-green-600 rounded-full justify-center items-center mt-6"
      >
        <Text className="text-white text-lg font-bold">{t.next}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectGender;
