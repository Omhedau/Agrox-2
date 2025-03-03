import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import constants from "@/constants/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUserStore from "@/store/userStore";

const Reviews = ({ machineId }: { machineId: string }) => {
  const { user } = useUserStore() as {
    user: {
      _id: string;
      name: string;
    };
  };

  const [reviews, setReviews] = useState<
    {
      _id: string;
      rating: number;
      review: string;
      userId: { _id: string; name: string };
    }[]
  >([]);

  const [userReview, setUserReview] = useState<{
    _id: string;
    rating: number;
    review: string;
    userId: { _id: string; name: string };
  } | null>(null);

  const [formData, setFormData] = useState({
    review: "",
    rating: 0,
  });

  const [isEditing, setIsEditing] = useState(false); // Track if editing mode is active

  const handleInputChange = (key: string, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };

  const validateForm = () => {
    if (!formData.review) {
      alert("Please write your review");
      return false;
    }
    if (formData.rating === 0) {
      alert("Please select a rating");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;

      const reviewData = {
        machineId: machineId,
        rating: formData.rating,
        reviewtext: formData.review,
      };

      const token = await AsyncStorage.getItem("token");

      const response = await axios.post(
        `${constants.base_url}/api/review`,
        { reviewData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Review submitted successfully");
        setFormData({ review: "", rating: 0 });
        getAllReviews(); // Refresh the reviews
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllReviews = async () => {
    try {
      const response = await axios.get(
        `${constants.base_url}/api/review/${machineId}`
      );

      const allReviews = response.data.reviews;
      console.log("Reviews:", allReviews);

      const currentUserReview = allReviews.find(
        (review: any) => review.userId._id === user._id
      );

      setUserReview(currentUserReview || null);

      // Exclude the current user's review from the displayed list
      const otherReviews = allReviews.filter(
        (review: any) => review.userId._id !== user._id
      );

      setReviews(otherReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  // Function to handle editing a review
  const handleEditReview = async () => {
    try {
      if (!validateForm()) return;

      const token = await AsyncStorage.getItem("token");

      const response = await axios.put(
        `${constants.base_url}/api/review/${userReview?._id}`,
        {
          rating: formData.rating,
          reviewText: formData.review,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Review updated successfully");
        setFormData({ review: "", rating: 0 });
        setIsEditing(false); // Exit editing mode
        getAllReviews(); // Refresh the reviews
      } else {
        alert("Error updating review");
      }
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  // Function to handle deleting a review
  const handleDeleteReview = () => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete your review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");

              const response = await axios.delete(
                `${constants.base_url}/api/review/${userReview?._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (response.status === 204) {
                alert("Review deleted successfully");
                setFormData({ review: "", rating: 0 });
                setUserReview(null); // Clear the user's review
                getAllReviews(); // Refresh the reviews
              } else {
                alert("Error deleting review");
              }
            } catch (error) {
              console.error("Error deleting review:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {!userReview && (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Add Your Review</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Rating:</Text>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleInputChange("rating", star)}
              >
                <Text style={styles.star}>
                  {star <= formData.rating ? "★" : "☆"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Write your review..."
            multiline
            textAlignVertical="top"
            value={formData.review}
            onChangeText={(text) => handleInputChange("review", text)}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      )}

      {userReview && (
        <View style={styles.reviewsContainer}>
          <View
            style={[
              styles.reviewCard,
              { borderColor: "#4A90E2", borderWidth: 2 },
            ]}
          >
            <Text style={styles.reviewName}>Your Review</Text>
            {isEditing ? (
              <>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingLabel}>Rating:</Text>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => handleInputChange("rating", star)}
                    >
                      <Text style={styles.star}>
                        {star <= formData.rating ? "★" : "☆"}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TextInput
                  style={[styles.input, { height: 100 }]}
                  placeholder="Write your review..."
                  multiline
                  textAlignVertical="top"
                  value={formData.review}
                  onChangeText={(text) => handleInputChange("review", text)}
                />
              </>
            ) : (
              <>
                <Text style={styles.reviewText}>{userReview.review}</Text>
                <Text style={styles.reviewRating}>
                  {"★".repeat(userReview.rating) +
                    "☆".repeat(5 - userReview.rating)}
                </Text>
              </>
            )}
            <View style={styles.buttonContainer}>
              {isEditing ? (
                <>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleEditReview}
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setIsEditing(false)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      setFormData({
                        review: userReview.review,
                        rating: userReview.rating,
                      });
                      setIsEditing(true);
                    }}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDeleteReview}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      )}

      <View style={styles.reviewsContainer}>
        {reviews.length > 0 &&
          reviews.map((review, index) => (
            <View key={index} style={styles.reviewCard}>
              <Text style={styles.reviewName}>{review.userId.name}</Text>
              <Text style={styles.reviewText}>{review.review}</Text>
              <Text style={styles.reviewRating}>
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 5, backgroundColor: "#F5F7FA" },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  formTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  input: {
    width: "100%",
    backgroundColor: "#F5F7FA",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  ratingLabel: { marginRight: 10 },
  star: { fontSize: 24, color: "#FFD700", marginHorizontal: 2 },
  submitButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  submitButtonText: { color: "#fff", fontWeight: "bold" },
  reviewsContainer: { marginTop: 10 },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  reviewName: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  reviewText: { fontSize: 14, marginBottom: 10 },
  reviewRating: { fontSize: 16, color: "#FFD700" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: { backgroundColor: "#FFA500", padding: 8, borderRadius: 5 },
  deleteButton: { backgroundColor: "#FF4D4D", padding: 8, borderRadius: 5 },
  saveButton: { backgroundColor: "#4CAF50", padding: 8, borderRadius: 5 },
  cancelButton: { backgroundColor: "#9E9E9E", padding: 8, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
