import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import useUserStore from "@/store/userStore";
import constants from "@/constants/data";

enum UserRole {
  Owner = "Owner",
  Farmer = "Farmer",
  Admin = "Admin",
}

interface User {
  name: string;
  role: UserRole;
}

const Home: React.FC = () => {
  const { user } = useUserStore() as { user?: User };
  const router = useRouter();

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center">
        <Text className="text-lg text-gray-700">Loading user data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView showsVerticalScrollIndicator={false} className="px-4 py-6">
        {/* Hero Section */}
        <View className="relative mb-8">
          <Image
            source={{
              uri: "https://images.stockcake.com/public/e/f/e/efee7fea-b7fa-480c-be8a-390738cbc117_medium/proud-field-farmer-stockcake.jpg",
            }}
            className="w-full h-60 rounded-3xl"
            resizeMode="cover"
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.6)", "transparent"]}
            className="absolute inset-0 rounded-3xl"
          />
          <View className="absolute bottom-6 left-6">
            <Text className="text-white text-2xl font-bold">
              Welcome, {user.name} 👋
            </Text>
            <Text className="text-white text-lg mt-1">
              Empowering farmers with technology!
            </Text>
          </View>
        </View>

        {/* Role-based Actions */}
        <View className="mb-6">
          {user.role === UserRole.Owner ? (
            <TouchableOpacity
              onPress={() => router.push("../(owner)")}
              className="bg-white p-5 rounded-xl shadow-md flex-row items-center"
              style={styles.cardShadow}
            >
              <Ionicons name="business-outline" size={28} color="#4F83CC" />
              <Text className="text-lg font-semibold text-gray-900 ml-3">
                Switch to Owner Dashboard
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => router.push("/(owner)/(tabs)/dashboard")}
              className="bg-white rounded-xl shadow-md overflow-hidden"
              style={styles.cardShadow}
            >
              <View className="p-5 text-center">
                <Text className="text-[#4F83CC] text-center text-lg font-bold">
                  Become an Owner
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity
            className="bg-white p-5 rounded-lg shadow-md flex-1 mx-2 flex-row items-center"
            onPress={() => router.push("/home")}
            style={styles.cardShadow}
          >
            <Ionicons name="construct-outline" size={24} color="#4F83CC" />
            <Text className="ml-2 text-gray-900 font-medium">
              Rent Machinery
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white p-5 rounded-lg shadow-md flex-1 mx-2 flex-row items-center"
            onPress={() => router.push("/home")}
            style={styles.cardShadow}
          >
            <Ionicons name="document-text-outline" size={24} color="#4F83CC" />
            <Text className="ml-2 text-gray-900 font-medium">View Schemes</Text>
          </TouchableOpacity>
        </View>
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

export default Home;
