import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const MachinesServices = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-100 p-6">
      {/* Header */}
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        Machines Services
      </Text>

      {/* Info Section */}
      <View className="bg-white p-4 rounded-2xl shadow-md">
        <Text className="text-lg text-gray-700">
          Manage and track your machines here.
        </Text>
      </View>

      {/* Add Machine Button */}
      <TouchableOpacity
        className="mt-6 bg-green-500 p-4 rounded-xl shadow-lg items-center"
        onPress={() => router.push("/addmachines")} // Expo Router Navigation
      >
        <Text className="text-white font-semibold text-lg">➕ Add Machine</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MachinesServices;
