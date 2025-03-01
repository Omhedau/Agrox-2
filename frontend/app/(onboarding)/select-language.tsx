import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import images from "@/constants/images"; // Ensure this imports the correct image paths

const SelectLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const languages = [
    { id: "en", label: "English", image: images.letter_e },
    { id: "hi", label: "हिंदी", image: images.letter_h },
    { id: "mr", label: "मराठी", image: images.letter_m },
  ];

  return (
    <View className="flex-1 bg-white px-6 justify-center items-center">
      {/* Top Illustration */}
      <Image
        source={images.lang_img} // Replace with the actual image path
        className="w-32 h-32 mb-6"
        resizeMode="contain"
      />

      {/* Title */}
      <Text className="text-gray-700 text-lg font-medium mb-8">
        Select Your Preferred Language
      </Text>

      {/* Language Buttons */}
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.id}
          onPress={() => setSelectedLanguage(lang.id)}
          className={`flex-row justify-between items-center w-full border-2 rounded-xl px-4 py-3 mb-4 ${
            selectedLanguage === lang.id ? "border-green-500" : "border-gray-300"
          }`}
        >
          {/* Language Text */}
          <Text
            className="text-gray-700 text-base flex-shrink-1"
            style={{ width: "70%" }} // Adjust width to prevent text clipping
          >
            {lang.label}
          </Text>

          {/* Language Icon */}
          <View
            className={`w-10 h-10 rounded-full items-center justify-center ${
              selectedLanguage === lang.id ? "bg-green-100" : "bg-gray-200"
            }`}
          >
            <Image
              source={lang.image}
              className="w-8 h-8"
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      ))}

      {/* Next Button */}
      <TouchableOpacity
        onPress={() => alert(`Selected Language: ${selectedLanguage}`)}
        className="w-full h-12 bg-green-600 rounded-full justify-center items-center mt-6"
      >
        <Text className="text-white text-lg font-bold">Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectLanguage;
