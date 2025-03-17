import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import images from "@/constants/images";

const categories = [
  { name: "Seeds", image: images.seeds },
  { name: "Pesticides", image: images.pesticide },
  { name: "Fertilizers", image: images.fertilizer },
  { name: "Herbicides", image: images.herbicides },
  { name: "Crops", image: images.crop },
  { name: "Tools & Equipment", image: images.tools },
];

const Ecom = () => {
  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View className="relative">
        <View style={styles.header}>
          <Text style={styles.locationLabel}>Current Location</Text>
          <Text style={styles.location}>California, USA</Text>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={24} color="#4F83CC" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for 'products'"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const scrollX = event.nativeEvent.contentOffset.x;
            }}
            scrollEventThrottle={16}
          >
            {categories.map((category, index) => {
              return (
                <View key={index} style={styles.categoryItem}>
                  <Image source={category.image} style={styles.categoryImage} />
                  <Text style={styles.categoryText}>{category.name}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#4F83CC",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  locationLabel: {
    color: "#d1f7c4",
    fontSize: 14,
    marginTop: 10,
  },
  location: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    paddingLeft: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  categoriesWrapper: {
    marginTop: 2,
    borderRadius: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
    position: "absolute",
    bottom: -120,
  },
  categoryItem: {
    width: 120,
    backgroundColor: "#e0e7ff",
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 10,
    alignItems: "center",
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

export default Ecom;
