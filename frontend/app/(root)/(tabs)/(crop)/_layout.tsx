import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const CropLayout = () => {
  return (
    <Stack initialRouteName="crophealth">
      <Stack.Screen name="crophealth" options={{ headerShown: false }} />
      <Stack.Screen name="cropRecomendation" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CropLayout;
