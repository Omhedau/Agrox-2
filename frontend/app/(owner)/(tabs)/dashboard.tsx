import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import OwnerAdvertisement from '@/components/OwnerAdvertisement';
import { useRouter } from 'expo-router';

const DashBoard = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/(owner)/blogone'); // Replace with your blog screen route
  };

  return (
    <View style={styles.container}>
      <OwnerAdvertisement />
      <TouchableOpacity style={styles.card} onPress={handlePress}>
        <Text style={styles.cardTitle}>📖 Blog</Text>
        <Text style={styles.cardSubtitle}>Learn how to use the owner section</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginTop: 20,
    backgroundColor: '#212121',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardSubtitle: {
    fontSize: 20,
    color: '#ffffff',
    marginTop: 4,
    textAlign: 'center',
  },
});
