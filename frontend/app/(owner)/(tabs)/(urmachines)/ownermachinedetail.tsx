import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import constants from "@/constants/data";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import Reviews from "@/components/Reviews";
import images  from "@/constants/images";

const MachineDetail = () => {
  const router = useRouter();
  const { machineId } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);

  console.log("Machine ID:", machineId);

  interface Owner {
    _id: string;
    mobile: string;
    name: string;
    role: string;
    village: {
      _id: string;
      village_code: string;
      village_name: string;
    };
  }

  interface Machine {
    _id: string;
    images?: string[];
    name: string;
    model?: string;
    description?: string;
    yearOfMfg: number;
    rentalCost?: any;
    rentalUnit?: string;
    ownerId: Owner;
    availableStatus: boolean;
  }

  const [machine, setMachine] = useState<Machine | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMachineDetails = useCallback(async () => {
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
      setRefreshing(false);
    }
  }, [machineId]);

  useEffect(() => {
    fetchMachineDetails();
  }, [fetchMachineDetails]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMachineDetails();
  }, [fetchMachineDetails]);

  const handleEdit = () => {
    if (machine) {
      router.push({
        pathname: "/editMachine",
        params: { machine: JSON.stringify(machine) },
      });
    }
  };

  const handleDelete = () => {
    if (machine) {
      router.push({
        pathname: "/deleteMachine",
        params: { machineId: machine._id },  // Only send the machine ID
      });
    }
  };

  if (loading && !refreshing) {
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
    <ScrollView 
      className="bg-gray-50"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#2563EB"]}
          tintColor="#2563EB"
        />
      }
    >
      {/* Hero Image Section */}
      <View className="relative">
        <Image
          source={{
            uri:
              machine.images && machine.images.length > 0
                ? machine.images[0]
                : images.Harvester,
          }}
          className="w-full h-80 rounded-b-3xl shadow-lg"
          resizeMode="cover"
        />
        <View className="absolute -bottom-2 left-0 right-0 bg-black/40 p-4 pb-7 rounded-t-xl">
          <Text
            className="text-white text-3xl font-bold"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {machine.name}
          </Text>
          <Text className="text-white text-lg mt-2">{machine.model}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between items-center mx-2 p-4">
        <Text
          className={`px-3 py-1 rounded-full text-lg font-bold ${
            machine.availableStatus
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {machine.availableStatus ? "Available" : "Not Available"}
        </Text>

        <View className="flex-row space-x-4">
          <TouchableOpacity
            onPress={handleEdit}
            className="bg-blue-500 p-3 mx-2 rounded-full"
          >
            <Feather name="edit" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            className="bg-red-500 p-3 mx-2 rounded-full"
          >
            <MaterialIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Machine Details Section */}
      <View className="p-6 bg-white rounded-t-3xl shadow-lg -mt-2">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          Machine Details
        </Text>

        <View className="space-y-4">
          <View className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <Text className="text-gray-500 text-sm">Description</Text>
            <Text className="text-gray-800 text-lg mt-1">
              {machine.description || "No description available."}
            </Text>
          </View>

          <View className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <Text className="text-gray-500 text-sm">Year of Manufacture</Text>
            <Text className="text-gray-800 text-lg mt-1">
              {machine.yearOfMfg}
            </Text>
          </View>

          <View className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <Text className="text-gray-500 text-sm">Rental Cost</Text>
            <Text className="text-blue-600 text-lg font-bold mt-1">
              ₹{parseFloat(machine.rentalCost.$numberDecimal).toFixed(2)} per{" "}
              {machine.rentalUnit || "N/A"}
            </Text>
          </View>
        </View>
      </View>

      {/* Owner Details Section */}
      <View className="p-6 mt-6 bg-white rounded-t-3xl shadow-lg">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          Owner Details
        </Text>

        <View className="bg-gray-50 p-4 rounded-xl shadow-sm">
          <Text className="text-gray-500 text-sm">Owner Name</Text>
          <Text className="text-gray-800 text-lg mt-1">
            {machine.ownerId.name}
          </Text>

          <Text className="text-gray-500 text-sm mt-3">Contact Number</Text>
          <Text className="text-gray-800 text-lg mt-1">
            {machine.ownerId.mobile}
          </Text>

          <Text className="text-gray-500 text-sm mt-3">Village</Text>
          <Text className="text-gray-800 text-lg mt-1">
            {machine.ownerId.village.village_name} (Code:{" "}
            {machine.ownerId.village.village_code})
          </Text>
        </View>
      </View>

      {/* Reviews Section */}
      <View className="p-6 mt-6 bg-white rounded-t-3xl shadow-lg">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Reviews</Text>
        <Reviews machineId={machine._id} />
      </View>
    </ScrollView>
  );
};

export default MachineDetail;