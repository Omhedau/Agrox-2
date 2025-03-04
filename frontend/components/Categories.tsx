import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import constants from "@/constants/images";
import { LinearGradient } from "expo-linear-gradient";

const Categories = () => {
  const router = useRouter();

  const categories = [
    { name: "Tractor Implements", image: constants.image1 },
    { name: "Harvesting Machines", image: constants.image2 },
    { name: "Tillage Equipment", image: constants.image3 },
    { name: "Sowing and Planting Equipment", image: constants.image4 },
    { name: "Sprayers and Fertilizer Spreaders", image: constants.image5 },
    { name: "Irrigation Equipment", image: constants.image6 },
    { name: "Hay and Forage Equipment", image: constants.image7 },
    { name: "Land Leveling Equipment", image: constants.image8 },
    { name: "Threshing and Shelling Equipment", image: constants.image9 },
    { name: "Transport Equipment", image: constants.image10 },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Categories</Text>
      <View style={styles.grid}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: `/(root)/(tabs)/(rental)/machinesByCategory`,
                params: { category: item.name },
              })
            }
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={["#ffffff", "#e0e7ff"]} // Subtle gradient
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
              </View>
              <Text style={styles.categoryName}>{item.name}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F3F4F6", // Matches the main component's background
    paddingHorizontal: 6,
    paddingTop: 20,
    paddingBottom: 40, // Added padding to create a spacious layout
  },
  header: {
    fontSize: 32, // Larger font size for a bold header
    fontWeight: "800", // Bold weight for prominence
    marginBottom: 26, // Added margin for clean spacing
    textAlign: "left",
    color: "#374151", // Darker color for readability
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap", // Wrap the cards into multiple rows
    justifyContent: "space-between",
    gap: 12, // Add gap between cards
  },
  card: {
    width: "48%", // This ensures 2 cards fit per row (a little less than 50% width for spacing)
    height: 240, // Fixed height for cards
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000000", // Soft shadow for depth
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10, // Elevation for Android devices
    backgroundColor: "#fff", // White background for the card
    marginBottom: 12, // Added margin for spacing between cards
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    borderRadius: 16,
    position: "relative", // Keep text and image in place
  },
  imageContainer: {
    width: 120, // Increased width of the container
    height: 120, // Same height as width for a perfect circle
    borderRadius: 60, // Circular shape for the image
    backgroundColor: "#f3f4f6", // Soft gray background
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2, // Light border around the image
    borderColor: "#e5e7eb", // Light border for a soft outline
  },
  image: {
    width: 100, // Larger image size
    height: 100,
    resizeMode: "contain",
  },
  categoryName: {
    fontSize: 18, // Slightly larger font size for category names
    fontWeight: "600", // Bold and modern font weight
    color: "#1f2937", // Darker text color for visibility
    textAlign: "center",
    marginTop: 12,
  },
});
