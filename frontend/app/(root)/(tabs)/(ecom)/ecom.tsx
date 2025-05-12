import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import images from "@/constants/images";

// Dummy product data
const dummyProducts = [
  {
    name: "High Yield Wheat Seeds",
    brand: "AgriGold",
    category: "Seeds",
    subCategory: "Wheat Seeds",
    images: [images.seeds],
    price: { mrp: 1200, sellingPrice: 999, discountPercentage: 16.75 },
    stock: { quantity: 50 },
    tags: ["Organic", "High Yield"],
  },
  {
    name: "Organic Pesticide Spray",
    brand: "GreenFarm",
    category: "Pesticides",
    subCategory: "Herbal Spray",
    images: [images.pesticide],
    price: { mrp: 800, sellingPrice: 699, discountPercentage: 12.63 },
    stock: { quantity: 12 },
    tags: ["Organic", "Pest Free"],
  },
  {
    name: "NPK 20-20-20 Fertilizer",
    brand: "FarmGrow",
    category: "Fertilizers",
    images: [images.fertilizer],
    price: { mrp: 1500, sellingPrice: 1299, discountPercentage: 13.4 },
    stock: { quantity: 20 },
    tags: ["NPK", "Boost Growth"],
  },
  {
    name: "Modern Farm Tools Kit",
    brand: "ToolMaster",
    category: "Tools & Equipment",
    images: [images.tools],
    price: { mrp: 3500, sellingPrice: 2999, discountPercentage: 14.28 },
    stock: { quantity: 8 },
    tags: ["Durable", "Heavy Duty"],
  },
];

const categories = [
  { name: "Seeds", image: images.seeds },
  { name: "Pesticides", image: images.pesticide },
  { name: "Fertilizers", image: images.fertilizer },
  { name: "Herbicides", image: images.herbicides },
  { name: "Crops", image: images.crop },
  { name: "Tools & Equipment", image: images.tools },
];

const Ecom = () => {
  const [selectedCategory, setSelectedCategory] = useState("Seeds");

  const handleCategorySelect = (ccategory: string) => {
    setSelectedCategory(ccategory);
  };

  const filteredProducts = dummyProducts.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.locationLabel}>Current Location</Text>
        <Text style={styles.location}>California, USA</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={24} color="#4F83CC" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryItem,
                selectedCategory === category.name && {
                  borderColor: "#4F83CC",
                  borderWidth: 2,
                },
              ]}
              onPress={() => handleCategorySelect(category.name)}
            >
              <Image source={category.image} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Products Section */}
      <View style={styles.productsHeader}>
        <Text style={styles.productsTitle}>
          Products in "{selectedCategory}"
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.productList}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <View key={index} style={styles.productCard}>
              {product.images && (
                <Image
                  source={product.images[0]}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              )}
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                {product.brand && (
                  <Text style={styles.productBrand}>
                    Brand: {product.brand}
                  </Text>
                )}
                <View style={styles.priceSection}>
                  <Text style={styles.sellingPrice}>
                    ₹{product.price.sellingPrice}
                  </Text>
                  <Text style={styles.mrp}>₹{product.price.mrp}</Text>
                  <Text style={styles.discount}>
                    ({product.price.discountPercentage.toFixed(1)}% off)
                  </Text>
                </View>
                <Text style={styles.stock}>
                  {product.stock.quantity > 0
                    ? `In Stock: ${product.stock.quantity}`
                    : "Out of Stock"}
                </Text>
                <View style={styles.tagWrapper}>
                  {product.tags &&
                    product.tags.map((tag, i) => (
                      <Text key={i} style={styles.tag}>
                        {tag}
                      </Text>
                    ))}
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noProductText}>
            No products available in {selectedCategory}.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f7" },
  header: {
    backgroundColor: "#4F83CC",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  locationLabel: { color: "#d1f7c4", fontSize: 14, marginTop: 10 },
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
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: "#333" },
  categoriesWrapper: { marginVertical: 15, paddingHorizontal: 10 },
  categoryItem: {
    width: 80,
    backgroundColor: "#e0e7ff",
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    alignItems: "center",
  },
  categoryImage: { width: 40, height: 40, borderRadius: 10, marginBottom: 5 },
  categoryText: { fontSize: 10, fontWeight: "bold", color: "#333" },
  productsHeader: { paddingHorizontal: 20, marginBottom: 10 },
  productsTitle: { fontSize: 20, fontWeight: "bold", color: "#374151" },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  productInfo: { padding: 10 },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  productBrand: { fontSize: 12, color: "#4F83CC", marginBottom: 2 },
  productSubcategory: { fontSize: 11, color: "#555", marginBottom: 4 },
  priceSection: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  sellingPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
    marginRight: 4,
  },
  mrp: {
    fontSize: 12,
    textDecorationLine: "line-through",
    color: "#888",
    marginRight: 4,
  },
  discount: { fontSize: 11, color: "green" },
  stock: { fontSize: 11, color: "#666", marginBottom: 5 },
  tagWrapper: { flexDirection: "row", flexWrap: "wrap", gap: 5 },
  tag: {
    backgroundColor: "#e5f4e3",
    color: "green",
    borderRadius: 10,
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginTop: 4,
  },
  noProductText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
});

export default Ecom;
