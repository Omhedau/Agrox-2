import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import constants from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";

interface Machine {
  _id: string;
  ownerId: string;
  bookingIds: string[];
  reviewId: string[];
  name: string;
  model: string;
  description: string;
  yearOfMfg: number;
  rentalStart: string;
  rentalEnd: string;
  operatingArea: any;
  rentalCost: any;
  rentalUnit: "hour" | "day" | "week" | "month" | "hect";
  images: string[];
  documents: string[];
  createdAt: string;
  updatedAt: string;
}

const Machines = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const { category } = useLocalSearchParams();

  const getMachines = async () => {
    try {
      const village = "Vadgaon";
      const response = await axios.post(
        `${constants.base_url}/api/machine/all`,
        {
          village,
          category,
        }
      );
      setMachines(response.data.machines);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMachines();
  }, []);

  const handleViewDetails = (MachineId: string) => {
    router.push({
      pathname: "/machineDetail",
      params: { MachineId },
    });
  };

  return (
    <ScrollView className="p-4 bg-gray-50">
      <View className="flex-row items-center mb-6 bg-white p-3 rounded-full shadow-md border border-gray-300">
        <TextInput
          placeholder="Search machines..."
          placeholderTextColor="#9CA3AF"
          className="flex-1 text-gray-700 px-4"
        />
        <TouchableOpacity className="p-2 rounded-full bg-gray-200">
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4F46E5" />
      ) : machines.length === 0 ? (
        <Text className="text-center text-gray-600">No machines available</Text>
      ) : (
        machines.map((machine) => (
          <View
            key={machine._id}
            className="mb-6 bg-white p-5 rounded-3xl shadow-md border border-gray-200"
          >
            <Image
              source={{
                uri: `${machine.images[0]}.jpg` || "https://i.imgur.com/yGRjHHH.jpeg",
              }}
              className="w-full h-56 rounded-3xl mb-4"
              resizeMode="cover"
            />
            <Text className="text-2xl font-bold text-gray-900 mb-1">
              {machine.name}
            </Text>
            <Text className="text-gray-500 text-sm mb-2">
              Model: {machine.model}
            </Text>
            <Text className="text-gray-600 mb-2">{machine.description}</Text>
            <Text className="text-gray-700 font-semibold">
              Year: {machine.yearOfMfg}
            </Text>
            <Text className="text-gray-700">
              Rental Period: {machine.rentalStart} - {machine.rentalEnd}
            </Text>
            <Text className="text-gray-700 font-semibold">
              Rental Cost: ₹
              {parseFloat(machine.rentalCost.$numberDecimal).toFixed(2)} per{" "}
              {machine.rentalUnit}
            </Text>

            <View className="mt-4">
              <TouchableOpacity
                onPress={() => handleViewDetails(machine._id)}
                className="bg-indigo-500 py-3 rounded-2xl shadow-lg"
              >
                <Text className="text-white text-center font-semibold text-lg">
                  View Details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default Machines;
