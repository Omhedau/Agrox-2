import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

const MachineConfirm = () => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const { machine } = useLocalSearchParams(); // Get params safely

  let machineData;
  try {
    machineData = machine ? JSON.parse(machine as string) : null; // Parse JSON safely
  } catch (error) {
    console.error("Invalid machine data:", error);
    machineData = null;
  }

  const paymentOptions = [
    { id: "cod", label: "Cash On Delivery" },
    { id: "netbanking", label: "Net Banking" },
    { id: "upi", label: "UPI Payment" },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      {machineData ? (
        <>
          {/* Machine Image Section */}
          <View className="relative">
            <Image
              source={{
                uri: "https://mahindrafarmmachinery.com/sites/default/files/2024-12/8.%20Combine%20Harvester%20Working%2C%20Uses%2C%20and%20Importance-min%20%281%29_0.jpg",
              }}
              className="w-full h-80"
              resizeMode="cover"
            />
          </View>

          {/* Machine Details Section */}
          <View className="p-6 bg-white rounded-t-3xl -mt-8 shadow-lg">
            <Text className="text-3xl font-rubik-semi-bold text-gray-900">{machineData.name}</Text>
            <Text className="text-gray-500 font-rubik text-lg">Model: {machineData.model || "N/A"}</Text>
            <Text className="text-gray-600 font-rubik mt-4">{machineData.description || "No description available"}</Text>

            {/* Farm Address Section */}
            <View className="bg-green-100  p-4 rounded-lg mt-4">
              <Text className="font-rubik-medium text-gray-800">Farm Address</Text>
              <Text className="text-gray-600 font-rubik mt-1">
                Address, Address, Address, Address,{"\n"}
                Address, Address, Address, Address, 444444
              </Text>
              <TouchableOpacity className="mt-2 bg-green-600 py-2 font-rubik px-6 rounded-full self-end">
                <Text className="text-white font-semibold">Change Address</Text>
              </TouchableOpacity>
            </View>

            {/* Payment Details Section */}
            <View className="mt-6">
              <Text className="text-lg font-rubik-semi-bold text-gray-800">Payment Details</Text>

              {paymentOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  className="flex-row items-center mt-3"
                  onPress={() => setSelectedPayment(option.id)}
                >
                  {/* Checkbox Styled Radio Button */}
                  <View
                    className={`w-6 h-6 rounded-md border-2 mr-3 flex items-center justify-center ${selectedPayment === option.id ? "border-black  bg-primary-500" : "border-gray-500 bg-white"
                      }`}
                  >
                    {/* White Checkmark (Only When Selected) */}
                    {selectedPayment === option.id && (
                      <Text className="text-white  w-2 h- text-lg font-bold">🟢</Text>
                    )}
                  </View>

                  {/* Payment Text */}
                  <Text className={`font-rubik ${selectedPayment === option.id ? "text-black" : "text-gray-600"}`}>
                    {option.label}
                  </Text>

                </TouchableOpacity>
              ))}
            </View>

            {/* Confirm Button */}
            <TouchableOpacity className="mt-6 bg-primary-500 py-4 rounded-full shadow-md active:bg-green-800">
              <Text className="text-white font-rubik text-center font-bold text-xl">Confirm</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="flex-1 justify-center font-rubik items-center">
          <Text className="text-gray-600">No machine details available.</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default MachineConfirm;
