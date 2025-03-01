import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const EcomLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="ecom" options={{ headerShown: false }} />
    </Stack>
  );
};

export default EcomLayout;
