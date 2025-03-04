import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import useUserStore from "@/store/userStore";

const Profile = () => {
  const { user, logout } = useUserStore() as { 
    user: { 
      name: string; 
      mobile: string; 
      gender: string; 
      role: string; 
      lang: string;
      village?: { 
        village_name: string;
        village_code: string;
        taluka_id?: { taluka_name: string };
      };
    }, 
    logout: () => void 
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  const taluka = user.village?.taluka_id?.taluka_name || "Unknown Taluka";
  const village = user.village?.village_name || "Unknown Village";
  const villageCode = user.village?.village_code || "000000";
  const formattedLocation = `District: Pune\nTaluka: ${taluka}\nVillage: ${village} (${villageCode})`;

  return (
    <LinearGradient colors={["#1E3C72", "#2A5298"]} className="flex-1">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="bg-[#4F83CC] pt-14 pb-10 px-6 rounded-b-3xl shadow-lg">
          <View className="items-center">
            <View className="w-28 h-28 bg-white shadow-md rounded-full justify-center items-center mb-4 border-4 border-white">
              <Text className="text-4xl text-[#4F83CC] font-bold">
                {getInitials(user.name)}
              </Text>
            </View>
            <Text className="text-3xl font-extrabold text-white">{user.name}</Text>
            <Text className="text-lg text-indigo-100">{user.role}</Text>
          </View>
        </View>

        <View className="mx-6 mt-6 mb-6 bg-white/20 backdrop-blur-lg rounded-xl shadow-lg p-5 border border-white/30">
          <Text className="text-xl font-semibold text-white mb-4">Personal Information</Text>
          <View className="flex-row items-center mb-3">
            <Ionicons name="call-outline" size={22} color="white" />
            <Text className="ml-4 text-base text-white">{user.mobile}</Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Ionicons name="language-outline" size={22} color="white" />
            <Text className="ml-4 text-base text-white">{user.lang}</Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Ionicons name="person-outline" size={22} color="white" />
            <Text className="ml-4 text-base text-white">{user.gender}</Text>
          </View>
        </View>

        <View className="mx-6 mb-6 bg-white/20 backdrop-blur-lg rounded-xl shadow-lg p-5 border border-white/30">
          <Text className="text-xl font-semibold text-white mb-4">Address</Text>
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={22} color="white" />
            <Text className="ml-4 text-base text-white">{formattedLocation}</Text>
          </View>
        </View>

        <View className="mx-6 mb-6">
          <Text className="text-xl font-semibold text-white mb-4">Actions</Text>
          <View className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-5 border border-white/20 space-y-4">
            <TouchableOpacity
              className="flex-row items-center mb-2 p-3 bg-white/20 rounded-lg"
              onPress={() => console.log("Navigating to Edit Profile")}
            >
              <MaterialIcons name="edit" size={24} color="white" />
              <Text className="ml-4 text-lg text-white">Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center mb-2 p-3 bg-white/20 rounded-lg"
              onPress={() => console.log("Navigating to Settings")}
            >
              <Ionicons name="settings-outline" size={24} color="white" />
              <Text className="ml-4 text-lg text-white">Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center p-3 bg-red-500/60 rounded-lg"
              onPress={() => logout()}
            >
              <Ionicons name="log-out-outline" size={24} color="white" />
              <Text className="ml-4 text-lg text-white">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Profile;
