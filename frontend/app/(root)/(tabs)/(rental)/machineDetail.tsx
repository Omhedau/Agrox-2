import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import constants from "@/constants/data";

const MachineDetail = () => {
  const router = useRouter();
  const { machineId } = useLocalSearchParams();

  console.log("Machine ID:", machineId);

  interface Machine {
    images?: string[];
    name: string;
    model?: string;
    description?: string;
    yearOfMfg: number;
    rentalCost?: any;
    rentalUnit?: string;
  }

  const [machine, setMachine] = useState<Machine | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMachineDetails = async () => {
      try {
        const response = await axios.get(
          `${constants.base_url}/api/machine/${machineId}`
        );
        console.log("Machine details:", response.data.machine);
        setMachine(response.data.machine);
      } catch (error) {
        console.error("Error fetching machine details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMachineDetails();
  }, [machineId]);

  if (loading) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!machine) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center">
        <Text className="text-gray-600 text-lg font-rubik-bold">
          Machine details not found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="bg-gray-50">
      <View className="relative">
        <Image
          source={{
            uri: machine.images && machine.images.length > 0 ? machine.images[0] : "",
          }}
          className="w-full h-80 rounded-b-3xl shadow-lg"
          resizeMode="cover"
        />
      </View>

      <View className="p-6 h-full bg-white rounded-t-3xl shadow-lg -mt-6">
        <Text className="text-3xl font-semibold text-gray-900 mb-2">
          {machine.name}
        </Text>
        <Text className="text-gray-500 text-lg">
          Model: {machine.model || "N/A"}
        </Text>
        <Text className="text-gray-700 mt-4 leading-relaxed">
          {machine.description || "No description available."}
        </Text>

        <View className="mt-6 space-y-4">
          <Text className="text-gray-800 text-lg">
            🏷️ Year: <Text className="font-medium">{machine.yearOfMfg}</Text>
          </Text>
         
          <Text className="text-gray-800 text-lg">
            💰 Rental Cost:{" "}
            <Text className="text-blue-600 font-bold">
              ₹{parseFloat(machine.rentalCost.$numberDecimal).toFixed(2)}
            </Text>{" "}
            per {machine.rentalUnit || "N/A"}
          </Text>
        </View>

      

        <View className="mt-8">
          <Text className="text-2xl font-semibold text-gray-900 mb-4">
            Reviews
          </Text>
          <View> 
            {["John Doe", "Jane Smith", "Bob Johnson"].map((name, index) => (
              <View key={index} className="bg-gray-50 p-4 mb-2 rounded-xl shadow">
                <Text className="text-lg font-medium text-gray-800">
                  {name}
                </Text>
                <Text className="text-gray-600 mt-2">
                  {index === 0
                    ? "Great machine! Smooth rental experience."
                    : index === 1
                    ? "Excellent condition, highly recommend!"
                    : "Decent machine but had minor issues."}
                </Text>
                <Text className="text-yellow-500 mt-2">
                  {"★".repeat(5 - index) + "☆".repeat(index)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MachineDetail;
