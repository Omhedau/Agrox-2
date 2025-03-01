import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

const OrderDetail = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Order Details</Text>
      <Text style={styles.orderId}>Order ID - #51SD51V56SF</Text>

      {/* Machine Image */}
      <Image
        source={require("@/assets/images/Tractor.png")}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Order Status Section */}
      <View style={styles.statusContainer}>
        <Text style={styles.status}>🟢 Order Booked</Text>
        <Text style={styles.pending}>
          ⚪ Waiting for Confirmation from{" "}
          <Text style={styles.bold}>Mr. Xyz</Text>
        </Text>
        <Text style={styles.pending}>⚪ Order Completed</Text>
      </View>

      {/* Review Section */}
      <View style={styles.reviewContainer}>
        <Text style={styles.reviewTitle}>Rate this Service</Text>
        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <FontAwesome
                name={star <= rating ? "star" : "star-o"}
                size={24}
                color="gold"
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Write your review..."
          multiline
          value={review}
          onChangeText={setReview}
        />
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity style={[styles.button, styles.chatButton]}>
        <Text style={styles.buttonText}>💬 Chat with Owner</Text>
      </TouchableOpacity>

      {/* Order Summary */}
      <View style={styles.orderSummary}>
        <Text style={styles.orderValue}>Machine Rent: ₹999</Text>
        <Text style={styles.orderValue}>Platform Fee: ₹10</Text>
        <View style={styles.divider} />
        <Text style={styles.totalAmount}>Total Amount: ₹1009</Text>
        <Text style={styles.paymentMode}>Payment Mode: Cash On Delivery</Text>
      </View>
    </ScrollView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  orderId: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#ddd",
  },
  statusContainer: {
    backgroundColor: "#E8F0FE",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  pending: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  reviewContainer: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginBottom: 10,
    height: 80,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  chatButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  orderSummary: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  orderValue: {
    fontSize: 14,
    color: "#333",
    marginBottom: 3,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 5,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  paymentMode: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
});
