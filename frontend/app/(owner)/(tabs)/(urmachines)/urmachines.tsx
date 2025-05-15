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
    availableStatus: boolean;
  }

  const [machines, setMachines] = useState<Machine[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMachines = async () => {
    try {
      setRefreshing(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.error("Error: No token found in AsyncStorage");
        setRefreshing(false);
        return;
      }

      const response = await axios.get(
        `${constants.base_url}/api/machine/owner`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Machines fetched successfully:", response.data);
      setMachines(response.data?.machines || []);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error fetching machines:", error.response.data);
      } else {
        console.error("Error fetching machines:", (error as Error).message);
      }
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const onRefresh = useCallback(() => {
    fetchMachines();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#F3F4F6]">
      <ScrollView
        className="px-4 py-6"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4F83CC"]}
          />
        }
      >
        <Text className="text-2xl font-extrabold text-[#374151] mb-4">
          Your Machines
        </Text>

        {machines.length > 0 ? (
          machines.map((machine) => (
            <View
              key={machine._id}
              className={`rounded-xl shadow-lg mb-4 p-4 flex-row items-center ${
                machine.availableStatus ? "bg-white" : "bg-red-50"
              }`}
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
                  {!machine.availableStatus && (
                    <Text className="text-red-500 text-sm"> (Unavailable)</Text>
                  )}
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
                    pathname: `/ownermachinedetail`,
                    params: { machineId: machine._id },
                  })
                }
                className={`p-2 rounded-full ${
                  machine.availableStatus ? "bg-[#4F83CC]" : "bg-gray-400"
                }`}
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

        <View className="h-16" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Machines;

const styles = {
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
};