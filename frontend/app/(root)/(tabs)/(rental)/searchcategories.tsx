import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import constants from "@/constants/data";
import images from "@/constants/images";
import axios from "axios";
import { useRouter } from "expo-router";

const SearchCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const inputRef = useRef<TextInput>(null);
  const router = useRouter();

  const CategoriesImages = (category: string) => {
    const images: { [key: string]: string } = {
      Tractor:
        "https://www.deere.co.in/assets/images/region-1/products/tractors/john-deere-e-series-cab.jpg",
      Harvester:
        "https://www.deere.co.in/assets/images/region-1/Misc/w70-synchrosmart-combine-harvester.jpg",
      Rotavator:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkwPyP7lJ4ETLoiVbk21D8UYEdjL99tiDL0g&s",
      Cultivator:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGOqUOVlvigSk7xK2G6iwEjjNXc6w8Yu2tWg&s",
      Plough:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHRXoAp3SwGf_QkQSxb-KKoXgAiMoJRIDCZQ&s",
      Sprayer:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQx3EvU5zJsMT8UYGp8Jffax9bO4y8sThiBhV0cJgp7xvZanGg9oONrsTW5UynIMNem7Vcmm8Pv7i1v7sCwUqvnVoL1RIHjdY6iJQF3c_ruqaqOFW9XoYCh&usqp=CAE",
      Seeder:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLuqRbJiKXDlk_Cqi12ce_SUGI31iCBUxN6ufKtlNrXtKElIlmxP6ujArrFeIORvso5ug&usqp=CAU",
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4hF0mqVwQJSIDrJ-hKcGt3efeQkaoky8aA0vs3Aut12GwaPg1k2GxVUwuufqL_JIKfAQ&usqp=CAU",
    };
    return images[category] || images["default"];
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const getCategories = async () => {
    try {
      const village = "Patas";
      const response = await axios.post(
        `${constants.base_url}/api/machine/categories`,
        { village }
      );
      setCategories(response.data.categories);
      setFilteredCategories(response.data.categories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredCategories(categories);
    } else {
      setFilteredCategories(
        categories.filter((category) =>
          category.toLowerCase().startsWith(search.toLowerCase())
        )
      );
    }
  }, [search, categories]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#f9f9f9] px-4 pt-6"
    >
      <Text className="text-lg font-bold text-gray-800 mb-3">
        Search Categories
      </Text>

      <View className="shadow-md rounded-2xl bg-white">
        <TextInput
          ref={inputRef}
          className="w-full h-12 bg-white rounded-2xl px-4 text-base text-gray-900 border border-gray-300 focus:border-gray-500"
          placeholder="Search for a category..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />
      </View>

      <ScrollView
        className="pt-4 pb-20 mt-3"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row flex-wrap justify-between">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  router.push({ pathname: "/machines", params: { category } })
                }
                className="w-[48%] mb-4 p-4 rounded-lg border border-gray-300 bg-white shadow-md items-center"
              >
                <Image
                  source={{ uri: CategoriesImages(category) }}
                  className="w-20 h-20 rounded-full border border-gray-700"
                  resizeMode="cover"
                />
                <Text className="text-gray-900 font-semibold mt-2">
                  {category}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-gray-500 text-center w-full mt-4">
              No categories found.
            </Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SearchCategories;
