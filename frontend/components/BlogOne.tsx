import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

const BlogOne = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title */}
      <Text style={styles.title}>How to Use the Owner Side of the Equipment Rental Feature</Text>

      {/* Section 1 */}
      <Text style={styles.sectionTitle}>1. Register and Log In</Text>
      <Text style={styles.paragraph}>
        To start using the app as an owner, you need to register with your mobile number and create an account. Once registered, log in to access the owner dashboard.
      </Text>

      {/* Section 2 */}
      <Text style={styles.sectionTitle}>2. Adding a Machine</Text>
      <Text style={styles.paragraph}>
        Navigate to the "Add Machine" section where you can list your equipment. Fill in the details such as:
      </Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItem}>• Machine Name</Text>
        <Text style={styles.listItem}>• Description</Text>
        <Text style={styles.listItem}>• Rental Cost and Rental Unit</Text>
        <Text style={styles.listItem}>• Upload Machine Image</Text>
        <Text style={styles.listItem}>• Availability Status</Text>
        <Text style={styles.listItem}>• Select Operating Areas (Villages)</Text>
      </View>

      {/* Section 3 */}
      <Text style={styles.sectionTitle}>3. Managing Your Listings</Text>
      <Text style={styles.paragraph}>
        Owners can edit, update, or delete their listed machines anytime. If a machine is not available for rent, change its status accordingly.
      </Text>

      {/* Section 4 */}
      <Text style={styles.sectionTitle}>4. Connecting with Users</Text>
      <Text style={styles.paragraph}>
        Users can browse available machines in their village, view the owner’s contact details, and directly call to negotiate and finalize the rental.
      </Text>

      {/* Section 5 */}
      <Text style={styles.sectionTitle}>5. Categories of Equipment</Text>
      <Text style={styles.paragraph}>
        Owners can list equipment under these categories:
      </Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItem}>• Tractor Implements</Text>
        <Text style={styles.listItem}>• Harvesting Machines</Text>
        <Text style={styles.listItem}>• Tillage Equipment</Text>
        <Text style={styles.listItem}>• Sowing and Planting Equipment</Text>
        <Text style={styles.listItem}>• Sprayers and Fertilizer Spreaders</Text>
        <Text style={styles.listItem}>• Irrigation Equipment</Text>
        <Text style={styles.listItem}>• Hay and Forage Equipment</Text>
        <Text style={styles.listItem}>• Land Leveling Equipment</Text>
        <Text style={styles.listItem}>• Threshing and Shelling Equipment</Text>
        <Text style={styles.listItem}>• Transport Equipment</Text>
      </View>

      {/* Section 6 */}
      <Text style={styles.sectionTitle}>6. Maximizing Your Earnings</Text>
      <Text style={styles.paragraph}>
        Keep your machine details updated and ensure your contact information is accurate so users can easily reach out for rental requests.
      </Text>
    </ScrollView>
  );
};

export default BlogOne;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#ffffff', // White background for better readability
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333333', // Dark gray for emphasis
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 15,
        color: '#555555', // Slightly lighter gray for headings
    },
    paragraph: {
        fontSize: 18,
        lineHeight: 28, // Improved line height for readability
        marginBottom: 20,
        color: '#666666', // Medium gray for body text
    },
    listContainer: {
        marginLeft: 20,
        marginBottom: 20,
    },
    listItem: {
        fontSize: 18,
        lineHeight: 28, // Consistent line height
        color: '#777777', // Medium gray for list items
    },
});