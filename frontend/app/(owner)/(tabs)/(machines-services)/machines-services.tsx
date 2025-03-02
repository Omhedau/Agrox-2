import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const MachinesServices = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Machines Services</Text>

      {/* Info Section */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Manage and track your machines here.</Text>
      </View>

      {/* Add Machine Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/addmachines")}>
        <Text style={styles.buttonText}>➕ Add Machine</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  infoText: {
    fontSize: 16,
    color: "#555",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#28A745",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "600",
  },
});

export default MachinesServices;
