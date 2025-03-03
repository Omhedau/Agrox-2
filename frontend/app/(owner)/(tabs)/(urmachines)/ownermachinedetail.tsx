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
import Reviews from "@/components/Reviews";
  
  const MachineDetail = () => {
    const router = useRouter();
    const { machineId } = useLocalSearchParams();

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
        images?: string[];
        name: string;
        model?: string;
        description?: string;
        yearOfMfg: number;
        rentalCost?: any;
        rentalUnit?: string;
        ownerId: Owner;
        availableStatus: Boolean;

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
                params: { machine: JSON.stringify(machine) },
            });
        }
    };

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
        {/* Hero Image Section */}
        <View className="relative">
          <Image
            source={{
              uri:
                machine.images && machine.images.length > 0
                  ? machine.images[0]
                  : "",
            }}
            className="w-full h-80 rounded-b-3xl shadow-lg"
            resizeMode="cover"
          />
          <View className="absolute -bottom-2 left-0 right-0 bg-black/40 p-4 pb-7 rounded-t-xl">
            {/* Truncate long machine names */}
            <Text
              className="text-white text-3xl font-bold"
              numberOfLines={1} // Truncate after 1 line
              ellipsizeMode="tail" // Add "..." at the end if truncated
            >
              {machine.name}
            </Text>
            {/* Adjusted spacing for the model text */}
            <Text className="text-white text-lg mt-2">{machine.model}</Text>
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

          <Reviews />
        </View>
      </ScrollView>
    );
};

export default MachineDetail;