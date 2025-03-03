import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import constants from '@/constants/images';

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
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Categories</Text>
      <View style={styles.grid}>
        {categories.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => router.push({ pathname: `/`, params: { category: item.name } })}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.categoryName}>{item.name}</Text>
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
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    width: '45%',
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555',
  },
});
