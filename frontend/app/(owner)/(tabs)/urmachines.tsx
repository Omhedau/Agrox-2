import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import constants from "@/constants/data";
import RentalCarousel from "@/components/RentalCarousel";

import Categories from "@/components/Categories";

const Machines = () => {
  const router = useRouter();

  interface Machine {
    _id: string;
    name: string;
    model: string;
    yearOfMfg: number;
    rentalCost: { $numberDecimal: string };
    rentalUnit: string;
    images: string[];
  }

  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
    
        if (!token) {
          console.error("Error: No token found in AsyncStorage");
          return;
        }
    
        const response = await axios.get(`${constants.base_url}/api/machine/owner`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        console.log("Machines fetched successfully:", response.data);
        setMachines(response.data?.machines || []);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error("Error fetching machines:", error.response.data);
        } else {
          console.error("Error fetching machines:", (error as Error).message);
        }
      }
    };
    

    fetchMachines();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="px-4 py-6">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Available Machines</Text>
        
        {machines.length > 0 ? (
          machines.map((machine) => (
            <View key={machine._id} className="bg-white rounded-xl shadow-lg mb-4 p-4 flex-row items-center">
              <Image 
                source={{ uri: machine.images[0] }} 
                className="w-24 h-24 rounded-lg mr-4" 
                resizeMode="cover" 
              />
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900">{machine.name}</Text>
                <Text className="text-gray-600">Model: {machine.model}</Text>
                <Text className="text-gray-500">Year: {machine.yearOfMfg}</Text>
                <Text className="text-indigo-500 font-bold">
                  ₹{machine.rentalCost.$numberDecimal} / {machine.rentalUnit}
                </Text>
                </View>
                <TouchableOpacity
                onPress={() => router.push({ pathname: `/machineDetail`, params: { machineId: machine._id } })} // Expo Router Navigation
                className="p-2 bg-indigo-500 rounded-full"
                >
                <Ionicons name="chevron-forward" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text className="text-gray-600">No machines available in your village.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Machines;
