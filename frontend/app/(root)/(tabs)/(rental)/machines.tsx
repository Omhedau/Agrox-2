import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
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
  const [refreshing, setRefreshing] = useState(false);

  const fetchMachines = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${constants.base_url}/api/machine/available/village`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMachines(response.data?.machines || []);
    } catch (error) {
      console.error("Error fetching machines:", error);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchMachines();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        className="px-4 py-6"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Rental Carousel */}
        <RentalCarousel />

        {/* Categories */}
        <Categories />

        {/* Available Machines Section */}
        <Text className="text-3xl font-extrabold mt-6 mb-5 text-[#374151]">
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
            No machines available in your village.
          </Text>
        )}

        {/* Add space at the bottom */}
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  cardShadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 3,
  },
};

export default Machines;
