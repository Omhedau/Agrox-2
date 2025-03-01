import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const CropLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="crophealth" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CropLayout;
