import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RentalLayout = () => {
  return (
    <Stack initialRouteName="machines">
      <Stack.Screen name="machines" options={{ headerShown: false }} />
      <Stack.Screen name="machineDetail" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RentalLayout;
