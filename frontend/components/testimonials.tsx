import React from "react";
import { View, Text, StyleSheet } from "react-native";

const testimonials = [
  {
    id: "1",
    name: "Ganpat Jadhav",
    feedback:
      "FarmEase cha owner section khup sope ani upyogi ahe. Sheti vyavasthapan khoop sope jhale!",
  },
  {
    id: "2",
    name: "Savita Pawar",
    feedback:
      "Dashboard cha UI neat ahe. Shetkaryansathi ati sundar upayogkarak app!",
  },
  {
    id: "3",
    name: "Ramesh Patil",
    feedback:
      "FarmEase mule sheti che sakal upay khup sopat hotay. Mala hya application ne khup madat keli.",
  },
  {
    id: "4",
    name: "Jyoti Shinde",
    feedback:
      "Shetkaryansathi ek dam best app. Krushi vyavsayat technology vaaparayla shikli!",
  },
];

interface TestimonialCardProps {
  name: string;
  feedback: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, feedback }) => (
  <View style={styles.card}>
    <Text style={styles.cardText}>"{feedback}"</Text>
    <Text style={styles.cardName}>- {name}</Text>
  </View>
);

const Testimonials = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🚜 शेतीमालक काय म्हणतात? </Text>
      {testimonials.map((item) => (
        <TestimonialCard
          key={item.id}
          name={item.name}
          feedback={item.feedback}
        />
      ))}
    </View>
  );
};

export default Testimonials;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#444",
  },
  cardName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginTop: 10,
    textAlign: "right",
  },
});
