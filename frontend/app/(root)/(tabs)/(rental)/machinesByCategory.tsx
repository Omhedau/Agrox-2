import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from "@/constants/data";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

interface Machine {
  _id: string;
  name: string;
  model: string;
  yearOfMfg: number;
  rentalCost: { $numberDecimal: string };
  rentalUnit: string;
  images: string[];
}

const machinesByCategory = () => {
  const { category } = useLocalSearchParams();
  const [machines, setMachines] = useState<Machine[]>([]);

  const getMachinesByCategory = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(
        `${constants.base_url}/api/machine/category/${category}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("machinesByCategory", response.data?.machines);

      setMachines(response.data?.machines || []);
    } catch (error) {
      console.error("Error fetching machines:", error);
    }
  };

  useEffect(() => {
    getMachinesByCategory();
  }, [category]);

  console.log(category);
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="px-4 py-6">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          Available Machines
        </Text>

        {machines.length > 0 ? (
          machines.map((machine) => (
            <View
              key={machine._id}
              className="bg-white rounded-xl shadow-lg mb-4 p-4 flex-row items-center"
            >
              <Image
                source={{ uri: machine.images[0] }}
                className="w-24 h-24 rounded-lg mr-4"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900">
                  {machine.name}
                </Text>
                <Text className="text-gray-600">Model: {machine.model}</Text>
                <Text className="text-gray-500">Year: {machine.yearOfMfg}</Text>
                <Text className="text-indigo-500 font-bold">
                  ₹{machine.rentalCost.$numberDecimal} / {machine.rentalUnit}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: `/machineDetail`,
                    params: { machineId: machine._id },
                  })
                } // Expo Router Navigation
                className="p-2 bg-indigo-500 rounded-full"
              >
                <Ionicons name="chevron-forward" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text className="text-gray-600">
            No machines available in your village.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default machinesByCategory;

const styles = StyleSheet.create({});
