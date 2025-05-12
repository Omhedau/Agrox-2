import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RecommendLayout = () => {
  return (
    <Stack initialRouteName="recommend">
      <Stack.Screen name="recommend" options={{ headerShown: false }} />
      <Stack.Screen name="cropRecomendation" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RecommendLayout;
