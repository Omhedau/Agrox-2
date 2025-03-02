import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
} from "react-native";
import React from "react";

const ShowMachine = () => {
  const machine = {
    name: "John Dairy Combine Harvester",
    model: "JD-x950",
    description:
      "A John dere jdx 950 is a high performance combine harvester designed for efficient crop harvesting.",
    yearOfMfg: 2018,
    rentalCost: 3000,
    rentalUnit: "day",
    operatingArea: ["Field 1", "Field 2", "Field 3", "Field 4"],
    imageUrl: "https://via.placeholder.com/300",
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: machine.imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{machine.name}</Text>
          <Text style={styles.model}>Model: {machine.model}</Text>
          <Text style={styles.description}>{machine.description}</Text>
          <Text style={styles.year}>
            Year of Manufacture: {machine.yearOfMfg}
          </Text>
          <Text style={styles.cost}>
            Rental Cost: ₹{machine.rentalCost}/{machine.rentalUnit}
          </Text>
          <Button
            title="Book Now"
            onPress={() => alert("Booking functionality coming soon!")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ShowMachine;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  model: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
  year: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
  cost: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
