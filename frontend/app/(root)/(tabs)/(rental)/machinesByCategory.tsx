import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
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

const MachinesByCategory = () => {
  const { category } = useLocalSearchParams();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [refreshing, setRefreshing] = useState(false); // Refresh state

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getMachinesByCategory(); // Fetch new data
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#F3F4F6]">
      <ScrollView
        className="px-4 py-6"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          Available Machines
        </Text>

        {machines.length > 0 ? (
          machines.map((machine) => (
            <View
              key={machine._id}
              className="bg-white rounded-xl shadow-lg mb-4 p-4 flex-row items-center"
              style={styles.cardShadow}
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
                <Text className="text-[#4F83CC] font-bold">
                  ₹{machine.rentalCost.$numberDecimal} / {machine.rentalUnit}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: `/machineDetail`,
                    params: { machineId: machine._id },
                  })
                }
                className="p-2 bg-[#4F83CC] rounded-full"
              >
                <Ionicons name="chevron-forward" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text className="text-gray-600">
            No machines available in this category.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MachinesByCategory;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
});
