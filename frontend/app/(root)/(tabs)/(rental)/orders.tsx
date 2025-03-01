import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface OrderItemProps {
  item: {
    id: string;
    status: string;
    owner: string;
    image: any;
    date: string | null;
  };
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Pending":
      return <Ionicons name="time-outline" size={24} color="orange" />;
    case "Confirmed":
      return (
        <Ionicons name="checkmark-circle-outline" size={24} color="blue" />
      );
    case "InProgress":
      return <Ionicons name="reload-outline" size={24} color="purple" />;
    case "Completed":
      return (
        <Ionicons
          name="checkmark-done-circle-outline"
          size={24}
          color="green"
        />
      );
    case "Cancelled":
      return <Ionicons name="close-circle-outline" size={24} color="red" />;
    default:
      return null;
  }
};

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <TouchableOpacity onPress={() => router.push("/orderdetail")}>
      <View className="flex-row bg-white rounded-lg p-4 mb-3 items-center">
        <Image source={item.image} className="w-16 h-16 rounded-lg" />
        <View className="ml-4 flex-1">
          {item.status === "Pending" ? (
            <Text className="text-gray-800 text-sm">
              Waiting for Confirmation from{" "}
              <Text className="font-bold">{item.owner}</Text>
            </Text>
          ) : (
            <>
              <Text className="text-sm font-bold text-green-600">
                Completed On {item.date}
              </Text>
              <View className="mt-2">
                <Text className="text-lg text-yellow-500">⭐ ⭐ ⭐ ⭐ ⭐</Text>
                <Text className="text-xs text-blue-500">
                  Rate this Product Now
                </Text>
              </View>
            </>
          )}
        </View>
        <View>{getStatusIcon(item.status)}</View>
      </View>
    </TouchableOpacity>
  );
};

const OrdersScreen = () => {
  const [selectedTab, setSelectedTab] = useState("Pending");

  const orders = [
    {
      id: "1",
      status: "Pending",
      owner: "Mr. Xyz",
      image: require("@/assets/images/Tractor.png"),
      date: null,
    },
    {
      id: "2",
      status: "Pending",
      owner: "Ms. Jane",
      image: require("@/assets/images/Tractor.png"),
      date: null,
    },
    {
      id: "3",
      status: "Pending",
      owner: "Mr. Rahul",
      image: require("@/assets/images/Tractor.png"),
      date: null,
    },
    {
      id: "4",
      status: "Confirmed",
      date: "Feb 12",
      owner: "Mr. John",
      image: require("@/assets/images/Tractor.png"),
    },
    {
      id: "5",
      status: "Confirmed",
      date: "Feb 13",
      owner: "Mr. Smith",
      image: require("@/assets/images/Tractor.png"),
    },
    {
      id: "6",
      status: "InProgress",
      date: "Feb 16",
      owner: "Mr. Patel",
      image: require("@/assets/images/Tractor.png"),
    },
    {
      id: "7",
      status: "Completed",
      date: "Feb 10",
      owner: "Mr. Alex",
      image: require("@/assets/images/Tractor.png"),
    },
    {
      id: "8",
      status: "Cancelled",
      date: "Feb 9",
      owner: "Mr. Liam",
      image: require("@/assets/images/Tractor.png"),
    },
  ];

  const filteredOrders = orders.filter((order) => order.status === selectedTab);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row mb-4"
        >
          {["Pending", "Confirmed", "InProgress", "Completed", "Cancelled"].map(
            (tab) => (
              <TouchableOpacity
                key={tab}
                className={`px-6 py-2 rounded-full mx-1 ${
                  selectedTab === tab ? "bg-green-500" : "bg-gray-300"
                }`}
                onPress={() => setSelectedTab(tab)}
              >
                <Text
                  className={`text-sm ${
                    selectedTab === tab
                      ? "text-white font-bold"
                      : "text-gray-800"
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderItem item={item} />}
      />
    </View>
  );
};

export default OrdersScreen;
