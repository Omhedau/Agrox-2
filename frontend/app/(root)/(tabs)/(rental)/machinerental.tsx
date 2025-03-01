import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useUserStore from "@/store/userStore";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const MachineRental = () => {
  const { isDarkMode } = useUserStore() as { isDarkMode: boolean };

  const themeStyles = {
    backgroundColor: isDarkMode ? "#1c1c1e" : "#f9f9f9",
    textColor: isDarkMode ? "#fff" : "#222",
    cardBackground: isDarkMode ? "#2c2c2e" : "#fff",
    placeholderTextColor: isDarkMode ? "#aaa" : "#777",
    borderColor: isDarkMode ? "#444" : "#ddd",
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeStyles.backgroundColor,
        paddingTop: 10,
      }}
    >
      {/* Header with Search Bar and Toggle */}
      <View className="flex-row items-center px-4 pb-1">
        <TouchableOpacity
          onPress={() => router.push("/searchcategories")}
          className="flex-1 rounded-full shadow-md"
        >
          <TextInput
            className="font-rubik-light"
            style={{
              height: 46,
              backgroundColor: themeStyles.cardBackground,
              borderRadius: 20,
              paddingLeft: 16,
              color: themeStyles.textColor,
            }}
            placeholder="Search for equipment..."
            placeholderTextColor={themeStyles.placeholderTextColor}
            editable={false} // Disables keyboard input since it's a button-like field
          />
        </TouchableOpacity>

        <TouchableOpacity style={{ marginLeft: 12 }}>
          <Ionicons name="filter" size={24} color={themeStyles.textColor} />
        </TouchableOpacity>
      </View>

      {/* Machine Categories Grid */}
      <ScrollView
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 0,
          paddingHorizontal: 16,
        }}
      >
        {/* Orders and Cart Buttons */}
        <View className="flex-row py-4 rounded-md bg-gray-50 justify-center items-center">
          <TouchableOpacity
            onPress={() => router.push("/orders")}
            className="w-1/2 rounded-lg border dark:border-gray-600 mr-2 shadow-lg"
          >
            <LinearGradient
              colors={["#16a085", "#f4d03f"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-full h-32 rounded-lg flex items-center justify-center"
            >
              <MaterialIcons name="shopping-bag" size={24} color="white" />
              <Text className="text-lg font-rubik-medium text-white mt-1">
                 Rented Machines
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/")}
            className="w-1/2 rounded-lg border dark:border-gray-600 shadow-lg"
          >
            <LinearGradient
              colors={["#e74c3c", "#8e44ad"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-full h-32 rounded-lg flex items-center justify-center"
            >
              <MaterialIcons name="shopping-cart" size={24} color="white" />
              <Text className="text-lg font-rubik-medium text-white mt-1">
                Your Cart
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default MachineRental;
